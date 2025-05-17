
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

interface ModeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModeSelector = ({ isOpen, onClose }: ModeSelectorProps) => {
  const navigate = useNavigate();
  
  const modes = [
    { 
      id: 'manual', 
      title: 'Select Questions of Your Choice',
      subtitle: 'Create Manually',
      path: '/subjects'
    },
    { 
      id: 'quick', 
      title: 'Just Select Questions Marks and Count',
      subtitle: 'Quick Mode',
      path: '/quick-selection'
    },
    { 
      id: 'format', 
      title: 'Select A Format And Download Paper',
      subtitle: 'Format Mode',
      path: '/formats'
    },
    { 
      id: 'expert', 
      title: 'Select From Already Created Best Papers',
      subtitle: 'Expert Mode',
      path: '/expert-papers'
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-background">
        <div className="h-full overflow-y-auto pb-20">
          <div className="sticky top-0 z-20 bg-background p-4 border-b">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="text-foreground p-1">
                <ArrowLeft size={24} className="text-brand-600" />
              </button>
              <h2 className="text-xl font-bold text-brand-600">Select Mode</h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
          </div>

          <div className="p-4 space-y-4">
            {modes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-brand-600 rounded-lg overflow-hidden"
                onClick={() => navigate(mode.path)}
              >
                <div className="bg-brand-600 p-6 text-center">
                  <h3 className="text-white text-lg font-medium">{mode.title}</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 text-center">
                  <p className="text-foreground font-medium">{mode.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModeSelector;
