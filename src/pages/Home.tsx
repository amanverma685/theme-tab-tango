
import { motion } from 'framer-motion';
import { useProfile } from '@/contexts/ProfileContext';
import { Search, ArrowRight, PenLine } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface TestPaper {
  id: string;
  title: string;
  date: string;
  difficulty: string;
  examType: string;
}

const Home = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock test papers data - in a real app, this would come from an API
  const testPapers: TestPaper[] = [
    {
      id: '1',
      title: 'Mathematics Test',
      date: 'May 4, 2025',
      difficulty: 'EASY',
      examType: 'All Competitive Exams'
    },
    {
      id: '2',
      title: 'Physics Paper',
      date: 'May 4, 2025',
      difficulty: 'EASY',
      examType: 'JEE Mains'
    },
  ];
  
  const filteredPapers = testPapers.filter(paper => 
    paper.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome, {profile.username}!</h1>
        <p className="text-muted-foreground">
          This is your academy dashboard.
        </p>
      </motion.div>
      
      {/* Get Started Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border-2 border-brand-500 rounded-lg p-6 mb-6 relative overflow-hidden"
      >
        <h2 className="text-xl font-bold">Get Started Now!</h2>
        <p className="text-muted-foreground mb-0">Create Question Papers From Lacs Of Questions</p>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <PenLine size={40} className="text-brand-500" />
        </div>
      </motion.div>
      
      {/* Take Online Quiz Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border rounded-lg p-5 mb-6 flex items-center justify-between"
        onClick={() => navigate('/quiz-setup')}
      >
        <div className="flex items-center">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-full mr-4">
            <div className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">NEW</div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Take Online Quiz</h3>
            <p className="text-sm text-muted-foreground">Test Your Knowledge with Our Engaging Online Quizzes</p>
          </div>
        </div>
        <ArrowRight className="text-brand-500" />
      </motion.div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search by title or class"
          className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      
      {/* Test Paper List */}
      <div className="space-y-4">
        {filteredPapers.map(paper => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border"
            onClick={() => navigate(`/download-paper/${paper.id}`)}
          >
            <div className="flex items-center">
              <div className="bg-brand-500 text-white p-4 flex-shrink-0 h-full flex items-center justify-center w-20">
                <span className="text-xs font-medium text-center">{paper.examType}</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{paper.title}</h3>
                <p className="text-sm text-muted-foreground">{paper.date} ({paper.difficulty})</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
