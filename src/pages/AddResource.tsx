
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AddResource = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  
  const handleSubmit = (type: string) => {
    toast.success(`${type === 'pdf' ? 'PDF' : 'Quiz'} resource added successfully!`);
  };
  
  return (
    <div className="p-5 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-brand-600 mb-2">Add Resource</h1>
        <p className="text-muted-foreground">
          Upload new learning materials for your academy
        </p>
      </motion.div>
      
      <Tabs defaultValue="pdf" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="pdf">PDF Resource</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pdf">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="pdf-title">Resource Title</Label>
              <Input id="pdf-title" placeholder="Enter resource title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pdf-description">Description</Label>
              <Input id="pdf-description" placeholder="Enter description" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pdf-file">Upload PDF</Label>
              <div className="border border-dashed border-input rounded-md py-8 px-4 text-center">
                <p className="text-muted-foreground mb-2">Drag & drop a file here or click to browse</p>
                <Button variant="outline" size="sm">Browse Files</Button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-brand-600 hover:bg-brand-700 text-white mt-4" 
              onClick={() => handleSubmit('pdf')}
            >
              Upload PDF Resource
            </Button>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="quiz">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input id="quiz-title" placeholder="Enter quiz title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-description">Description</Label>
              <Input id="quiz-description" placeholder="Enter description" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-duration">Duration (minutes)</Label>
              <Input id="quiz-duration" type="number" placeholder="30" />
            </div>
            
            <div className="space-y-2">
              <Label>Questions</Label>
              <div className="border border-input rounded-md p-4">
                <p className="text-sm text-muted-foreground mb-3">Add questions to your quiz</p>
                <Button variant="outline" className="w-full">Add Question</Button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-brand-600 hover:bg-brand-700 text-white mt-4"
              onClick={() => handleSubmit('quiz')}
            >
              Create Quiz
            </Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddResource;
