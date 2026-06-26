const SubscriptionBanner = ({ sub }) => {
  if (!sub) return null;

  if (sub.isLifetime) return null;

  if (!sub.isActive) {
    return (
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-medium">
        Your subscription has expired. Please renew to continue uploading and managing products.
      </div>
    );
  }

  if (sub.plan === 'trial') {
    const days = sub.daysLeft ?? 0;
    const urgent = days <= 3;
    return (
      <div className={`text-center py-2 px-4 text-sm font-medium ${urgent ? 'bg-orange-500 text-white' : 'bg-blue-50 text-blue-800 border-b border-blue-100'}`}>
        {urgent
          ? `Trial expires in ${days} day${days !== 1 ? 's' : ''}! Upgrade now to keep access.`
          : `Free trial — ${days} day${days !== 1 ? 's' : ''} remaining.`}
      </div>
    );
  }

  if (sub.daysLeft !== null && sub.daysLeft <= 7) {
    return (
      <div className="bg-orange-50 text-orange-800 border-b border-orange-100 text-center py-2 px-4 text-sm font-medium">
        Your subscription expires in {sub.daysLeft} day{sub.daysLeft !== 1 ? 's' : ''}. Please renew soon.
      </div>
    );
  }

  return null;
};

export default SubscriptionBanner;
