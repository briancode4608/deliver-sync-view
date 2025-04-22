
import { cn } from "@/lib/utils";

type DeliveryStatus = 'requested' | 'accepted' | 'transit' | 'delivered';

interface StatusBadgeProps {
  status: DeliveryStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    requested: {
      label: "Requested",
      className: "bg-amber-100 text-amber-800 border-amber-200"
    },
    accepted: {
      label: "Accepted",
      className: "bg-violet-100 text-violet-800 border-violet-200"
    },
    transit: {
      label: "In Transit",
      className: "bg-blue-100 text-blue-800 border-blue-200"
    },
    delivered: {
      label: "Delivered",
      className: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  };

  const { label, className: statusClassName } = statusConfig[status];

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
      statusClassName,
      className
    )}>
      {label}
    </span>
  );
}
