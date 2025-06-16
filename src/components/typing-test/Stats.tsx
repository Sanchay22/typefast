import { motion, type Variants } from 'framer-motion';

interface StatsProps {
  time: number;
  wpm: number;
  accuracy: number;
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

export function Stats({ time, wpm, accuracy }: StatsProps) {
  return (
    <motion.div 
      className="flex justify-between items-center"
      variants={itemVariants}
    >
      <motion.div 
        className="text-3xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {time}s
      </motion.div>
      <motion.div 
        className="flex gap-8"
        variants={itemVariants}
      >
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{wpm}</div>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}