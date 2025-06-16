'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { getRandomText, getRandomQuote, type Difficulty, type TextSource } from '../../lib/textGenerator';
import { Header } from '../../components/typing-test/Header';
import { Stats } from '../../components/typing-test/Stats';
import { TextDisplay } from '../../components/typing-test/TextDisplay';
import { ResultsModal } from '../../components/typing-test/ResultModal';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function TypingTest() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [textSource, setTextSource] = useState<TextSource | null>(null);
  
  // Use refs to avoid stale closures in intervals
  const startTimeRef = useRef<number | null>(null);
  const userInputRef = useRef('');
  const isTestCompleteRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    isTestCompleteRef.current = isTestComplete;
  }, [isTestComplete]);

  const generateNewText = useCallback(async () => {
    let newTextSource: TextSource;
    
    // Randomly choose between different text sources
    const sourceType = Math.random();
    if (sourceType < 0.4) {
      newTextSource = getRandomText(difficulty);
    } else {
      newTextSource = await getRandomQuote();
    }
    
    setTextSource(newTextSource);
    setText(newTextSource.text);
  }, [difficulty]);

  useEffect(() => {
    generateNewText();
  }, [generateNewText]);

  const calculateWPM = useCallback((currentInput?: string, currentStartTime?: number) => {
    const inputToUse = currentInput ?? userInputRef.current;
    const timeToUse = currentStartTime ?? startTimeRef.current;
    
    if (!timeToUse || inputToUse.length === 0) return 0;
    
    // Count words (split by spaces and filter empty strings)
    const words = inputToUse.trim().split(/\s+/).filter(word => word.length > 0).length;
    const timeElapsed = (Date.now() - timeToUse) / 1000 / 60; // Convert to minutes
    
    if (timeElapsed === 0) return 0;
    return Math.round(words / timeElapsed);
  }, []);

  const calculateAccuracy = useCallback((currentInput?: string) => {
    const inputToUse = currentInput ?? userInputRef.current;
    if (inputToUse.length === 0) return 100;
    
    let correct = 0;
    for (let i = 0; i < inputToUse.length; i++) {
      if (inputToUse[i] === text[i]) {
        correct++;
      }
    }
    return Math.round((correct / inputToUse.length) * 100);
  }, [text]);

  const endTest = useCallback(() => {
    setIsTimerRunning(false);
    setIsTestComplete(true);
    setShowResults(true);
    
    // Calculate final stats
    const finalWpm = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
  }, [calculateWPM, calculateAccuracy]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerRunning && time > 0 && !isTestComplete) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setTimeout(() => {
              if (!isTestCompleteRef.current) {
                endTest();
              }
            }, 0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, time, isTestComplete, endTest]);

  // Dynamic WPM and accuracy updates
  useEffect(() => {
    let updateTimer: NodeJS.Timeout;
    
    if (isTimerRunning && !isTestComplete) {
      updateTimer = setInterval(() => {
        const currentWpm = calculateWPM();
        const currentAccuracy = calculateAccuracy();
        setWpm(currentWpm);
        setAccuracy(currentAccuracy);
      }, 250);
    }

    return () => {
      if (updateTimer) {
        clearInterval(updateTimer);
      }
    };
  }, [isTimerRunning, isTestComplete, calculateWPM, calculateAccuracy]);

  // Check for text completion
  useEffect(() => {
    if (userInput.length === text.length && userInput.length > 0 && !isTestComplete) {
      endTest();
    }
  }, [userInput, text, isTestComplete, endTest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    
    if (newInput.length <= text.length && !isTestComplete) {
      if (!isTimerRunning && newInput.length > 0) {
        setIsTimerRunning(true);
        setStartTime(Date.now());
      }
      setUserInput(newInput);
      
      if (isTimerRunning) {
        const currentWpm = calculateWPM(newInput, startTime ?? undefined);
        const currentAccuracy = calculateAccuracy(newInput);
        setWpm(currentWpm);
        setAccuracy(currentAccuracy);
      }
    }
  };

  const resetTest = () => {
    setUserInput('');
    setTime(60);
    setIsTimerRunning(false);
    setIsTestComplete(false);
    setShowResults(false);
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    generateNewText();
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header 
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          textSource={textSource}
        />

        <motion.div 
          className="space-y-8"
          variants={itemVariants}
        >
          <Stats 
            time={time}
            wpm={wpm}
            accuracy={accuracy}
          />

          <TextDisplay 
            text={text}
            userInput={userInput}
          />

          <motion.textarea
            value={userInput}
            onChange={handleInputChange}
            disabled={isTestComplete}
            className="w-full p-4 text-lg font-mono bg-white/40 dark:bg-gray-800/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 resize-none backdrop-blur-sm"
            placeholder={isTestComplete ? "Test completed!" : "Start typing the text above..."}
            rows={4}
            autoFocus
            variants={itemVariants}
            whileFocus={{ scale: 1.01 }}
          />

          <AnimatePresence>
            {isTestComplete && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <motion.button
                  onClick={resetTest}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showResults && (
          <ResultsModal
            wpm={wpm}
            accuracy={accuracy}
            time={time}
            userInputLength={userInput.length}
            onClose={() => {
              setShowResults(false);
              resetTest();
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}