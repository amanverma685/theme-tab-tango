
import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, User, PlusCircle } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { motion } from 'framer-motion';

interface MobileFrameProps {
  children: ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);
  
  // Don't show bottom nav on some routes if needed
  const hideNavigation = false;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: <Home size={20} />,
      color: 'bg-red-500'
    },
    {
      path: '/add',
      label: 'Add',
      icon: <PlusCircle size={20} />,
      color: 'bg-green-500'
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: <User size={20} />,
      color: 'bg-yellow-500'
    },
  ];

  // Get the current active tab's color
  const getActiveColor = () => {
    const activeItem = navItems.find(item => item.path === activeTab);
    return activeItem?.color || 'bg-brand-600';
  };

  return (
    <div className="mobile-container max-w-sm mx-auto bg-background">
      <div className="mobile-screen">
        {children}
      </div>
      
      {!hideNavigation && (
        <div className="bottom-nav">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            initial={false}
            animate={{
              backgroundColor: activeTab === '/' 
                ? 'rgb(239, 68, 68)' 
                : activeTab === '/add' 
                ? 'rgb(34, 197, 94)' 
                : 'rgb(234, 179, 8)'
            }}
            transition={{ duration: 0.3 }}
          />
          <BottomNavigation items={navItems} />
        </div>
      )}
    </div>
  );
};

export default MobileFrame;
