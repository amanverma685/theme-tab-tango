
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentHelp = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="text-brand-600" />
        </Button>
        <h1 className="text-2xl font-bold text-brand-600 ml-2">Payment Help</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-medium mb-3">Payment Methods</h2>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Credit / Debit Cards</li>
            <li>UPI (Google Pay, PhonePe, Paytm)</li>
            <li>Net Banking</li>
            <li>Wallets (PayTM, PhonePe, Amazon Pay)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Having Trouble?</h2>
          <p>If you're experiencing issues with payment, please try the following:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Ensure you have sufficient balance in your account</li>
            <li>Check your internet connection</li>
            <li>Try a different payment method</li>
            <li>Clear your browser cache and try again</li>
            <li>Contact your bank to ensure online transactions are enabled</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Contact Support</h2>
          <p>If you continue to face issues, please contact our support team:</p>
          <div className="mt-3">
            <p><strong>Email:</strong> support@edulearning.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Support Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
          </div>
        </section>

        <Button 
          className="w-full bg-brand-600 hover:bg-brand-700 mt-6"
          onClick={() => window.location.href = 'mailto:support@edulearning.com'}
        >
          Email Support
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentHelp;
