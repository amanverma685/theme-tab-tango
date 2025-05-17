
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

const PaperDetails = () => {
  const navigate = useNavigate();
  const [paperDetails, setPaperDetails] = useState({
    title: '',
    duration: '',
    instructions: '',
    watermark: '',
    includeAnswers: false,
    fontSize: 'standard' // very-small, small, standard, medium, large
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaperDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setPaperDetails(prev => ({ ...prev, includeAnswers: checked }));
  };

  const handleFontSizeChange = (size: string) => {
    setPaperDetails(prev => ({ ...prev, fontSize: size }));
  };

  const handleDownload = () => {
    console.log('Generating PDF with details:', paperDetails);
    // Navigate to results page or show a success message
    navigate('/download-paper/new');
  };

  const fontSizes = [
    { id: 'very-small', label: 'VERY SMALL' },
    { id: 'small', label: 'SMALL' },
    { id: 'standard', label: 'STANDARD' },
    { id: 'medium', label: 'MEDIUM' },
    { id: 'large', label: 'LARGE' }
  ];

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-brand-500" />
        </button>
        <h1 className="text-xl font-bold text-brand-500">Paper Details</h1>
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
            placeholder="Enter paper title"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {paperDetails.title.length}/30
          </div>
        </div>

        <div>
          <label className="block text-foreground mb-1">Exam Duration(in Minutes)</label>
          <Input
            name="duration"
            type="number"
            value={paperDetails.duration}
            onChange={handleInputChange}
            className="w-full border-brand-200"
            placeholder="Enter duration in minutes"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            3/3
          </div>
        </div>

        <div>
          <label className="block text-foreground mb-1">General Instructions</label>
          <Input
            name="instructions"
            value={paperDetails.instructions}
            onChange={handleInputChange}
            className="w-full border-brand-200"
            placeholder="Enter instructions"
          />
        </div>

        <div>
          <label className="block text-foreground mb-1">WaterMark</label>
          <Input
            name="watermark"
            value={paperDetails.watermark}
            onChange={handleInputChange}
            className="w-full border-brand-200"
            placeholder="Add watermark text"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {paperDetails.watermark.length}/15
          </div>
        </div>

        <div className="border border-brand-200 rounded-lg p-4 flex items-center justify-between">
          <span className="text-lg">Include Answers</span>
          <Switch 
            checked={paperDetails.includeAnswers} 
            onCheckedChange={handleSwitchChange} 
          />
        </div>

        <div>
          <h2 className="text-brand-500 font-medium mb-3">Font Size</h2>
          <div className="grid grid-cols-5 gap-2 border border-brand-200 rounded-lg p-4">
            {fontSizes.map((size) => (
              <div 
                key={size.id} 
                className="flex flex-col items-center"
                onClick={() => handleFontSizeChange(size.id)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    paperDetails.fontSize === size.id 
                      ? "bg-brand-500 text-white" 
                      : "border border-gray-400"
                  }`}
                >
                  {paperDetails.fontSize === size.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 rounded-full bg-white"
                    />
                  )}
                </div>
                <span className="text-xs text-center">{size.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <details>
            <summary className="text-brand-500 font-medium cursor-pointer mb-3">
              Advanced Options
            </summary>
            <div className="p-2 space-y-3">
              {/* Advanced options would go here */}
              <p className="text-sm text-muted-foreground">No advanced options available.</p>
            </div>
          </details>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          *Generating PDF may take 20-30 seconds
        </p>

        <Button 
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3"
          size="lg"
          onClick={handleDownload}
        >
          <Download size={18} className="mr-2" /> Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PaperDetails;
