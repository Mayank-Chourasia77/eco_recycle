import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Search, Phone, Mail, Clock, Recycle } from 'lucide-react';
import { recyclingCenters, type RecyclingCenter, getDistanceFromLatLonInKm } from '@/data/recyclingCenters';
import { useToast } from '@/hooks/use-toast';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom green marker icon for eco-theme
const createCustomIcon = () => {
  const iconHtml = `
    <div style="
      background-color: hsl(142, 71%, 45%);
      width: 25px;
      height: 25px;
      border-radius: 50% 50% 50% 0;
      border: 3px solid white;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">♻</div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-icon',
    html: iconHtml,
    iconSize: [25, 25],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const RecyclingMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Create map instance with disabled default zoom controls
    const map = L.map(mapRef.current, {
      center: [19.0760, 72.8777], // Default to Mumbai, India
      zoom: 11,
      zoomControl: false, // Disable default zoom controls to prevent overlap
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstance.current = map;

    // Add custom zoom control positioned to avoid overlap
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Add markers for recycling centers
    addMarkersToMap(map);

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const addMarkersToMap = (map: L.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    recyclingCenters.forEach((center) => {
      const marker = L.marker([center.latitude, center.longitude], {
        icon: createCustomIcon(),
      });

      // Create popup content
      const popupContent = createPopupContent(center);
      marker.bindPopup(popupContent);

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  };

  const createPopupContent = (center: RecyclingCenter): string => {
    const distanceText = userLocation 
      ? `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid hsl(var(--border)); font-size: 12px; color: hsl(var(--muted-foreground));">
           Distance: ${getDistanceFromLatLonInKm(
             userLocation.lat,
             userLocation.lng,
             center.latitude,
             center.longitude
           ).toFixed(1)} km away
         </div>`
      : '';

    const acceptedItemsHtml = center.acceptedItems 
      ? `<div style="margin-top: 12px;">
           <p style="font-weight: 600; color: hsl(var(--foreground)); margin-bottom: 4px;">Accepted Items:</p>
           <div style="display: flex; flex-wrap: wrap; gap: 4px;">
             ${center.acceptedItems.map(item => 
               `<span style="padding: 2px 8px; background-color: hsl(var(--primary) / 0.1); color: hsl(var(--primary)); font-size: 11px; border-radius: 12px;">${item}</span>`
             ).join('')}
           </div>
         </div>`
      : '';

    return `
      <div style="padding: 16px; min-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <div style="color: hsl(var(--primary)); font-size: 20px;">♻</div>
          <h3 style="font-weight: bold; font-size: 18px; color: hsl(var(--foreground)); margin: 0;">${center.name}</h3>
        </div>
        
        <div style="font-size: 14px; line-height: 1.5;">
          <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
            <span style="color: hsl(var(--muted-foreground)); margin-top: 2px;">📍</span>
            <span style="color: hsl(var(--muted-foreground));">${center.address}</span>
          </div>
          
          ${center.phone ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: hsl(var(--muted-foreground));">📞</span>
              <span style="color: hsl(var(--muted-foreground));">${center.phone}</span>
            </div>
          ` : ''}
          
          ${center.email ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: hsl(var(--muted-foreground));">✉️</span>
              <span style="color: hsl(var(--muted-foreground));">${center.email}</span>
            </div>
          ` : ''}
          
          ${center.hours ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: hsl(var(--muted-foreground));">🕒</span>
              <span style="color: hsl(var(--muted-foreground));">${center.hours}</span>
            </div>
          ` : ''}
          
          ${acceptedItemsHtml}
          ${distanceText}
        </div>
      </div>
    `;
  };

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 13);
          
          // Add user location marker
          const userMarker = L.marker([latitude, longitude], {
            icon: L.icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          });
          
          userMarker.bindPopup("Your current location").addTo(mapInstance.current);
        }
        
        setUserLocation({ lat: latitude, lng: longitude });
        
        toast({
          title: "Location found!",
          description: "Map centered on your current location.",
        });
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to retrieve your location. Please try again.",
          variant: "destructive",
        });
      }
    );
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const results = await response.json();

      if (results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        if (mapInstance.current) {
          mapInstance.current.setView([lat, lng], 12);
        }
        
        toast({
          title: "Location found!",
          description: `Showing results for: ${result.display_name}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search error",
        description: "Unable to search for location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation();
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden shadow-eco border border-border">
      {/* Mobile-Optimized Controls */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-[1000] flex flex-col gap-2 sm:flex-row sm:justify-between">
        {/* Search Control */}
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-full sm:max-w-sm">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 shadow-lg bg-background/95 backdrop-blur-sm text-sm h-10 sm:h-9"
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            disabled={isSearching}
            className="shadow-lg shrink-0 bg-primary hover:bg-primary/90 h-10 w-10 sm:h-9 p-0"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {/* Location Control */}
        <Button
          onClick={findMyLocation}
          variant="secondary"
          size="sm"
          className="shadow-lg shrink-0 w-full sm:w-auto h-10 sm:h-9 bg-secondary/95 backdrop-blur-sm hover:bg-secondary/80"
          title="Find my location"
        >
          <Navigation className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Find My Location</span>
          <span className="sm:hidden">My Location</span>
        </Button>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default RecyclingMap;