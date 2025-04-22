
import { useState } from "react";
import { DeliveryCard, DeliveryStatus } from "./DeliveryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";

// Sample delivery data structure
export interface Delivery {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  assignedTo?: string;
  status: DeliveryStatus;
  estimatedTime?: string;
  coordinates: {
    pickup: { lat: number; lng: number };
    dropoff: { lat: number; lng: number };
  };
}

interface DeliveryListProps {
  userRole: 'business' | 'delivery';
  onViewOnMap: (id: string) => void;
  onAddDelivery?: () => void;
}

export function DeliveryList({ userRole, onViewOnMap, onAddDelivery }: DeliveryListProps) {
  const [filter, setFilter] = useState<string>('');
  
  // Sample data - in a real app, this would come from an API
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL-12345",
      pickupAddress: "123 Main St, Warehouse B, San Francisco, CA",
      dropoffAddress: "456 Market St, Suite 300, San Francisco, CA",
      assignedTo: "Michael Rodriguez",
      status: "requested",
      estimatedTime: "30-45 min",
      coordinates: {
        pickup: { lat: 37.7749, lng: -122.4194 },
        dropoff: { lat: 37.7922, lng: -122.4068 }
      }
    },
    {
      id: "DEL-12346",
      pickupAddress: "789 Howard St, San Francisco, CA",
      dropoffAddress: "101 California St, Suite 500, San Francisco, CA",
      assignedTo: "Sarah Johnson",
      status: "accepted",
      estimatedTime: "15-20 min",
      coordinates: {
        pickup: { lat: 37.7837, lng: -122.3965 },
        dropoff: { lat: 37.7933, lng: -122.3989 }
      }
    },
    {
      id: "DEL-12347",
      pickupAddress: "1 Ferry Building, San Francisco, CA",
      dropoffAddress: "50 Fremont St, San Francisco, CA",
      assignedTo: "David Wilson",
      status: "transit",
      estimatedTime: "5-10 min",
      coordinates: {
        pickup: { lat: 37.7955, lng: -122.3937 },
        dropoff: { lat: 37.7905, lng: -122.3958 }
      }
    },
    {
      id: "DEL-12348",
      pickupAddress: "Pier 39, San Francisco, CA",
      dropoffAddress: "135 4th St, San Francisco, CA",
      assignedTo: "Jennifer Lee",
      status: "delivered",
      estimatedTime: "Delivered at 2:45 PM",
      coordinates: {
        pickup: { lat: 37.8087, lng: -122.4098 },
        dropoff: { lat: 37.7833, lng: -122.4025 }
      }
    }
  ]);

  const handleStatusChange = (id: string, newStatus: DeliveryStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    ));
  };

  const filteredDeliveries = deliveries.filter(delivery => 
    delivery.pickupAddress.toLowerCase().includes(filter.toLowerCase()) || 
    delivery.dropoffAddress.toLowerCase().includes(filter.toLowerCase()) ||
    (delivery.assignedTo && delivery.assignedTo.toLowerCase().includes(filter.toLowerCase())) ||
    delivery.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Deliveries</h2>
        
        {userRole === 'business' && (
          <Button onClick={onAddDelivery} size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Delivery
          </Button>
        )}
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search deliveries..."
          className="pl-8"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {filteredDeliveries.length} deliveries found
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="h-4 w-4 mr-1" /> Filter
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              id={delivery.id}
              pickupAddress={delivery.pickupAddress}
              dropoffAddress={delivery.dropoffAddress}
              assignedTo={delivery.assignedTo}
              status={delivery.status}
              estimatedTime={delivery.estimatedTime}
              userRole={userRole}
              onViewOnMap={() => onViewOnMap(delivery.id)}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No deliveries found
          </div>
        )}
      </div>
    </div>
  );
}
