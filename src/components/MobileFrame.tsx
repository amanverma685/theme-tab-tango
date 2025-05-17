
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, User, PlusCircle, RefreshCw } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

interface MobileFrameProps {
  children: ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  const location = useLocation();
  
  // Don't show bottom nav on some routes if needed
  const hideNavigation = false;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: <Home size={20} />,
    },
    {
      path: '/add',
      label: 'Add',
      icon: <PlusCircle size={20} />,
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="mobile-container max-w-sm mx-auto bg-background">
      <div className="mobile-screen">
        {children}
      </div>
      
      {!hideNavigation && (
        <BottomNavigation items={navItems} />
      )}
    </div>
  );
};

export default MobileFrame;
