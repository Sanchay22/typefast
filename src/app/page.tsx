'use client';

import { useState, useEffect, useCallback } from 'react';

const sampleText = "The quick brown fox jumps over the lazy dog. This is a sample text for typing practice. You can improve your typing speed and accuracy by practicing regularly.";

export default function Home() {
  const [text, setText] = useState(sampleText);
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTestComplete, setIsTestComplete] = useState(false);

  const calculateWPM = useCallback(() => {
    const words = userInput.trim().split(/\s+/).length;
    const minutes = (60 - time) / 60;
    return Math.round(words / minutes);
  }, [userInput, time]);

  const calculateAccuracy = useCallback(() => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    return Math.round((correct / userInput.length) * 100) || 100;
  }, [userInput, text]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsTimerRunning(false);
      setIsTestComplete(true);
      setWpm(calculateWPM());
      setAccuracy(calculateAccuracy());
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, time, calculateWPM, calculateAccuracy]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTimerRunning && !isTestComplete) {
      setIsTimerRunning(true);
    }
    setUserInput(e.target.value);
    setWpm(calculateWPM());
    setAccuracy(calculateAccuracy());
  };

  const resetTest = () => {
    setUserInput('');
    setTime(60);
    setIsTimerRunning(false);
    setIsTestComplete(false);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">TypeFast</h1>
          <p className="text-gray-600 dark:text-gray-400">Test your typing speed and accuracy</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-mono">{time}s</div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
                <div className="text-xl font-bold">{wpm}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                <div className="text-xl font-bold">{accuracy}%</div>
              </div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
              {text.split('').map((char, index) => {
                let color = 'text-gray-800 dark:text-gray-200';
                if (index < userInput.length) {
                  color = userInput[index] === char
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400';
                }
                return <span key={index} className={color}>{char}</span>;
              })}
            </p>
          </div>

          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isTestComplete}
            className="w-full p-4 text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Start typing..."
          />

          {isTestComplete && (
            <div className="mt-4 text-center">
              <button
                onClick={resetTest}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
