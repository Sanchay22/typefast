import { motion, type Variants } from 'framer-motion';
import { type Difficulty } from '@/lib/textGenerator';

interface HeaderProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  textSource: { source: string } | null;
}

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

export function Header({ difficulty, setDifficulty, textSource }: HeaderProps) {
  return (
    <motion.div 
      className="text-center mb-12"
      variants={itemVariants}
    >
      <motion.h1 
        className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        TypeFast
      </motion.h1>
      <motion.p 
        className="text-gray-600 dark:text-gray-400 text-lg mb-4"
        variants={itemVariants}
      >
        Test your typing speed and accuracy
      </motion.p>
      
      <motion.div 
        className="flex justify-center gap-4 mb-4"
        variants={itemVariants}
      >
        {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((level) => (
          <motion.button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              difficulty === level
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700/40'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {textSource && (
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          Source: {textSource.source}
        </motion.p>
      )}
    </motion.div>
  );
} 