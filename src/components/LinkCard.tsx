"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Globe, Book, Twitter, Youtube } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  iconName?: "github" | "globe" | "book" | "twitter" | "youtube" | "default";
  variant?: "list" | "bento";
  delay?: number;
  theme?: string;
  buttonStyle?: "filled" | "outline" | "hard-shadow" | "glass" | string;
  buttonShape?: "rounded-md" | "rounded-2xl" | "rounded-full" | string;
  hoverEffect?: "lift" | "wiggle" | "glow" | "none" | string;
}

const iconMap = {
  github: <Github className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  book: <Book className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  default: <ExternalLink className="w-5 h-5" />
};

export default function LinkCard({
  title,
  url,
  iconName = "default",
  variant = "list",
  delay = 0,
  theme = "default",
  buttonStyle = "glass",
  buttonShape = "rounded-2xl",
  hoverEffect = "lift"
}: LinkCardProps) {
  const isBento = variant === "bento";
  const icon = iconMap[iconName] || iconMap.default;

  // Determine static styles
  let baseStyle = "";
  let textStyle = theme.includes("light") ? "text-neutral-900" : "text-white";
  let iconBgStyle = theme.includes("light") ? "bg-neutral-100/80" : "bg-white/10";

  switch (buttonStyle) {
    case "glass":
      baseStyle = `bg-white/10 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]`;
      if (theme.includes("light")) {
        baseStyle = `bg-white/60 border border-neutral-200 backdrop-blur-md shadow-sm`;
      }
      break;
    case "filled":
      baseStyle = theme.includes("light") ? `bg-white text-neutral-900 shadow-sm border border-neutral-200` : `bg-white text-neutral-900`;
      textStyle = "text-neutral-900";
      iconBgStyle = "bg-neutral-100";
      break;
    case "outline":
      baseStyle = `bg-transparent border-2 ${theme.includes("light") ? 'border-neutral-900' : 'border-white'}`;
      break;
    case "hard-shadow":
      baseStyle = `bg-white text-neutral-900 border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(23,23,23,1)]`;
      textStyle = "text-neutral-900";
      iconBgStyle = "bg-neutral-100";
      break;
  }

  // Animation variants mapped from hoverEffect
  let hoverAnimation = {};
  switch (hoverEffect) {
    case "lift":
      hoverAnimation = { scale: 1.02, y: -4 };
      break;
    case "wiggle":
      hoverAnimation = { rotate: [0, -2, 2, -1, 1, 0], scale: 1.01 };
      break;
    case "glow":
      // Using box-shadow in framer-motion requires the exact string format, but tailwind glows are easier
      hoverAnimation = { scale: 1.01, boxShadow: "0px 0px 15px 0px rgba(255,255,255,0.4)" };
      if(theme.includes("light")) hoverAnimation = { scale: 1.01, boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)" };
      break;
    case "none":
      hoverAnimation = {};
      break;
  }
  
  // Custom fix for hard-shadow hover
  if (buttonStyle === "hard-shadow" && hoverEffect !== "none") {
      hoverAnimation = { y: -4, x: -4, boxShadow: "8px 8px 0px 0px rgba(23,23,23,1)" };
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={hoverAnimation}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative overflow-hidden flex 
        ${isBento ? `flex-col items-center justify-center p-6 gap-3 aspect-square` : `items-center p-4`} 
        ${baseStyle} ${buttonShape} transition-colors duration-300
      `}
    >
      {/* Background Gradient on Hover for Glass */}
      {buttonStyle === "glass" && (
         <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Card Content */}
      <div className={`relative z-10 flex ${isBento ? "flex-col" : "flex-row"} items-center w-full gap-4`}>
        <div className={`
          flex items-center justify-center rounded-xl ${iconBgStyle} text-current transition-colors
          ${isBento ? "w-14 h-14" : "w-10 h-10 shrink-0"}
        `}>
          {icon}
        </div>
        <span className={`font-medium ${textStyle} ${isBento ? "text-center text-sm" : "flex-1"}`}>
          {title}
        </span>
        {!isBento && (
          <ExternalLink className={`w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${textStyle}`} />
        )}
      </div>
    </motion.a>
  );
}
