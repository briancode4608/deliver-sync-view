
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Delivery } from "../delivery/DeliveryList";
import { 
  Maximize2,
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  MapPin,
  Truck,
  Navigation
} from "lucide-react";

interface DeliveryMapProps {
  deliveries: Delivery[];
  activeDeliveryId?: string;
  isExpanded?: boolean;
  onToggleExpand: () => void;
}

export function DeliveryMap({ 
  deliveries, 
  activeDeliveryId, 
  isExpanded, 
  onToggleExpand 
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showMarkerInfo, setShowMarkerInfo] = useState<string | null>(null);

  // This is a placeholder for an actual map implementation
  // In a real app, you would use Mapbox, Google Maps, or Leaflet
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Here we would initialize the map with the selected delivery coordinates
    // For now, we'll just simulate it with a colored background
    const mapContainer = mapRef.current;
    mapContainer.style.backgroundColor = '#e9f5ff';
    mapContainer.style.position = 'relative';
    
    // Render fake markers on the map
    const markers = document.createElement('div');
    markers.className = 'markers-container';
    mapContainer.appendChild(markers);
    
    // In a real implementation, we would use the map API to add markers
    // For this demo, we're simulating the markers with absolute positioning
    deliveries.forEach(delivery => {
      const { pickup, dropoff } = delivery.coordinates;
      
      // Convert GPS coordinates to pixel positions (simulation)
      // In a real map API, this would be handled by the map framework
      const pickupX = (pickup.lng + 122.4194) * 500 % mapContainer.clientWidth;
      const pickupY = (pickup.lat - 37.7749) * 500 % mapContainer.clientHeight;
      
      const dropoffX = (dropoff.lng + 122.4194) * 500 % mapContainer.clientWidth;
      const dropoffY = (dropoff.lat - 37.7749) * 500 % mapContainer.clientHeight;
      
      // Create pickup marker
      const pickupMarker = document.createElement('div');
      pickupMarker.className = 'absolute flex items-center justify-center';
      pickupMarker.style.width = '32px';
      pickupMarker.style.height = '32px';
      pickupMarker.style.left = `${pickupX}px`;
      pickupMarker.style.top = `${pickupY}px`;
      pickupMarker.innerHTML = `
        <div class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">P</div>
      `;
      markers.appendChild(pickupMarker);
      
      // Create dropoff marker
      const dropoffMarker = document.createElement('div');
      dropoffMarker.className = 'absolute flex items-center justify-center';
      dropoffMarker.style.width = '32px';
      dropoffMarker.style.height = '32px';
      dropoffMarker.style.left = `${dropoffX}px`;
      dropoffMarker.style.top = `${dropoffY}px`;
      dropoffMarker.innerHTML = `
        <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">D</div>
      `;
      markers.appendChild(dropoffMarker);
      
      // Add delivery truck for in-transit deliveries
      if (delivery.status === 'transit') {
        const truckX = ((dropoffX + pickupX) / 2) % mapContainer.clientWidth;
        const truckY = ((dropoffY + pickupY) / 2) % mapContainer.clientHeight;
        
        const truckMarker = document.createElement('div');
        truckMarker.className = 'absolute flex items-center justify-center';
        truckMarker.style.width = '32px';
        truckMarker.style.height = '32px';
        truckMarker.style.left = `${truckX}px`;
        truckMarker.style.top = `${truckY}px`;
        truckMarker.innerHTML = `
          <div class="w-6 h-6 bg-delivery-DEFAULT rounded-full flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 3.5H16V16H1V3.5Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M16 8H20L23 12.5V16H16V8Z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="5.5" cy="16.5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="18.5" cy="16.5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
        `;
        markers.appendChild(truckMarker);
      }
    });
    
    // Highlight the active delivery if any
    if (activeDeliveryId) {
      const activeDelivery = deliveries.find(d => d.id === activeDeliveryId);
      if (activeDelivery) {
        // In a real map implementation, we would pan and zoom to the active delivery
        console.log(`Focusing on delivery ${activeDeliveryId}`);
      }
    }
    
    // Cleanup on component unmount
    return () => {
      if (mapContainer.contains(markers)) {
        mapContainer.removeChild(markers);
      }
    };
  }, [deliveries, activeDeliveryId, zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border-0 rounded-none md:rounded-md md:border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Live Tracking</h2>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onToggleExpand}>
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="relative flex-grow overflow-hidden">
        <div ref={mapRef} className="w-full h-full">
          {/* Map will be rendered here by the mapping library */}
          <div className="absolute inset-0 flex items-center justify-center text-delivery-DEFAULT text-opacity-20">
            <div className="text-center">
              <Navigation className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm text-muted-foreground">
                (In a real implementation, an actual map would be rendered here)
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-md">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs">Pickup</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs">Dropoff</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-delivery-DEFAULT rounded-full mr-1"></div>
              <span className="text-xs">In Transit</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
