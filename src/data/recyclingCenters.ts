export interface RecyclingCenter {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  hours?: string;
  acceptedItems?: string[];
}

export const recyclingCenters: RecyclingCenter[] = [
  {
    id: 1,
    name: "Mumbai E-Waste Management Centre",
    address: "Plot No. 15, Bandra Kurla Complex, Bandra East, Mumbai 400051",
    latitude: 19.0596,
    longitude: 72.8656,
    phone: "+91 22 2659 5000",
    email: "info@mumbaieway.com",
    hours: "Mon-Fri 9AM-6PM, Sat 10AM-4PM",
    acceptedItems: ["Computers", "Phones", "Tablets", "Batteries", "Chargers"]
  },
  {
    id: 2,
    name: "Green Electronics Recycling Hub",
    address: "Survey No. 56, Andheri Kurla Road, Andheri East, Mumbai 400069",
    latitude: 19.1136,
    longitude: 72.8697,
    phone: "+91 22 2821 4567",
    email: "contact@greenelectronics.in",
    hours: "Mon-Sat 8AM-7PM",
    acceptedItems: ["TVs", "Appliances", "Computers", "Cables", "Printers"]
  },
  {
    id: 3,
    name: "Eco Digital Solutions",
    address: "A-Wing, Phoenix Mills, Lower Parel, Mumbai 400013",
    latitude: 19.0144,
    longitude: 72.8318,
    phone: "+91 22 4567 8901",
    email: "help@ecodigital.co.in",
    hours: "Tue-Sun 10AM-6PM",
    acceptedItems: ["Smartphones", "Laptops", "Gaming Consoles", "Audio Equipment"]
  },
  {
    id: 4,
    name: "Sustainable Tech Center Mumbai",
    address: "Hiranandani Gardens, Powai, Mumbai 400076",
    latitude: 19.1197,
    longitude: 72.9089,
    phone: "+91 22 2579 3456",
    email: "info@sustainabletech.in",
    hours: "Mon-Fri 9AM-5PM",
    acceptedItems: ["All Electronics", "Batteries", "Chargers", "Accessories"]
  },
  {
    id: 5,
    name: "Mumbai E-Waste Depot",
    address: "Seepz IT Park, Andheri East, Mumbai 400096",
    latitude: 19.1075,
    longitude: 72.8801,
    phone: "+91 22 6789 0123",
    email: "depot@mumbaieway.org",
    hours: "Wed-Sun 11AM-7PM",
    acceptedItems: ["Computers", "Monitors", "Audio Equipment", "Home Electronics"]
  },
  {
    id: 6,
    name: "Clean Earth Electronics Mumbai",
    address: "Malad Industrial Estate, Malad West, Mumbai 400064",
    latitude: 19.1847,
    longitude: 72.8492,
    phone: "+91 22 2881 2345",
    email: "contact@cleanearth.in",
    hours: "Mon-Sat 9AM-6PM",
    acceptedItems: ["Mobile Devices", "Computers", "Small Appliances", "Cables"]
  }
];

export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};