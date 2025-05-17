
import { useState } from 'react';
import { RefreshCw, User, Edit, Check, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useProfile } from '@/contexts/ProfileContext';
import { toast } from 'sonner';
import UpgradePlans from '@/components/UpgradePlans';
import SubjectSelector from '@/components/SubjectSelector';
import ClassSelector from '@/components/ClassSelector';
import ModeSelector from '@/components/ModeSelector';
import ChapterSelector from '@/components/ChapterSelector';
import Questions from '@/components/Questions';
import BoardSelector from '@/components/BoardSelector';
import ThemeColorPicker from '@/components/ThemeColorPicker';

const Profile = () => {
  const { profile, updateProfile, isEditing, setIsEditing } = useProfile();
  const [formData, setFormData] = useState(profile);
  
  // Sheet states
  const [showUpgradePlans, setShowUpgradePlans] = useState(false);
  const [showSubjectSelector, setShowSubjectSelector] = useState(false);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showBoardSelector, setShowBoardSelector] = useState(false);
  const [showThemeColorPicker, setShowThemeColorPicker] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Profile updated successfully');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, revert changes
      setFormData(profile);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 pb-20"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-600">Profile</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowThemeColorPicker(true)}
            aria-label="Change theme color"
            className="border-brand-200"
          >
            <Palette size={18} className="text-brand-600" />
          </Button>
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={handleEditToggle}
            aria-label="Edit profile"
          >
            {isEditing ? <Check size={18} /> : <Edit size={18} />}
          </Button>
        </div>
      </div>

      {/* Plan Info Cards */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="plan-card">
          <span className="title">PDF Plan : </span>
          <span className="value">{profile.pdfPlan.type}</span>
          <div className="mt-1">
            <span className="title">Remaining Papers : </span>
            <span className="value">{profile.pdfPlan.remaining}</span>
          </div>
        </div>

        <div className="plan-card">
          <span className="title">Quiz Plan : </span>
          <span className="value">{profile.quizPlan.type}</span>
          <div className="mt-1">
            <span className="title">Remaining Quizzes : </span>
            <span className="value">{profile.quizPlan.remaining}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-lg mt-4 mb-6 transition-all"
          onClick={() => setShowUpgradePlans(true)}
        >
          UPGRADE PLAN
        </motion.button>
        
        {/* Demo buttons for opening each screen */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowSubjectSelector(true)}
          >
            Open Subjects
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowClassSelector(true)}
          >
            Open Classes
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowModeSelector(true)}
          >
            Open Modes
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowChapterSelector(true)}
          >
            Open Chapters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowQuestions(true)}
          >
            Open Questions
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setShowBoardSelector(true)}
          >
            Open Boards
          </Button>
        </div>
      </motion.div>

      {/* Profile Avatar */}
      <div className="flex justify-center my-6">
        <div className="w-24 h-24 rounded-full border-4 border-brand-200 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <User size={48} className="text-gray-400" />
        </div>
      </div>
      <p className="text-center text-brand-600 font-medium mb-6">Academy Logo</p>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-brand-600 mb-1">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-field"
          />
        </div>
        
        <div>
          <label className="block text-brand-600 mb-1">User Name</label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-field"
          />
        </div>
        
        <div>
          <label className="block text-brand-600 mb-1">Academy Name</label>
          <Input
            name="academyName"
            value={formData.academyName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-field"
          />
        </div>
        
        <div>
          <label className="block text-brand-600 mb-1">Mobile Number</label>
          <Input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-field"
          />
        </div>
        
        <div>
          <label className="block text-brand-600 mb-1">Academy Location</label>
          <Input
            name="academyLocation"
            value={formData.academyLocation}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-field"
          />
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4"
          >
            <Button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white"
              size="lg"
            >
              Update Profile
            </Button>
          </motion.div>
        )}
      </form>
      
      {/* Modal Sheets for each screen */}
      <UpgradePlans isOpen={showUpgradePlans} onClose={() => setShowUpgradePlans(false)} />
      <SubjectSelector isOpen={showSubjectSelector} onClose={() => setShowSubjectSelector(false)} />
      <ClassSelector isOpen={showClassSelector} onClose={() => setShowClassSelector(false)} />
      <ModeSelector isOpen={showModeSelector} onClose={() => setShowModeSelector(false)} />
      <ChapterSelector isOpen={showChapterSelector} onClose={() => setShowChapterSelector(false)} />
      <Questions isOpen={showQuestions} onClose={() => setShowQuestions(false)} />
      <BoardSelector isOpen={showBoardSelector} onClose={() => setShowBoardSelector(false)} />
      <ThemeColorPicker isOpen={showThemeColorPicker} onClose={() => setShowThemeColorPicker(false)} />
    </motion.div>
  );
};

export default Profile;
