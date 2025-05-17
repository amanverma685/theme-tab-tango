
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, ArrowLeft, CheckSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

type PlanType = 'pdf' | 'quiz';

interface PlanProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradePlans = ({ isOpen, onClose }: PlanProps) => {
  const [planType, setPlanType] = useState<PlanType>('pdf');
  const navigate = useNavigate();

  const monkeyIconUrl = "https://i.imgur.com/2ISgYja.png"; // Example monkey icon URL

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-background">
        <div className="h-full overflow-y-auto pb-20">
          <div className="sticky top-0 z-20 bg-background p-4 border-b">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="text-foreground p-1">
                <ArrowLeft size={24} className="text-brand-600" />
              </button>
              <h2 className="text-xl font-bold text-brand-600">Upgrade Plan</h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
          </div>

          <div className="p-4">
            {/* Plan Type Selector */}
            <div className="flex bg-muted rounded-lg mb-6">
              <button 
                className={`flex-1 py-3 px-4 text-center rounded-lg transition-all ${planType === 'pdf' ? 'bg-brand-600 text-white' : 'text-foreground'}`}
                onClick={() => setPlanType('pdf')}
              >
                PDF Plans
              </button>
              <button 
                className={`flex-1 py-3 px-4 text-center rounded-lg transition-all ${planType === 'quiz' ? 'bg-brand-600 text-white' : 'text-foreground'}`}
                onClick={() => setPlanType('quiz')}
              >
                Quiz Plans
              </button>
            </div>

            {/* Monkey Icon */}
            <div className="flex justify-center my-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
                <img src={monkeyIconUrl} alt="Subscription Mascot" className="w-20 h-20" />
              </div>
            </div>

            {planType === 'pdf' ? (
              <div className="space-y-4">
                {/* Gold Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Gold Pack
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Papers Count : </span>15</div>
                    <div><span className="font-semibold text-brand-600">Pack Validity : </span>Three Months</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Gold Pack', price: '₹99' } })}
                    >
                      Pay ₹99
                    </Button>
                  </div>
                </Card>

                {/* Platinum Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Platinum Pack
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Papers Count : </span>35</div>
                    <div><span className="font-semibold text-brand-600">Pack Validity : </span>Six Months</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Platinum Pack', price: '₹199' } })}
                    >
                      Pay ₹199
                    </Button>
                  </div>
                </Card>

                {/* Diamond Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Diamond Pack (Offer)
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Papers Count : </span>100</div>
                    <div className="flex justify-between">
                      <div><span className="font-semibold text-brand-600">Pack Validity : </span>One Year</div>
                      <div className="text-brand-600 font-bold">20% OFF</div>
                    </div>
                    <div className="text-sm font-bold">LIMITED TIME OFFER</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Diamond Pack', price: '₹399' } })}
                    >
                      Pay ₹399
                    </Button>
                  </div>
                </Card>

                {/* Unlimited Gold Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Unlimited Gold Pack
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Papers Count : </span>Unlimited</div>
                    <div><span className="font-semibold text-brand-600">Pack Validity : </span>Six Months</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Unlimited Gold Pack', price: '₹499' } })}
                    >
                      Pay ₹499
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Basic Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Basic Pack
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Quizzes : </span>90</div>
                    <div><span className="font-semibold text-brand-600">Pack Validity : </span>Three Months</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Basic Pack', price: '₹90' } })}
                    >
                      Pay ₹90
                    </Button>
                  </div>
                </Card>

                {/* Premium Pack */}
                <Card className="border rounded-lg overflow-hidden">
                  <div className="bg-brand-600 text-white py-2 text-center font-bold">
                    Premium Pack
                  </div>
                  <div className="p-4 space-y-2 text-center">
                    <div><span className="font-semibold text-brand-600">Total Quizzes : </span>Unlimited</div>
                    <div><span className="font-semibold text-brand-600">Pack Validity : </span>One Year</div>
                    <Button
                      className="mt-2 bg-brand-600 hover:bg-brand-700 w-32 rounded-full"
                      onClick={() => navigate('/payment', { state: { plan: 'Premium Pack', price: '₹365' } })}
                    >
                      Pay ₹365
                    </Button>
                  </div>
                </Card>

                <div className="mt-4 pt-2 border-t">
                  <h3 className="text-center text-brand-600 font-medium mb-3">*Included Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckSquare size={18} className="text-brand-600 mr-2" />
                      <span>Select Any Number of Chapters</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare size={18} className="text-brand-600 mr-2" />
                      <span>Take Quiz test for All Classes & Subjects</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare size={18} className="text-brand-600 mr-2" />
                      <span>Full Customer Support</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                className="text-brand-600"
                onClick={() => navigate('/payment-help')}
              >
                Payment Help
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpgradePlans;
