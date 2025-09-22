import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Recycle } from 'lucide-react';
import heroImage from '@/assets/hero-ewaste.jpg';

const Hero = () => {
  const scrollToAwareness = () => {
    const element = document.getElementById('awareness');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocate = () => {
    const element = document.getElementById('locate');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="E-waste recycling concept with electronic devices and nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Reduce E-Waste,{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Save the Planet
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-slide-in-left delay-200">
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Electronic waste poses serious threats to our health and environment. 
              Learn about proper disposal methods and find recycling centers near you 
              to make a positive impact on our planet.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-in-right delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToLocate}
              className="min-w-[200px]"
            >
              <Recycle className="w-5 h-5 mr-2" />
              Find Centers
            </Button>
            <Button 
              variant="hero"
              size="lg"
              onClick={scrollToAwareness}
              className="min-w-[200px]"
            >
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce-in delay-1000 mt-16">
            <button
              onClick={scrollToAwareness}
              className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="text-sm mb-2">Discover More</span>
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;