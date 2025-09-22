import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Globe, Building, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuggestedCenter {
  name: string;
  address: string;
  city: string;
  contactNumber: string;
  website?: string;
  timestamp: string;
}

const SuggestCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    contactNumber: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.address || !formData.city || !formData.contactNumber) {
      toast({
        title: "Please fill all required fields",
        description: "Name, address, city, and contact number are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create the suggestion object
    const suggestion: SuggestedCenter = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      const existingSuggestions = JSON.parse(localStorage.getItem('recyclingCenterSuggestions') || '[]');
      existingSuggestions.push(suggestion);
      localStorage.setItem('recyclingCenterSuggestions', JSON.stringify(existingSuggestions));
      
      console.log('New suggestion stored:', suggestion);
    } catch (error) {
      console.error('Error storing suggestion:', error);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Thank you!",
      description: "Your center suggestion has been recorded.",
    });

    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        address: '',
        city: '',
        contactNumber: '',
        website: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section id="suggest" className="py-20 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-scale-in">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-eco">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your center suggestion has been recorded. We'll review it and add it to our database soon.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting you back to the form in a moment...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="suggest" className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Suggest a Recycling Center
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-in-left delay-200">
              Help us expand our network! Know a recycling center that's not on our map? 
              Share the details with us and help your community access more recycling options.
            </p>
          </div>

          {/* Form */}
          <div className="animate-scale-in delay-400">
            <div className="bg-card rounded-3xl border border-border shadow-eco p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    Center Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g., Green Electronics Recycling"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-300 h-12"
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="e.g., 123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-300 h-12"
                    required
                  />
                </div>

                {/* City Field */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-300 h-12"
                    required
                  />
                </div>

                {/* Contact Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-foreground font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="e.g., +91 98765 43210"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-300 h-12"
                    required
                  />
                </div>

                {/* Website Field (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-foreground font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Website <span className="text-muted-foreground text-sm">(optional)</span>
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="e.g., https://www.example.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-300 h-12"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit Suggestion
                      </>
                    )}
                  </Button>
                </div>

                {/* Required Fields Note */}
                <p className="text-sm text-muted-foreground text-center pt-2">
                  * Required fields. Your suggestion will be reviewed before being added to our database.
                </p>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Why Suggest Centers?
              </h3>
              <p className="text-muted-foreground text-sm">
                By suggesting recycling centers, you're helping build a comprehensive network 
                that makes e-waste recycling more accessible to everyone in your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestCenter;