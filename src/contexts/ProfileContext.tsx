
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface ProfileData {
  email: string;
  username: string;
  academyName: string;
  mobileNumber: string;
  academyLocation: string;
  pdfPlan: {
    type: string;
    remaining: number;
  };
  quizPlan: {
    type: string;
    remaining: number;
  };
  themeColor: string;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  updateThemeColor: (color: string) => void;
}

const defaultProfile: ProfileData = {
  email: 'user@example.com',
  username: 'username',
  academyName: 'Academy',
  mobileNumber: '123-456-7890',
  academyLocation: 'City, Country',
  pdfPlan: {
    type: 'Trial Period',
    remaining: 3,
  },
  quizPlan: {
    type: 'Trial Period',
    remaining: 4,
  },
  themeColor: '#FF5722', // Default orange color
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile(prev => {
      const updated = { ...prev, ...data };
      toast.success('Profile updated successfully');
      return updated;
    });
    setIsEditing(false);
  };

  const updateThemeColor = (color: string) => {
    setProfile(prev => ({
      ...prev,
      themeColor: color
    }));
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', color);
    
    // Update brand colors based on the selected color
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    document.documentElement.style.setProperty('--brand-500', color);
    document.documentElement.style.setProperty('--brand-600', adjustBrightness(r, g, b, -20));
    document.documentElement.style.setProperty('--brand-400', adjustBrightness(r, g, b, 20));
    
    toast.success('Theme color updated');
  };
  
  // Helper function to adjust RGB brightness
  const adjustBrightness = (r: number, g: number, b: number, amount: number) => {
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isEditing, setIsEditing, updateThemeColor }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
