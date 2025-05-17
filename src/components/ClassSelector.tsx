
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

interface ClassSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClassSelector = ({ isOpen, onClose }: ClassSelectorProps) => {
  const navigate = useNavigate();
  
  const classes = [
    { name: '12th', id: '12' },
    { name: '11th', id: '11' },
    { name: '10th', id: '10' },
    { name: '9th', id: '9' },
    { name: '8th', id: '8' },
    { name: '7th', id: '7' },
    { name: '6th', id: '6' },
    { name: '5th', id: '5' },
    { name: '4th', id: '4' },
    { name: '3rd', id: '3' },
    { name: '2nd', id: '2' },
    { name: '1st', id: '1' },
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
              <h2 className="text-xl font-bold text-brand-600">Standard/Class</h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
          </div>

          <div className="p-4">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 mb-4 rounded-lg shadow-sm"
                onClick={() => navigate(`/subjects`)}
              >
                <div className="p-4 flex items-center justify-between">
                  <span className="text-foreground">{classItem.name}</span>
                  <ChevronRight size={20} className="text-brand-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClassSelector;
