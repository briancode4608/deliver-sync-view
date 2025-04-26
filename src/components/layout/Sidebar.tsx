
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Map, 
  MessageSquare, 
  Settings, 
  Truck, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start gap-2",
        isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar-background text-sidebar-foreground border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex-1 p-2 space-y-2">
        {/* Navigation Items */}
        <div className="space-y-1 pt-4">
          <NavItem
            icon={LayoutDashboard}
            label={collapsed ? "" : "Dashboard"}
            isActive={activeItem === 'dashboard'}
            onClick={() => setActiveItem('dashboard')}
          />
          <NavItem
            icon={Truck}
            label={collapsed ? "" : "Deliveries"}
            isActive={activeItem === 'deliveries'}
            onClick={() => setActiveItem('deliveries')}
          />
          <NavItem
            icon={Map}
            label={collapsed ? "" : "Map"}
            isActive={activeItem === 'map'}
            onClick={() => setActiveItem('map')}
          />
          <NavItem
            icon={MessageSquare}
            label={collapsed ? "" : "Messages"}
            isActive={activeItem === 'messages'}
            onClick={() => setActiveItem('messages')}
          />
        </div>
        
        <Separator className="my-4" />
        
        <NavItem
          icon={Settings}
          label={collapsed ? "" : "Settings"}
          isActive={activeItem === 'settings'}
          onClick={() => setActiveItem('settings')}
        />
      </div>
      
      {/* Collapse Button */}
      <div className="p-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full flex justify-center" 
          onClick={toggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </div>
  );
}
