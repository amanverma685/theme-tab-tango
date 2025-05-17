
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, X } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O"
  },
  {
    id: 4,
    question: "Which of the following is a prime number?",
    options: ["4", "9", "15", "17"],
    correctAnswer: "17"
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  // Add more mock questions if needed
];

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizSettings = location.state || { duration: 30, difficulty: 'medium', questionsCount: 5 };
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(quizSettings.duration * 60); // in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  // Set up questions based on difficulty and count
  useEffect(() => {
    // In a real app, you'd fetch questions from an API based on settings
    // For now, we'll just use our mock questions and limit by count
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, quizSettings.questionsCount));
  }, [quizSettings.questionsCount]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestionIndex].id]: answer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSlideDirection('left');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSlideDirection('right');
      }, 300);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSlideDirection('left');
      }, 300);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    // In a real app, you'd submit the answers to the server
    console.log("Quiz completed with answers:", selectedAnswers);
    navigate('/quiz-results', { 
      state: { 
        answers: selectedAnswers, 
        questions, 
        timeTaken: quizSettings.duration * 60 - timeLeft 
      } 
    });
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading quiz questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="p-4 pb-20">
      {/* Quiz header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Clock size={16} className="text-brand-500 mr-2" />
            <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => navigate('/home')}
            className="border-brand-500 text-brand-500"
          >
            <X size={16} /> Exit Quiz
          </Button>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between text-sm mt-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-brand-500 font-medium">
            {quizSettings.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Question and options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ 
            opacity: 0, 
            x: slideDirection === 'right' ? 100 : -100 
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ 
            opacity: 0, 
            x: slideDirection === 'right' ? -100 : 100 
          }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-lg font-medium mb-4">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
                className={`border p-4 rounded-lg ${
                  selectedAnswers[currentQuestion.id] === option
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelectAnswer(option)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedAnswers[currentQuestion.id] === option
                      ? "bg-brand-500 text-white"
                      : "border border-gray-400"
                  }`}>
                    <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background">
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1 border-brand-500 text-brand-500"
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevQuestion}
          >
            Previous
          </Button>
          <Button
            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
