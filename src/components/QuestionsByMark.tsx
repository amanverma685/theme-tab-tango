
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Questions from './Questions';

interface QuestionsByMarkProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionsByMark = ({ isOpen, onClose }: QuestionsByMarkProps) => {
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState<number | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);
  
  const questionMarks = [
    { mark: 1, total: 104 },
    { mark: 2, total: 85 },
    { mark: 3, total: 49 },
    { mark: 4, total: 39 },
    { mark: 5, total: 26 },
    { mark: 10, total: 14 },
  ];

  const handleMarkSelect = (mark: number) => {
    setSelectedMarks(mark);
    onClose();
    setIsQuestionsOpen(true);
  };

  const handleClear = () => {
    setSelectedCount(0);
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
                <h2 className="text-xl font-bold text-[#FF5722]">Add Questions</h2>
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>
            </div>

            <div className="p-4 space-y-4">
              {questionMarks.map((item, index) => (
                <motion.div
                  key={item.mark}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200"
                  onClick={() => handleMarkSelect(item.mark)}
                >
                  <div className="p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF5722] flex items-center justify-center text-white text-lg font-bold mr-4">
                      {item.mark}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium">
                        Add <span className="text-[#FF5722]">{item.mark} Mark</span> Questions
                      </p>
                      <p className="text-sm text-gray-500">Total {item.total} Available</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Total Selected Questions: {selectedCount}</span>
                <button 
                  className="text-[#FF5722]"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <Button 
                className="w-full bg-[#FF5722] hover:bg-[#E64A19]"
              >
                Proceed
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Questions 
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
      />
    </>
  );
};

export default QuestionsByMark;
