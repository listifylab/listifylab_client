import { useState } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { useFields } from '../hooks/useFields';
import { usePaymentConfig } from '../hooks/usePaymentConfig';
import { apiFetch } from '../api';
import { SuccessAlert, ErrorAlert } from '../components/ui/FeedbackAlert';
import SubscriptionTab from './admin/SubscriptionTab';
import FieldsTab from './admin/FieldsTab';
import ListingSettingsTab from './admin/ListingSettingsTab';
import CompanyDetailsTab from './admin/CompanyDetailsTab';

const TABS = [
  { id: 'subscription', label: 'Subscription' },
  { id: 'fields', label: 'Field Definitions' },
  { id: 'listing', label: 'Listing Settings' },
  { id: 'company', label: 'Company Details' },
];

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AdminPage({ user }) {
  const [tab, setTab] = useState('subscription');
  const { sub, loading: subLoading, refetch: refetchSub } = useSubscription(user);
  const { fields, loading: fieldsLoading, addField, deleteField } = useFields();
  const { config: payConfig, loading: configLoading } = usePaymentConfig();

  const [newField, setNewField] = useState({ name: '', key: '', type: 'string' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState('');
  const [paying, setPaying] = useState('');

  const clear = () => {
    setMsg('');
    setErr('');
  };

  const run = async (key, fn, successMsg) => {
    clear();
    setBusy(key);
    try {
      await fn();
      setMsg(successMsg);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy('');
    }
  };

  const handlePay = async (planKey) => {
    clear();
    setPaying(planKey);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Could not load Razorpay. Check your internet connection.');

      const res = await apiFetch('/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({ plan: planKey }),
      });
      const { orderId, amount, currency, planLabel, keyId, tenantName } = res.data;

      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: keyId,
          amount,
          currency,
          order_id: orderId,
          name: 'ListifyLab',
          description: `${planLabel} Plan`,
          prefill: { name: user?.name || tenantName, email: user?.email || '' },
          theme: { color: '#0f172a' },
          handler: async (response) => {
            try {
              await apiFetch('/payment/verify', {
                method: 'POST',
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  plan: planKey,
                }),
              });
              await refetchSub();
              setMsg(`Payment successful! Your ${planLabel} plan is now active.`);
              resolve();
            } catch (e) {
              reject(e);
            }
          },
          modal: { ondismiss: () => reject(new Error('Payment cancelled.')) },
        });
        rzp.open();
      });
    } catch (e) {
      if (e.message !== 'Payment cancelled.') setErr(e.message);
    } finally {
      setPaying('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your subscription and custom fields</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              clear();
            }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              tab === t.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Feedback */}
      <SuccessAlert message={msg} />
      <ErrorAlert message={err} />

      {/* Tab content */}
      {tab === 'subscription' && (
        <SubscriptionTab
          sub={sub}
          subLoading={subLoading}
          payConfig={payConfig}
          configLoading={configLoading}
          paying={paying}
          handlePay={handlePay}
        />
      )}
      {tab === 'fields' && (
        <FieldsTab
          fields={fields}
          fieldsLoading={fieldsLoading}
          addField={addField}
          deleteField={deleteField}
          newField={newField}
          setNewField={setNewField}
          busy={busy}
          run={run}
          setErr={setErr}
        />
      )}
      {tab === 'listing' && <ListingSettingsTab />}
      {tab === 'company' && <CompanyDetailsTab user={user} />}
    </div>
  );
}
