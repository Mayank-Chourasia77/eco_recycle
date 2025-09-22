import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'awareness', 'locate', 'suggest'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoRecycle</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`text-foreground hover:text-primary transition-colors duration-200 relative ${
                activeSection === 'hero' ? 'text-primary font-medium' : ''
              }`}
            >
              Home
              {activeSection === 'hero' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('awareness')}
              className={`text-foreground hover:text-primary transition-colors duration-200 relative ${
                activeSection === 'awareness' ? 'text-primary font-medium' : ''
              }`}
            >
              Awareness
              {activeSection === 'awareness' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('locate')}
              className={`text-foreground hover:text-primary transition-colors duration-200 relative ${
                activeSection === 'locate' ? 'text-primary font-medium' : ''
              }`}
            >
              Locate Centers
              {activeSection === 'locate' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('suggest')}
              className={`text-foreground hover:text-primary transition-colors duration-200 relative ${
                activeSection === 'suggest' ? 'text-primary font-medium' : ''
              }`}
            >
              Suggest Center
              {activeSection === 'suggest' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <Button 
              variant="eco" 
              size="sm"
              onClick={() => scrollToSection('locate')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('hero')}
                className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 ${
                  activeSection === 'hero' ? 'text-primary font-medium' : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('awareness')}
                className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 ${
                  activeSection === 'awareness' ? 'text-primary font-medium' : ''
                }`}
              >
                Awareness
              </button>
              <button 
                onClick={() => scrollToSection('locate')}
                className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 ${
                  activeSection === 'locate' ? 'text-primary font-medium' : ''
                }`}
              >
                Locate Centers
              </button>
              <button 
                onClick={() => scrollToSection('suggest')}
                className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 ${
                  activeSection === 'suggest' ? 'text-primary font-medium' : ''
                }`}
              >
                Suggest Center
              </button>
              <Button 
                variant="eco" 
                size="sm" 
                className="w-fit"
                onClick={() => scrollToSection('locate')}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;