
import { motion } from 'framer-motion';
import { useProfile } from '@/contexts/ProfileContext';

const Home = () => {
  const { profile } = useProfile();
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome, {profile.username}!</h1>
        <p className="text-muted-foreground">
          This is your academy dashboard. Navigate to your profile to see and edit your details.
        </p>
      </motion.div>
      
      <div className="grid gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg border border-brand-100 dark:border-brand-800"
        >
          <h2 className="font-medium text-brand-800 dark:text-brand-300 mb-2">PDF Resources</h2>
          <div className="flex justify-between items-center">
            <span>Plan: {profile.pdfPlan.type}</span>
            <span className="bg-brand-100 dark:bg-brand-800 px-2 py-1 rounded text-sm">
              {profile.pdfPlan.remaining} remaining
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg border border-brand-100 dark:border-brand-800"
        >
          <h2 className="font-medium text-brand-800 dark:text-brand-300 mb-2">Quiz Resources</h2>
          <div className="flex justify-between items-center">
            <span>Plan: {profile.quizPlan.type}</span>
            <span className="bg-brand-100 dark:bg-brand-800 px-2 py-1 rounded text-sm">
              {profile.quizPlan.remaining} remaining
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg border border-brand-100 dark:border-brand-800"
        >
          <h2 className="font-medium text-brand-800 dark:text-brand-300 mb-2">Academy Info</h2>
          <p>Name: {profile.academyName}</p>
          <p>Location: {profile.academyLocation}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
