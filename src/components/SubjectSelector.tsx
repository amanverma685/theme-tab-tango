
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import ChapterSelector from './ChapterSelector';

interface SubjectSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubjectSelector = ({ isOpen, onClose }: SubjectSelectorProps) => {
  const [isChapterSelectorOpen, setIsChapterSelectorOpen] = useState(false);
  
  const subjects = [
    { name: 'अनुप्रयुक्त गणित (APPLIED MATHEMATICS)', id: 'applied-math' },
    { name: 'अर्थशास्त्र (ECONOMICS)', id: 'economics' },
    { name: 'इतिहास (HISTORY)', id: 'history' },
    { name: 'कंप्यूटर विज्ञान (COMPUTER SCIENCE)', id: 'computer-science' },
    { name: 'गणित', id: 'mathematics' },
    { name: 'जीवविज्ञान (BIOLOGY)', id: 'biology' },
    { name: 'भूगोल (GEOGRAPHY)', id: 'geography' },
    { name: 'भौतिकी (PHYSICS)', id: 'physics' },
    { name: 'रसायन विज्ञान (CHEMISTRY)', id: 'chemistry' },
    { name: 'राजनीति विज्ञान (POLITICAL SCIENCE)', id: 'political-science' },
    { name: 'लेखाशास्त्र (ACCOUNT)', id: 'accounting' },
    { name: 'व्यवसाय अध्ययन (BUSINESS STUDIES)', id: 'business-studies' },
  ];

  const handleSubjectSelect = (subject) => {
    onClose();
    setIsChapterSelectorOpen(true);
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
                <h2 className="text-xl font-bold text-[#FF5722]">Select Subject</h2>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
            </div>

            <div className="p-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 mb-4 rounded-lg shadow-sm border border-gray-200"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-foreground">{subject.name}</span>
                    <ChevronRight size={20} className="text-[#FF5722]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ChapterSelector 
        isOpen={isChapterSelectorOpen}
        onClose={() => setIsChapterSelectorOpen(false)}
      />
    </>
  );
};

export default SubjectSelector;
