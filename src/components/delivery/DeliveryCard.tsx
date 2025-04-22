
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { 
  MapPin, 
  ArrowRight, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Navigation
} from "lucide-react";

export type DeliveryStatus = 'requested' | 'accepted' | 'transit' | 'delivered';

interface DeliveryCardProps {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  assignedTo?: string;
  status: DeliveryStatus;
  estimatedTime?: string;
  userRole: 'business' | 'delivery';
  onViewOnMap?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: DeliveryStatus) => void;
}

export function DeliveryCard({
  id,
  pickupAddress,
  dropoffAddress,
  assignedTo,
  status,
  estimatedTime,
  userRole,
  onViewOnMap,
  onStatusChange
}: DeliveryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Render different action buttons based on status and user role
  const renderActionButtons = () => {
    if (userRole === 'business') {
      if (status === 'requested') {
        return (
          <div className="flex space-x-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => onStatusChange?.(id, 'requested')}
            >
              <XCircle className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        );
      }
      return null;
    } else {
      // Delivery person actions
      switch (status) {
        case 'requested':
          return (
            <div className="flex space-x-2 mt-3">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onStatusChange?.(id, 'accepted')}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" /> Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => onStatusChange?.(id, 'requested')}
              >
                <XCircle className="h-4 w-4 mr-1" /> Decline
              </Button>
            </div>
          );
        case 'accepted':
          return (
            <div className="flex space-x-2 mt-3">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onStatusChange?.(id, 'transit')}
              >
                <Navigation className="h-4 w-4 mr-1" /> Start Delivery
              </Button>
            </div>
          );
        case 'transit':
          return (
            <div className="flex space-x-2 mt-3">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onStatusChange?.(id, 'delivered')}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Delivered
              </Button>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <Card
      className="p-4 mb-3 border-l-4 hover:shadow-md transition-shadow duration-200"
      style={{ borderLeftColor: status === 'requested' ? '#f59e0b' : 
                              status === 'accepted' ? '#8b5cf6' :
                              status === 'transit' ? '#3b82f6' : '#10b981' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium">Delivery #{id.slice(-4)}</span>
            <StatusBadge status={status} />
          </div>
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-delivery-DEFAULT mt-1 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Pickup</div>
                <div className="text-sm">{pickupAddress}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-status-delivered mt-1 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Dropoff</div>
                <div className="text-sm">{dropoffAddress}</div>
              </div>
            </div>
          </div>
          
          {assignedTo && (
            <div className="flex items-center mt-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="ml-1 font-medium">{assignedTo}</span>
            </div>
          )}
          
          {estimatedTime && (
            <div className="flex items-center mt-1 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">ETA:</span>
              <span className="ml-1">{estimatedTime}</span>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewOnMap?.(id)}
          className="text-delivery-DEFAULT h-8 px-2"
        >
          <span className="mr-1 text-xs">Map</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      {renderActionButtons()}
    </Card>
  );
}
