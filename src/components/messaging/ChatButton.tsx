
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

interface ChatButtonProps {
  userRole: 'business' | 'delivery';
}

export function ChatButton({ userRole }: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button 
        variant="default"
        size="icon" 
        className="h-12 w-12 rounded-full fixed bottom-6 right-6 shadow-lg z-40"
        onClick={toggleChat}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      {isOpen && <ChatWindow userRole={userRole} onClose={() => setIsOpen(false)} />}
    </>
  );
}
