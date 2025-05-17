
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
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
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

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isEditing, setIsEditing }}>
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
