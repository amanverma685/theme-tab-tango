
import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, PlusCircle } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { motion } from 'framer-motion';
import ModeSelector from './ModeSelector';
import { useProfile } from '@/contexts/ProfileContext';

interface MobileFrameProps {
  children: ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('/');
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  
  useEffect(() => {
    setActiveTab(location.pathname);
    
    // Apply theme color from profile
    if (profile.themeColor) {
      document.documentElement.style.setProperty('--primary', profile.themeColor);
      
      // Calculate darker and lighter shades for consistency
      const r = parseInt(profile.themeColor.slice(1, 3), 16);
      const g = parseInt(profile.themeColor.slice(3, 5), 16);
      const b = parseInt(profile.themeColor.slice(5, 7), 16);
      
      const darken = (value: number, amount: number) => 
        Math.max(0, Math.min(255, value - amount)).toString(16).padStart(2, '0');
      
      const lighten = (value: number, amount: number) => 
        Math.max(0, Math.min(255, value + amount)).toString(16).padStart(2, '0');
      
      const darker = `#${darken(r, 30)}${darken(g, 30)}${darken(b, 30)}`;
      const lighter = `#${lighten(r, 30)}${lighten(g, 30)}${lighten(b, 30)}`;
      
      document.documentElement.style.setProperty('--brand-600', darker);
      document.documentElement.style.setProperty('--brand-400', lighter);
    }
  }, [location, profile.themeColor]);
  
  // Don't show bottom nav on some routes if needed
  const hideNavigation = false;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: <Home size={20} />,
      color: `${profile.themeColor || 'bg-brand-500'}`,
      onClick: () => navigate('/')
    },
    {
      path: '/add',
      label: 'Add',
      icon: <PlusCircle size={20} />,
      color: `${profile.themeColor || 'bg-brand-500'}`,
      onClick: () => setIsModeSelectorOpen(true)
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: <User size={20} />,
      color: `${profile.themeColor || 'bg-brand-500'}`,
      onClick: () => navigate('/profile')
    },
  ];

  // Get the current active tab's color
  const getActiveColor = () => {
    return profile.themeColor || 'rgb(239, 68, 68)';
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
              backgroundColor: getActiveColor()
            }}
            transition={{ duration: 0.3 }}
          />
          <BottomNavigation items={navItems} />
        </div>
      )}

      <ModeSelector 
        isOpen={isModeSelectorOpen}
        onClose={() => setIsModeSelectorOpen(false)}
      />
    </div>
  );
};

export default MobileFrame;
