import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypingTestProps {
  text: string;
  onComplete: (stats: { wpm: number; accuracy: number; errors: number }) => void;
}

export const TypingTest: React.FC<TypingTestProps> = ({ text, onComplete }) => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const calculateWPM = useCallback((timeInSeconds: number, correctChars: number) => {
    const words = correctChars / 5; // Standard word length is 5 characters
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
  }, []);

  const calculateAccuracy = useCallback((totalChars: number, errorCount: number) => {
    return Math.round(((totalChars - errorCount) / totalChars) * 100);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.length <= text.length) {
      setInput(value);
      
      // Count errors
      let newErrors = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== text[i]) {
          newErrors++;
        }
      }
      setErrors(newErrors);

      // Check if test is complete
      if (value.length === text.length) {
        const timeElapsed = (Date.now() - startTime!) / 1000;
        const wpm = calculateWPM(timeElapsed, value.length - newErrors);
        const accuracy = calculateAccuracy(value.length, newErrors);
        
        setIsComplete(true);
        onComplete({ wpm, accuracy, errors: newErrors });
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="text-lg font-mono whitespace-pre-wrap">
          {text.split('').map((char, index) => {
            let className = 'text-gray-400';
            if (index < input.length) {
              className = input[index] === char
                ? 'text-green-500'
                : 'text-red-500 bg-red-100';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
      
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        disabled={isComplete}
        className="w-full p-4 text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing..."
      />
    </div>
  );
};
