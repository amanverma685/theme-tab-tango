
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useProfile } from '@/contexts/ProfileContext';

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const BottomNavigation = ({ items }: { items: NavItem[] }) => {
  const location = useLocation();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <motion.div 
      className={cn(
        "bottom-nav",
        "flex items-center justify-around shadow-lg",
        "dark:border-t dark:border-gray-800 rounded-t-xl"
      )}
      style={{ backgroundColor: profile.themeColor }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {items.map((item) => {
        const isActive = activeTab === item.path;
        
        return (
          <button
            key={item.path}
            onClick={item.onClick}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              "transition-all duration-300",
              isActive ? "text-white" : "text-white/60 hover:text-white"
            )}
          >
            <div className={cn(
              "flex items-center justify-center",
              isActive && "animate-bounce"
            )}>
              {item.icon}
            </div>
            <span className={cn(
              "text-xs mt-1 font-medium",
              isActive && "font-bold"
            )}>
              {item.label}
            </span>
            
            {isActive && (
              <motion.div 
                className="absolute w-12 h-1 bg-white rounded-full -top-0"
                layoutId="activeTab"
                initial={false}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
};

export default BottomNavigation;
