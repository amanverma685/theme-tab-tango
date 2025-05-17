
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const QuizSetup = () => {
  const navigate = useNavigate();
  const [quizSettings, setQuizSettings] = useState({
    duration: 30, // in minutes
    difficulty: 'medium', // easy, medium, hard
    questionsCount: 10,
  });

  const handleStartQuiz = () => {
    navigate('/quiz', { state: quizSettings });
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-brand-500" />
        </button>
        <h1 className="text-xl font-bold text-brand-500">Quiz Setup</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="space-y-6">
        <div className="border border-brand-200 rounded-lg p-4">
          <label className="block text-brand-500 font-medium mb-2">Quiz Duration (minutes)</label>
          <Input
            type="number"
            min={5}
            max={180}
            value={quizSettings.duration}
            onChange={(e) => setQuizSettings({...quizSettings, duration: parseInt(e.target.value) || 30})}
            className="w-full border-brand-200"
          />
        </div>

        <div className="border border-brand-200 rounded-lg p-4">
          <label className="block text-brand-500 font-medium mb-4">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['easy', 'medium', 'hard'].map((level) => (
              <motion.div
                key={level}
                className={`border rounded-lg p-3 text-center cursor-pointer ${
                  quizSettings.difficulty === level ? "border-brand-500 bg-brand-50" : "border-gray-300"
                }`}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuizSettings({...quizSettings, difficulty: level})}
              >
                <span className={quizSettings.difficulty === level ? "text-brand-600 font-medium" : ""}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border border-brand-200 rounded-lg p-4">
          <label className="block text-brand-500 font-medium mb-2">Number of Questions: {quizSettings.questionsCount}</label>
          <Slider
            defaultValue={[10]}
            min={5}
            max={50}
            step={1}
            value={[quizSettings.questionsCount]}
            onValueChange={(value) => setQuizSettings({...quizSettings, questionsCount: value[0]})}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>5</span>
            <span>50</span>
          </div>
        </div>

        <Button 
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 mt-6"
          size="lg"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizSetup;
