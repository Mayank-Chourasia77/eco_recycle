import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyAwareness from '@/components/WhyAwareness';
import AwarenessContent from '@/components/AwarenessContent';
import LocateCenters from '@/components/LocateCenters';
import SuggestCenter from '@/components/SuggestCenter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhyAwareness />
        <AwarenessContent />
        <LocateCenters />
        <SuggestCenter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
