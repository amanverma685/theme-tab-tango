
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const EditPaper = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [paperDetails, setPaperDetails] = useState({
    title: '',
    subject: '',
    className: '',
    totalMarks: '',
    duration: '',
    difficulty: '',
    instructions: '',
    watermark: '',
    questions: [] as string[]
  });
  
  useEffect(() => {
    // In a real app, fetch paper details from API
    // For demo, we'll use mock data
    setPaperDetails({
      title: 'Mathematics Test',
      subject: 'MATHEMATICS',
      className: 'All Competitive Exams',
      totalMarks: '62',
      duration: '999',
      difficulty: 'EASY',
      instructions: 'Answer all questions. Each question carries equal marks.',
      watermark: 'PAPERMONK',
      questions: [
        'Solve the equation 2x + 5 = 15',
        'Find the derivative of f(x) = x² + 3x + 1',
        'Calculate the area of a circle with radius 7cm'
      ]
    });
  }, [id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaperDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleQuestionChange = (index: number, value: string) => {
    setPaperDetails(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = value;
      return { ...prev, questions: newQuestions };
    });
  };
  
  const handleAddQuestion = () => {
    setPaperDetails(prev => ({
      ...prev,
      questions: [...prev.questions, '']
    }));
  };
  
  const handleRemoveQuestion = (index: number) => {
    setPaperDetails(prev => {
      const newQuestions = [...prev.questions];
      newQuestions.splice(index, 1);
      return { ...prev, questions: newQuestions };
    });
  };
  
  const handleSave = () => {
    // In a real app, save to API
    console.log('Saving paper:', paperDetails);
    toast.success('Paper saved successfully');
    navigate(`/download-paper/${id}`);
  };
  
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-brand-500" />
        </button>
        <h1 className="text-xl font-bold text-brand-500">Edit Paper</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-foreground mb-1">Paper Title</label>
          <Input
            name="title"
            value={paperDetails.title}
            onChange={handleInputChange}
            className="w-full border-brand-200"
          />
        </div>
        
        <div>
          <label className="block text-foreground mb-1">Subject</label>
          <Input
            name="subject"
            value={paperDetails.subject}
            onChange={handleInputChange}
            className="w-full border-brand-200"
          />
        </div>
        
        <div>
          <label className="block text-foreground mb-1">Class/Exam Type</label>
          <Input
            name="className"
            value={paperDetails.className}
            onChange={handleInputChange}
            className="w-full border-brand-200"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-1">Total Marks</label>
            <Input
              name="totalMarks"
              type="number"
              value={paperDetails.totalMarks}
              onChange={handleInputChange}
              className="w-full border-brand-200"
            />
          </div>
          
          <div>
            <label className="block text-foreground mb-1">Duration (mins)</label>
            <Input
              name="duration"
              type="number"
              value={paperDetails.duration}
              onChange={handleInputChange}
              className="w-full border-brand-200"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-foreground mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={paperDetails.difficulty}
            onChange={handleInputChange as any}
            className="w-full border-brand-200 rounded-md p-2"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>
        
        <div>
          <label className="block text-foreground mb-1">Instructions</label>
          <Textarea
            name="instructions"
            value={paperDetails.instructions}
            onChange={handleInputChange}
            className="w-full border-brand-200"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-foreground mb-1">Watermark</label>
          <Input
            name="watermark"
            value={paperDetails.watermark}
            onChange={handleInputChange}
            className="w-full border-brand-200"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Questions</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddQuestion}
              className="text-brand-500 border-brand-500"
            >
              Add Question
            </Button>
          </div>
          
          {paperDetails.questions.map((question, index) => (
            <div key={index} className="mb-4 border border-brand-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <label className="block text-foreground">Question {index + 1}</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 h-6 p-0"
                >
                  Remove
                </Button>
              </div>
              <Textarea
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full border-brand-200"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Button
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 mt-6"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditPaper;
