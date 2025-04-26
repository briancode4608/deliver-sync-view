
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Truck, Package, MessageSquare } from "lucide-react";

interface ProfileCardProps {
  type: 'business' | 'delivery';
  name: string;
  rating: number;
  location: string;
  totalDeliveries?: number;
  vehicleType?: string;
  avatar: string;
}

const ProfileCard = ({ type, name, rating, location, totalDeliveries, vehicleType, avatar }: ProfileCardProps) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <Badge variant={type === 'business' ? 'default' : 'secondary'} className="mt-1">
                  {type === 'business' ? 'Business Owner' : 'Delivery Person'}
                </Badge>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            
            {type === 'delivery' && vehicleType && (
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Truck className="h-4 w-4 mr-1" />
                {vehicleType}
              </div>
            )}
            
            {totalDeliveries && (
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Package className="h-4 w-4 mr-1" />
                {totalDeliveries} deliveries completed
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button variant="default" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              {type === 'delivery' && (
                <Button variant="outline" className="flex-1">
                  Request Delivery
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Profiles() {
  // Sample data - in a real app, this would come from an API
  const profiles = [
    {
      type: 'delivery' as const,
      name: 'Michael Rodriguez',
      rating: 4.8,
      location: 'San Francisco, CA',
      totalDeliveries: 156,
      vehicleType: 'Cargo Van',
      avatar: '/placeholder.svg'
    },
    {
      type: 'business' as const,
      name: 'Pacific Imports Ltd.',
      rating: 4.9,
      location: 'San Francisco, CA',
      totalDeliveries: 450,
      avatar: '/placeholder.svg'
    },
    {
      type: 'delivery' as const,
      name: 'Sarah Johnson',
      rating: 4.7,
      location: 'Oakland, CA',
      totalDeliveries: 89,
      vehicleType: 'Electric Car',
      avatar: '/placeholder.svg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Profiles</h1>
          <p className="text-muted-foreground">Connect with business owners and delivery persons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.name} {...profile} />
        ))}
      </div>
    </div>
  );
}
