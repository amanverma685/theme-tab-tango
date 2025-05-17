
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProfile } from '@/contexts/ProfileContext';

interface ThemeColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeColorPicker = ({ isOpen, onClose }: ThemeColorPickerProps) => {
  const { profile, updateThemeColor } = useProfile();
  const [selectedColor, setSelectedColor] = useState(profile.themeColor);
  
  const colorOptions = [
    { color: '#FF5722', name: 'Orange' },
    { color: '#2196F3', name: 'Blue' },
    { color: '#4CAF50', name: 'Green' },
    { color: '#E91E63', name: 'Pink' },
    { color: '#9C27B0', name: 'Purple' },
    { color: '#F44336', name: 'Red' },
    { color: '#FFEB3B', name: 'Yellow' },
    { color: '#00BCD4', name: 'Cyan' },
    { color: '#795548', name: 'Brown' },
    { color: '#607D8B', name: 'Blue Grey' },
    { color: '#009688', name: 'Teal' },
    { color: '#673AB7', name: 'Deep Purple' }
  ];
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleApplyTheme = () => {
    updateThemeColor(selectedColor);
    onClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-background">
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 z-20 bg-background p-4 border-b">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="text-foreground p-1">
                <ArrowLeft size={24} className="text-brand-600" />
              </button>
              <h2 className="text-xl font-bold text-brand-600">Choose Theme Color</h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Select a color to customize the app theme:</p>
              <div className="w-full h-16 rounded-lg mb-3" style={{ backgroundColor: selectedColor }}></div>
              <p className="text-center">Selected: {colorOptions.find(c => c.color === selectedColor)?.name || 'Custom'}</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {colorOptions.map((option) => (
                <motion.div
                  key={option.color}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                  onClick={() => handleColorSelect(option.color)}
                >
                  <div 
                    className="w-full aspect-square rounded-lg shadow-sm border"
                    style={{ backgroundColor: option.color }}
                  >
                    {selectedColor === option.color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1">
                          <Check size={16} className="text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs mt-1 text-center">{option.name}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-lg font-bold text-white"
              style={{ backgroundColor: selectedColor }}
              onClick={handleApplyTheme}
            >
              Apply Theme
            </motion.button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeColorPicker;
