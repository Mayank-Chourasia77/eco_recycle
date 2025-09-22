import React from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import RecyclingMap from '@/components/RecyclingMap';

const LocateCenters = () => {
  return (
    <section id="locate" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Find Recycling Centers Near You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-left delay-200">
            Locate nearby e-waste recycling centers on our interactive map. Search by location 
            or use your current position to find the closest facilities.
          </p>
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-card-shadow hover:shadow-eco transition-shadow duration-300 animate-scale-in delay-300">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Search Location</h3>
              <p className="text-sm text-muted-foreground">Enter a city or address to find nearby centers</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-card-shadow hover:shadow-eco transition-shadow duration-300 animate-scale-in delay-400">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Find My Location</h3>
              <p className="text-sm text-muted-foreground">Use GPS to center map on your current location</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-card-shadow hover:shadow-eco transition-shadow duration-300 animate-scale-in delay-500">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">View Details</h3>
              <p className="text-sm text-muted-foreground">Click markers to see center info and contact details</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="animate-fade-in delay-600">
          <RecyclingMap />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Can't find a center near you?
            </h3>
            <p className="text-muted-foreground mb-6">
              Help us expand our network by suggesting a new recycling center in your area.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('suggest');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium hover:shadow-eco transition-all duration-300 transform hover:scale-105"
            >
              Suggest a Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocateCenters;