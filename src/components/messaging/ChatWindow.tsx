
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'contact';
  text: string;
  timestamp: Date;
}

interface ChatWindowProps {
  userRole: 'business' | 'delivery';
  onClose: () => void;
}

export function ChatWindow({ userRole, onClose }: ChatWindowProps) {
  const [input, setInput] = useState("");
  
  // In a real app, this would come from an API
  const contact = {
    name: userRole === 'business' ? 'Michael Rodriguez' : 'Pacific Imports Ltd.',
    avatar: '/placeholder.svg',
    role: userRole === 'business' ? 'Delivery Person' : 'Business',
    status: 'Online'
  };
  
  // Sample messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'contact',
      text: userRole === 'business' 
        ? "Hi there! I'm on my way to the pickup location."
        : "Hi! Your package is ready for pickup.",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '2',
      sender: 'user',
      text: "Great! Thanks for the update.",
      timestamp: new Date(Date.now() - 3500000) // 58 minutes ago
    },
    {
      id: '3',
      sender: 'contact',
      text: userRole === 'business'
        ? "There's a bit of traffic, but I should be there in 15 minutes."
        : "Do you need any assistance with loading?",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 10),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate a response in a real app
    setTimeout(() => {
      const responseMessage: Message = {
        id: Math.random().toString(36).substring(2, 10),
        sender: 'contact',
        text: userRole === 'business' 
          ? "Got it! I'll update you when I reach the destination."
          : "Perfect! I'll have everything ready when you arrive.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] z-30 shadow-lg flex flex-col">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-delivery-light text-white">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-medium">{contact.name}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              {contact.status}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-delivery-DEFAULT text-white rounded-br-none'
                  : 'bg-secondary rounded-bl-none'
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="p-2 border-t">
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
