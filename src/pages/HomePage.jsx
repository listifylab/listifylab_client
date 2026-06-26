import { C } from '../constants/home';
import HomeNav from './home/HomeNav';
import HeroSection from './home/HeroSection';
import FeaturesSection from './home/FeaturesSection';
import HowItWorksSection from './home/HowItWorksSection';
import PricingSection from './home/PricingSection';
import PolicySection from './home/PolicySection';
import SupportSection from './home/SupportSection';
import CTASection from './home/CTASection';
import HomeFooter from './home/HomeFooter';

export default function HomePage({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: C.bg, color: C.dark }}>
      <HomeNav onGetStarted={onGetStarted} onSignIn={onSignIn} />
      <HeroSection onGetStarted={onGetStarted} onSignIn={onSignIn} />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection onGetStarted={onGetStarted} />
      <PolicySection />
      <SupportSection />
      <CTASection onGetStarted={onGetStarted} />
      <HomeFooter onGetStarted={onGetStarted} onSignIn={onSignIn} />
    </div>
  );
}
