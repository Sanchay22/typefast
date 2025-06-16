import { motion, type Variants } from 'framer-motion';

interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  time: number;
  userInputLength: number;
  onClose: () => void;
}

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

const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

export function ResultsModal({ wpm, accuracy, time, userInputLength, onClose }: ResultsModalProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 max-w-md w-full backdrop-blur-lg border border-gray-200 dark:border-gray-700"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Test Complete!
        </motion.h2>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Words Per Minute", value: wpm, color: "text-blue-600 dark:text-blue-400" },
            { label: "Accuracy", value: `${accuracy}%`, color: "text-green-600 dark:text-green-400" },
            { label: "Time Taken", value: `${60 - time}s`, color: "text-gray-900 dark:text-white" },
            { label: "Characters Typed", value: userInputLength, color: "text-gray-900 dark:text-white" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
              variants={itemVariants}
              custom={index}
            >
              <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
              <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}