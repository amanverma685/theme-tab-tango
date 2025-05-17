
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, Home, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = {}, questions = [], timeTaken = 0 } = location.state || {};

  // Calculate score
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer);
  const score = correctAnswers.length;
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Format time taken
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
        <p className="text-muted-foreground">
          You've completed the quiz! Here's how you did.
        </p>
      </motion.div>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-brand-200 p-6 mb-8"
      >
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-brand-500 mb-2">{percentage}%</div>
          <p className="text-muted-foreground">Your Score</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-brand-50 rounded-lg">
            <div className="font-bold text-xl text-brand-600">{score}</div>
            <p className="text-sm">Correct</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="font-bold text-xl text-red-500">{totalQuestions - score}</div>
            <p className="text-sm">Wrong</p>
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="font-bold text-xl">{formatTime(timeTaken)}</div>
          <p className="text-sm">Time Taken</p>
        </div>
      </motion.div>

      {/* Question review */}
      <h2 className="text-xl font-bold mb-4">Question Review</h2>
      
      <div className="space-y-6 mb-8">
        {questions.map((question: QuizQuestion, index: number) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">Question {index + 1}</span>
              {answers[question.id] === question.correctAnswer ? (
                <span className="text-green-500 flex items-center">
                  <Check size={16} className="mr-1" /> Correct
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <X size={16} className="mr-1" /> Wrong
                </span>
              )}
            </div>
            <p className="mb-3">{question.question}</p>
            
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-2 text-sm rounded ${
                    option === question.correctAnswer 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : option === answers[question.id] && option !== question.correctAnswer
                      ? "bg-red-100 dark:bg-red-900/30"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                      option === question.correctAnswer 
                        ? "bg-green-500 text-white"
                        : option === answers[question.id] && option !== question.correctAnswer
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}>
                      <span className="text-xs">{String.fromCharCode(65 + optIndex)}</span>
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {answers[question.id] !== question.correctAnswer && (
              <div className="mt-3 text-sm">
                <span className="font-medium">Correct answer: </span>
                {question.correctAnswer}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => navigate('/')}
        >
          <Home size={16} className="mr-2" /> Home
        </Button>
        <Button
          className="bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center"
          onClick={() => navigate('/quiz-setup')}
        >
          <RefreshCw size={16} className="mr-2" /> Try Again
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
