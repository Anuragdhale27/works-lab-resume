import { Layout } from '../components/Layout';
import { Hero } from './landing/sections/Hero';
import { FactStrip } from './landing/sections/FactStrip';
import { BeforeAfter } from './landing/sections/BeforeAfter';
import { AtsDemo } from './landing/sections/AtsDemo';
import { HowItWorks } from './landing/sections/HowItWorks';
import { Templates } from './landing/sections/Templates';
import { Features } from './landing/sections/Features';
import { PrivacyPrice } from './landing/sections/PrivacyPrice';
import { Pricing } from './landing/sections/Pricing';
import { Faq } from './landing/sections/Faq';
import { FinalCta } from './landing/sections/FinalCta';
import { useFadeIn } from '../hooks/useFadeIn';
import '../styles/landing.css';

export function Landing() {
  useFadeIn();

  return (
    <Layout>
      <div className="lp-page">
        <Hero />
        <FactStrip />
        <BeforeAfter />
        <AtsDemo />
        <HowItWorks />
        <Templates />
        <Features />
        <PrivacyPrice />
        <Pricing />
        <Faq />
        <FinalCta />
      </div>
    </Layout>
  );
}
