
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import BoardSelector from './BoardSelector';
import { useState } from 'react';

interface ModeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModeSelector = ({ isOpen, onClose }: ModeSelectorProps) => {
  const navigate = useNavigate();
  const [isBoardSelectorOpen, setIsBoardSelectorOpen] = useState(false);
  
  const modes = [
    { 
      id: 'manual', 
      title: 'Select Questions of Your Choice',
      subtitle: 'Create Manually',
      color: '#FF5722'
    },
    { 
      id: 'quick', 
      title: 'Just Select Questions Marks and Count',
      subtitle: 'Quick Mode',
      color: '#FF5722'
    },
    { 
      id: 'format', 
      title: 'Select A Format And Download Paper',
      subtitle: 'Format Mode',
      color: '#FF5722'
    },
    { 
      id: 'expert', 
      title: 'Select From Already Created Best Papers',
      subtitle: 'Expert Mode',
      color: '#FF5722'
    },
  ];

  const handleModeSelect = (mode) => {
    onClose();
    setIsBoardSelectorOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-md p-0 bg-background">
          <div className="h-full overflow-y-auto pb-20">
            <div className="sticky top-0 z-20 bg-background p-4 border-b">
              <div className="flex items-center justify-between">
                <button onClick={onClose} className="text-foreground p-1">
                  <ArrowLeft size={24} className="text-[#FF5722]" />
                </button>
                <h2 className="text-xl font-bold text-[#FF5722]">Select Mode</h2>
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
                  className="border-2 border-[#FF5722] rounded-lg overflow-hidden"
                  onClick={() => handleModeSelect(mode)}
                >
                  <div className="bg-[#FF5722] p-6 text-center">
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

      <BoardSelector 
        isOpen={isBoardSelectorOpen} 
        onClose={() => setIsBoardSelectorOpen(false)} 
      />
    </>
  );
};

export default ModeSelector;
