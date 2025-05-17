
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

interface QuestionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Questions = ({ isOpen, onClose }: QuestionsProps) => {
  const navigate = useNavigate();
  
  const questions = [
    {
      id: 'q1',
      marks: 3,
      source: 'NCERT',
      text: 'निम्नलिखित व्यंजक को a + ib के रूप में व्यक्त कीजिए: (3+√5)(3−√5)',
      equation: '(3+√5)(3−√5)',
      chapter: '4. सम्मिश्र संख्याएँ और द्विघात समीकरण (Complex Numbers and Quadratic Equations)',
      type: 'SUBJECTIVE'
    },
    {
      id: 'q2',
      marks: 3,
      source: 'NCERT',
      text: 'को मानक रूप में परिवर्तित कीजिए।',
      equation: '(\\frac{1}{1-4i} - \\frac{2}{1+i})(\\frac{3-4i}{5+i})',
      chapter: '4. सम्मिश्र संख्याएँ और द्विघात समीकरण (Complex Numbers and Quadratic Equations)',
      type: 'SUBJECTIVE'
    },
    {
      id: 'q3',
      marks: 3,
      source: 'NCERT',
      text: 'यदि z₁ = 2 - i, z₂ = 1+ i, का मान ज्ञात कीजिए।',
      equation: '\\frac{z_1 + z_2 +1}{z_1 - z_2 +1}',
      chapter: '4. सम्मिश्र संख्याएँ और द्विघात समीकरण (Complex Numbers and Quadratic Equations)',
      type: 'SUBJECTIVE'
    }
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
              <h2 className="text-xl font-bold text-brand-600">Add Questions</h2>
              <div className="flex items-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 w-6 h-6">
                  <path d="M21 15V6"></path>
                  <path d="M18.5 17.5L22 15.5L18.5 13.5"></path>
                  <path d="M8 13H2"></path>
                  <path d="M5 10L2 13L5 16"></path>
                  <path d="M15 4V18"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-brand-200 rounded-lg mb-6 overflow-hidden"
              >
                <div className="border-b border-brand-200 p-3 flex justify-between items-center">
                  <div className="text-brand-600">Marks: {question.marks}</div>
                  <div className="text-brand-600">From: {question.source}</div>
                  <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                </div>
                <div className="p-4">
                  <div className="mb-3">{question.text}</div>
                  <div className="italic mb-4">{question.equation}</div>
                  <div className="text-brand-600">Chapter: {question.chapter}</div>
                  <div className="flex justify-end mt-2">
                    <span className="bg-gray-100 px-3 py-1 text-sm rounded">{question.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-4 text-center opacity-70">
              <p>Long Press On a Question to View</p>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t flex justify-between space-x-2 max-w-md mx-auto">
            <Button 
              className="flex-1 bg-brand-600 hover:bg-brand-700"
              onClick={() => {}}
            >
              <Plus size={18} className="mr-1" /> More Questions
            </Button>
            <Button 
              className="flex-1 bg-brand-600 hover:bg-brand-700"
              onClick={onClose}
            >
              Proceed <ChevronRight size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ChevronRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Questions;
