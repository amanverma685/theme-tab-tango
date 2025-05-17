
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckSquare, Lock } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import QuestionsByMark from './QuestionsByMark';

interface ChapterSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChapterSelector = ({ isOpen, onClose }: ChapterSelectorProps) => {
  const [selectedChapters, setSelectedChapters] = useState<string[]>(['4', '5', '6']);
  const [isQuestionsByMarkOpen, setIsQuestionsByMarkOpen] = useState(false);
  
  const chapters = [
    { id: '1', name: '1. वास्तविक संख्याएँ (Real Numbers)', locked: true },
    { id: '2', name: '2. संबंध और फलन ( Relations and Functions)', locked: true },
    { id: '3', name: '3. त्रिकोणमितीय फलन (Trigonometric Functions)', locked: true },
    { id: '4', name: '4. सम्मिश्र संख्याएँ और द्विघात समीकरण (Complex Numbers and Quadratic Equations)', locked: false },
    { id: '5', name: '5 रैखिक असमिकाएँ (Linear Inequalities)', locked: false },
    { id: '6', name: '6. क्रमचय और संचय (Permutations and Combinations)', locked: false },
    { id: '7', name: '7. द्विपद प्रमेय (Binomial Theorem)', locked: false },
    { id: '8', name: '8. अनुक्रम तथा श्रेणी (Sequence and Series)', locked: false },
    { id: '9', name: '9. सरल रेखाएँ (Straight Lines)', locked: false },
    { id: '10', name: '10. शंकु परिच्छेद (Conic Sections)', locked: false },
    { id: '11', name: '11. त्रिविमीय ज्यामिति का परिचय (Introduction to Three Dimensional Geometry)', locked: false },
  ];

  const toggleChapter = (id: string) => {
    if (chapters.find(c => c.id === id)?.locked) return;
    
    setSelectedChapters(prev => 
      prev.includes(id) 
        ? prev.filter(chapterId => chapterId !== id)
        : [...prev, id]
    );
  };

  const handleProceed = () => {
    onClose();
    setIsQuestionsByMarkOpen(true);
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
                <h2 className="text-xl font-bold text-[#FF5722]">Select Chapters</h2>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
            </div>

            <div className="p-4">
              <motion.div 
                className="p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="font-medium">Select All</span>
                <Lock size={20} className="text-gray-400" />
              </motion.div>

              {chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between ${
                    chapter.locked 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-500' 
                      : selectedChapters.includes(chapter.id)
                        ? 'bg-white dark:bg-gray-800 border-2 border-[#FF5722]'
                        : 'bg-white dark:bg-gray-800 border border-gray-200'
                  }`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <span className="flex-1">{chapter.name}</span>
                  <div className="ml-2 flex-shrink-0">
                    {chapter.locked ? (
                      <Lock size={20} className="text-gray-400" />
                    ) : (
                      <div className={`w-6 h-6 flex items-center justify-center border rounded ${
                        selectedChapters.includes(chapter.id) ? 'bg-[#FF5722] border-[#FF5722]' : 'border-gray-300'
                      }`}>
                        {selectedChapters.includes(chapter.id) && (
                          <CheckSquare size={16} className="text-white" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t flex justify-between space-x-2 max-w-md mx-auto">
              <Button 
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={onClose}
              >
                Add Blueprint
              </Button>
              <Button 
                className="flex-1 bg-[#FF5722] hover:bg-[#E64A19]"
                onClick={handleProceed}
              >
                Proceed Without Blueprint
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <QuestionsByMark 
        isOpen={isQuestionsByMarkOpen} 
        onClose={() => setIsQuestionsByMarkOpen(false)} 
      />
    </>
  );
};

export default ChapterSelector;
