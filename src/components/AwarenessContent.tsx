import React from 'react';
import { AlertTriangle, Trash2, Recycle, CheckCircle } from 'lucide-react';

const AwarenessContent = () => {
  const sections = [
    {
      id: "what-is-ewaste",
      icon: Trash2,
      title: "What is E-Waste?",
      description: "Electronic waste (e-waste) refers to discarded electrical or electronic devices. This includes computers, smartphones, televisions, refrigerators, and any device with circuits or electrical components.",
      items: [
        "Smartphones and tablets",
        "Computers and laptops", 
        "TVs and monitors",
        "Kitchen appliances",
        "Gaming consoles",
        "Batteries and chargers"
      ]
    },
    {
      id: "hazards",
      icon: AlertTriangle,
      title: "Hazards of Improper Disposal",
      description: "When e-waste is thrown in regular trash or improperly disposed of, it releases toxic substances that harm both humans and the environment.",
      items: [
        "Lead poisoning affecting brain development",
        "Mercury contamination in water sources",
        "Soil pollution from toxic chemicals",
        "Air pollution from burning e-waste",
        "Wildlife health impacts",
        "Long-term environmental damage"
      ]
    },
    {
      id: "benefits",
      icon: Recycle,
      title: "Benefits of Recycling",
      description: "Proper e-waste recycling creates a positive cycle that benefits everyone - from recovering valuable materials to protecting our planet for future generations.",
      items: [
        "Recovers precious metals like gold, silver, and copper",
        "Reduces need for mining new materials",
        "Creates green jobs in recycling industry",
        "Prevents toxic substances from entering landfills",
        "Reduces carbon footprint",
        "Supports circular economy principles"
      ]
    }
  ];

  return (
    <section id="awareness" className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            E-Waste Awareness Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-left delay-200">
            Everything you need to know about electronic waste and how to make a difference
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={section.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 animate-fade-in delay-${(index + 1) * 300}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border/50 hover:shadow-md transition-shadow duration-300"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Illustration Placeholder */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border/50 shadow-card-shadow flex items-center justify-center">
                      <Icon className="w-24 h-24 text-primary/60" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwarenessContent;