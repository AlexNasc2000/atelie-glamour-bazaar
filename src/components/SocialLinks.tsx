
import React from "react";
import { Instagram, MessageCircle } from "lucide-react";

interface SocialLinksProps {
  className?: string;
  size?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = "text-foreground",
  size = 24
}) => {
  return (
    <div className="flex items-center space-x-4">
      <a
        href="https://www.instagram.com/_usegleicerios/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:text-pink-dark transition-colors`}
        aria-label="Instagram"
      >
        <Instagram size={size} />
      </a>
      
      <a
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:text-green-500 transition-colors`}
        aria-label="WhatsApp"
      >
        <MessageCircle size={size} />
      </a>
    </div>
  );
};

export default SocialLinks;
