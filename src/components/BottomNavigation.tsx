
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

const BottomNavigation = ({ items }: { items: NavItem[] }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [navColors, setNavColors] = useState<string[]>([
    'bg-brand-500',
    'bg-brand-600',
    'bg-brand-700',
    'bg-brand-800'
  ]);

  useEffect(() => {
    setActiveTab(location.pathname);
    
    // Rotate colors when tab changes
    setNavColors(prev => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, [location.pathname]);

  const getActiveColor = (path: string) => {
    const index = items.findIndex(item => item.path === path);
    return index !== -1 ? navColors[index % navColors.length] : navColors[0];
  };

  return (
    <motion.div 
      className={cn(
        "bottom-nav",
        "flex items-center justify-around shadow-lg",
        "dark:border-t dark:border-gray-800 rounded-t-xl",
        getActiveColor(activeTab)
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {items.map((item) => {
        const isActive = activeTab === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
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
          </Link>
        );
      })}
    </motion.div>
  );
};

export default BottomNavigation;
