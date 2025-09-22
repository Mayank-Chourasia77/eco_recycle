import React from 'react';
import { Heart, Globe, DollarSign } from 'lucide-react';

const WhyAwareness = () => {
  const cards = [
    {
      icon: Heart,
      title: "Health",
      description: "E-waste contains toxic materials like lead, mercury, and cadmium that can cause serious health problems when improperly disposed of.",
      gradient: "from-red-500/10 to-pink-500/10"
    },
    {
      icon: Globe,
      title: "Environment", 
      description: "Proper e-waste recycling prevents soil and water contamination, reduces greenhouse gas emissions, and protects wildlife habitats.",
      gradient: "from-primary/10 to-accent/10"
    },
    {
      icon: DollarSign,
      title: "Economy",
      description: "E-waste recycling creates jobs, recovers valuable materials like gold and silver, and reduces the need for mining new resources.",
      gradient: "from-yellow-500/10 to-orange-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Why E-Waste Awareness Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-left delay-200">
            Understanding the impact of electronic waste is crucial for protecting our health, 
            environment, and economy. Here's why it matters:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const delayClass = index === 0 ? 'delay-[600ms]' : index === 1 ? 'delay-[800ms]' : 'delay-[1000ms]';
            return (
              <div
                key={card.title}
                className={`animate-scale-in ${delayClass} group transition-transform duration-300 hover:scale-105 hover:-translate-y-2 h-full`}
              >
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${card.gradient} border border-border/50 shadow-card-shadow hover:shadow-eco h-full flex flex-col`}>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAwareness;