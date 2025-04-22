
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { DeliveryList, Delivery } from '@/components/delivery/DeliveryList';
import { DeliveryMap } from '@/components/map/DeliveryMap';
import { ChatButton } from '@/components/messaging/ChatButton';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

export default function Index() {
  const [userRole, setUserRole] = useState<'business' | 'delivery'>('business');
  const [activeDeliveryId, setActiveDeliveryId] = useState<string>();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // Sample delivery data
  const deliveries: Delivery[] = [
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
  ];

  const handleViewOnMap = (id: string) => {
    setActiveDeliveryId(id);
    // On mobile, expand the map when a delivery is selected
    if (isMobile) {
      setIsMapExpanded(true);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddDelivery = () => {
    // In a real app, this would open a form to add a new delivery
    console.log("Add new delivery");
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {(isSidebarOpen || !isMobile) && (
          <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}`}>
            <Sidebar />
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {isMobile && (
            <div className="p-2 border-b">
              <Button variant="ghost" size="sm" onClick={handleToggleSidebar}>
                <Menu className="h-5 w-5 mr-2" />
                Menu
              </Button>
            </div>
          )}
          
          {isMapExpanded && isMobile ? (
            <div className="flex-1 overflow-hidden p-4">
              <DeliveryMap 
                deliveries={deliveries} 
                activeDeliveryId={activeDeliveryId} 
                isExpanded={isMapExpanded} 
                onToggleExpand={() => setIsMapExpanded(!isMapExpanded)} 
              />
            </div>
          ) : isMobile ? (
            <div className="flex-1 overflow-hidden p-4">
              <DeliveryList 
                userRole={userRole} 
                onViewOnMap={handleViewOnMap} 
                onAddDelivery={handleAddDelivery} 
              />
            </div>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full p-4 overflow-y-auto">
                  <DeliveryList 
                    userRole={userRole} 
                    onViewOnMap={handleViewOnMap} 
                    onAddDelivery={handleAddDelivery} 
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full">
                  <DeliveryMap 
                    deliveries={deliveries} 
                    activeDeliveryId={activeDeliveryId} 
                    isExpanded={isMapExpanded} 
                    onToggleExpand={() => setIsMapExpanded(!isMapExpanded)} 
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </div>
      
      <ChatButton userRole={userRole} />
    </div>
  );
}
