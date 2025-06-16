import { motion, type Variants } from 'framer-motion';

interface TextDisplayProps {
  text: string;
  userInput: string;
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

export function TextDisplay({ text, userInput }: TextDisplayProps) {
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-gray-400 dark:text-gray-500';
      
      if (index < userInput.length) {
        className = userInput[index] === char
          ? 'text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/20'
          : 'text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/20';
      } else if (index === userInput.length) {
        className = 'text-gray-900 dark:text-gray-100 bg-gray-200/80 dark:bg-gray-700/80';
      }
      
      return (
        <motion.span
          key={index}
          className={className}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.01 }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <motion.div 
      className="p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-sm"
      variants={itemVariants}
    >
      <p className="text-lg font-mono leading-relaxed select-none">
        {renderText()}
      </p>
    </motion.div>
  );
}