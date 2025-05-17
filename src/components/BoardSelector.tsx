
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import ClassSelector from './ClassSelector';

interface BoardSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoardSelector = ({ isOpen, onClose }: BoardSelectorProps) => {
  const [selectedBoards, setSelectedBoards] = useState<string[]>(['CBSE']);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('HINDI');
  const [isClassSelectorOpen, setIsClassSelectorOpen] = useState(false);
  
  const boards = [
    { id: 'HBSE', name: 'HBSE' },
    { id: 'CBSE', name: 'CBSE' },
    { id: 'PSEB', name: 'PSEB' },
    { id: 'BIHAR', name: 'Bihar Board' },
    { id: 'RAJASTHAN', name: 'Rajasthan Board' },
    { id: 'UP', name: 'UP Board' },
  ];
  
  const languages = [
    { id: 'HINDI', name: 'HINDI' },
    { id: 'ENGLISH', name: 'ENGLISH' },
    { id: 'BOTH', name: 'BOTH HINDI AND ENGLISH' },
  ];

  const toggleBoard = (id: string) => {
    setSelectedBoards(prev => 
      prev.includes(id) 
        ? prev.filter(boardId => boardId !== id)
        : [...prev, id]
    );
  };

  const handleGo = () => {
    onClose();
    setIsClassSelectorOpen(true);
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
                <h2 className="text-xl font-bold text-[#FF5722]">Let's Start</h2>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
            </div>

            <div className="p-4">
              <div className="bg-[#FF5722] text-white py-2 px-4 rounded-lg text-center mb-6">
                Board/Exam
              </div>
              
              {boards.map((board) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border border-[#FF5722]/20 rounded-full p-4 mb-4 flex items-center justify-between ${
                    selectedBoards.includes(board.id) ? 'border-[#FF5722]' : ''
                  }`}
                  onClick={() => toggleBoard(board.id)}
                >
                  <span className="text-foreground">{board.name}</span>
                  {selectedBoards.includes(board.id) && (
                    <div className="w-6 h-6 bg-[#FF5722] rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="bg-[#FF5722] text-white py-2 px-4 rounded-lg text-center my-6">
                Paper Medium
              </div>
              
              {languages.map((lang) => (
                <motion.div
                  key={lang.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border border-[#FF5722]/20 rounded-full p-4 mb-4 flex items-center justify-between ${
                    selectedLanguage === lang.id ? 'border-[#FF5722]' : ''
                  }`}
                  onClick={() => setSelectedLanguage(lang.id)}
                >
                  <span className="text-foreground">{lang.name}</span>
                  {selectedLanguage === lang.id && (
                    <div className="w-6 h-6 bg-[#FF5722] rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t max-w-md mx-auto">
              <Button 
                className="w-full bg-[#FF5722] hover:bg-[#E64A19] py-6"
                onClick={handleGo}
              >
                Go <ChevronRight size={24} className="ml-1" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ClassSelector 
        isOpen={isClassSelectorOpen}
        onClose={() => setIsClassSelectorOpen(false)}
      />
    </>
  );
};

const ChevronRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default BoardSelector;
