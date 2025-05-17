
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PaperDetails {
  id: string;
  title: string;
  subject: string;
  className: string;
  totalMarks: number;
  duration: string;
  difficulty: string;
  dateCreated: string;
  board: string;
}

const DownloadPaper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('download');
  
  // Mock data - in a real app, this would come from an API
  const [paperDetails, setPaperDetails] = useState<PaperDetails>({
    id: id || '1',
    title: 'Mathematics Test',
    subject: 'MATHEMATICS',
    className: 'All Competitive Exams',
    totalMarks: 62,
    duration: '999 Mins',
    difficulty: 'EASY',
    dateCreated: 'May 4, 2025',
    board: 'CBSE'
  });

  useEffect(() => {
    // In a real app, fetch paper details based on the id
    // This is just for demonstration
    if (id === '2') {
      setPaperDetails({
        id: '2',
        title: 'Physics Paper',
        subject: 'PHYSICS',
        className: 'JEE Mains',
        totalMarks: 75,
        duration: '180 Mins',
        difficulty: 'MEDIUM',
        dateCreated: 'May 4, 2025',
        board: 'CBSE'
      });
    }
  }, [id]);

  const handleAction = () => {
    switch(selectedOption) {
      case 'download':
        // Download functionality would go here
        console.log('Downloading paper');
        break;
      case 'generate':
        navigate('/add'); // Navigate to add resource page to create new paper
        break;
      case 'edit':
        navigate(`/edit-paper/${id}`);
        break;
    }
  };

  const options = [
    { id: 'download', label: 'Download Same Paper' },
    { id: 'generate', label: 'Generate New Set' },
    { id: 'edit', label: 'Edit and Save Again' }
  ];

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground p-1">
          <ArrowLeft size={24} className="text-brand-600" />
        </button>
        <h1 className="text-xl font-bold text-brand-600">Download Paper</h1>
        <button className="text-destructive p-1">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Paper details */}
        <InfoField label="Title" value={paperDetails.title} />
        <InfoField label="Subject" value={paperDetails.subject} />
        <InfoField label="Class" value={paperDetails.className} />
        <InfoField label="Total Marks" value={paperDetails.totalMarks.toString()} />
        <InfoField label="Duration" value={paperDetails.duration} />
        <InfoField label="Difficulty Level" value={paperDetails.difficulty} />
        <InfoField label="Date Created" value={paperDetails.dateCreated} />
        <InfoField label="Board" value={paperDetails.board} />

        {/* Further Action section */}
        <div className="border border-brand-200 rounded-lg p-4">
          <h2 className="text-brand-600 text-lg mb-3">Further Action</h2>
          <div className="space-y-3">
            {options.map((option) => (
              <motion.div
                key={option.id}
                className={`border rounded-lg p-3 flex items-center space-x-3 ${
                  selectedOption === option.id ? "border-brand-500" : "border-gray-300"
                }`}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(option.id)}
              >
                <div 
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedOption === option.id 
                      ? "border-brand-500 bg-brand-500" 
                      : "border-gray-400"
                  }`}
                >
                  {selectedOption === option.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full bg-white"
                    />
                  )}
                </div>
                <span className={selectedOption === option.id ? "text-brand-600 font-medium" : ""}>
                  {option.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Button 
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 mt-6"
        size="lg"
        onClick={handleAction}
      >
        Download Now
      </Button>
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-brand-200 rounded-lg p-4">
    <h2 className="text-brand-600 text-lg">{label}</h2>
    <p className="text-foreground text-lg">{value}</p>
  </div>
);

export default DownloadPaper;
