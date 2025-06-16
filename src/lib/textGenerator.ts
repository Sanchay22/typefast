export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type TextCategory = 'general' | 'programming' | 'science' | 'literature' | 'quotes' | 'technology';

export interface DifficultyMetrics {
  avgWordLength: number;
  sentenceComplexity: number;
  specialCharacters: number;
  technicalTerms: number;
  score: number;
}

export interface TextSource {
  text: string;
  source: string;
  difficulty: Difficulty;
  category: TextCategory;
  tags?: string[];
  length?: number;
  stats?: TextStats;
}

export interface TextStats {
  wordCount: number;
  charCount: number;
  avgWordLength: number;
  sentenceCount: number;
  specialCharCount: number;
  complexity: number;
}

export interface TextOptions {
  difficulty?: Difficulty;
  category?: TextCategory;
  minLength?: number;
  maxLength?: number;
  tags?: string[];
  excludeTags?: string[];
}

// Technical terms dictionary for difficulty calculation
const technicalTerms = new Set([
  'algorithm', 'quantum', 'neural', 'optimization', 'microservice', 'architecture',
  'implementation', 'hyperparameter', 'backpropagation', 'superposition',
  'gradient', 'matrix', 'vector', 'probability', 'statistical', 'computational'
]);

// Easy texts - Simple words and short sentences
const easyTexts: TextSource[] = [
  {
    text: "The quick brown fox jumps over the lazy dog.",
    source: "Pangram",
    difficulty: "easy",
    category: "general"
  },
  {
    text: "Hello world! This is a simple typing test. Practice makes perfect.",
    source: "Basic",
    difficulty: "easy",
    category: "general"
  },
  {
    text: "The sun is bright. Birds are singing. Flowers are blooming.",
    source: "Nature",
    difficulty: "easy",
    category: "general"
  },
  {
    text: "I love to read books. Reading helps me learn new things every day.",
    source: "Education",
    difficulty: "easy",
    category: "general"
  },
  {
    text: "My cat likes to play with toys. She runs around the house all day.",
    source: "Pets",
    difficulty: "easy",
    category: "general"
  },
  {
    text: "Water is important for life. We should drink at least eight glasses daily.",
    source: "Health",
    difficulty: "easy",
    category: "general"
  }
];

// Medium texts - Longer sentences with some punctuation
const mediumTexts: TextSource[] = [
  {
    text: "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
    source: "Programming",
    difficulty: "medium",
    category: "programming"
  },
  {
    text: "The Internet is a global network of billions of computers and other electronic devices. With the Internet, it's possible to access almost any information, communicate with anyone else in the world, and do much more.",
    source: "Technology",
    difficulty: "medium",
    category: "general"
  },
  {
    text: "Effective communication is essential in business environments. It involves not only speaking clearly but also listening actively, understanding different perspectives, and responding appropriately to various situations.",
    source: "Business Communication",
    difficulty: "medium",
    category: "general"
  },
  {
    text: "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, human activities have been the main driver of climate change since the 1800s.",
    source: "Environmental Science",
    difficulty: "medium",
    category: "science"
  },
  {
    text: "Financial planning involves setting goals, assessing resources, and creating strategies to achieve financial objectives. It includes budgeting, saving, investing, and managing risks to secure one's financial future.",
    source: "Finance",
    difficulty: "medium",
    category: "general"
  }
];

// Hard texts - Complex sentences, technical terms, and numbers
const hardTexts: TextSource[] = [
  {
    text: "The quantum mechanical model of the atom describes the probability of finding an electron in a particular region of space around the nucleus. This model is based on the wave-particle duality of matter and the uncertainty principle.",
    source: "Science",
    difficulty: "hard",
    category: "science"
  },
  {
    text: "In software development, a microservice architecture is a method of developing software applications as a suite of independently deployable, small, modular services in which each service runs a unique process and communicates through a well-defined, lightweight mechanism.",
    source: "Technology",
    difficulty: "hard",
    category: "programming"
  },
  {
    text: "Macroeconomic policy encompasses fiscal policy (government spending and taxation) and monetary policy (interest rates and money supply). These tools are used to influence economic growth, employment levels, and price stability within a national economy.",
    source: "Economics",
    difficulty: "hard",
    category: "general"
  },
  {
    text: "Machine learning algorithms can be categorized into supervised learning (using labeled training data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through interaction with an environment).",
    source: "Artificial Intelligence",
    difficulty: "hard",
    category: "general"
  },
  {
    text: "The scientific method involves formulating hypotheses, designing controlled experiments, collecting and analyzing data, and drawing conclusions. Peer review and reproducibility are essential components that ensure the validity and reliability of scientific research.",
    source: "Scientific Method",
    difficulty: "hard",
    category: "general"
  }
];

// Expert texts - Very complex sentences, special characters, and code
const expertTexts: TextSource[] = [
  {
    text: "The implementation of neural networks in deep learning systems requires careful consideration of hyperparameters such as learning rate (η), batch size, and the number of epochs. The backpropagation algorithm, using gradient descent optimization, minimizes the loss function L(θ) = 1/n ∑(y_i - ŷ_i)².",
    source: "Machine Learning",
    difficulty: "expert",
    category: "programming"
  },
  {
    text: "In quantum computing, qubits can exist in superposition states, represented as |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1. The Hadamard gate H = 1/√2 [1 1; 1 -1] creates superposition states from basis states.",
    source: "Quantum Computing",
    difficulty: "expert",
    category: "science"
  },
  {
    text: "Blockchain consensus mechanisms like Proof-of-Work (PoW) and Proof-of-Stake (PoS) ensure network security and transaction validation. The Byzantine Generals Problem illustrates the challenge of achieving consensus in distributed systems where some nodes may be malicious or unreliable.",
    source: "Blockchain Technology",
    difficulty: "expert",
    category: "technology"
  },
  {
    text: "In computational complexity theory, P vs NP represents one of the most important unsolved problems. It asks whether every problem whose solution can be quickly verified (NP) can also be quickly solved (P). Most computer scientists believe P ≠ NP.",
    source: "Computer Science Theory",
    difficulty: "expert",
    category: "general"
  }
];

// Literature excerpts
const literatureTexts: TextSource[] = [
  {
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness.",
    source: "Charles Dickens - A Tale of Two Cities",
    difficulty: "medium",
    category: "literature"
  },
  {
    text: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.",
    source: "William Shakespeare - Hamlet",
    difficulty: "hard",
    category: "literature"
  },
  {
    text: "In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him, and without him was not any thing made that was made.",
    source: "The Bible - John 1:1-3",
    difficulty: "medium",
    category: "literature"
  }
];

// Combine all texts
export const allTexts: TextSource[] = [
  ...easyTexts,
  ...mediumTexts, 
  ...hardTexts,
  ...expertTexts,
  ...literatureTexts
];

// Calculate text statistics
export function getTextStats(text: string): TextStats {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  
  const avgWordLength = words.length > 0 
    ? words.reduce((sum, word) => sum + word.replace(/[^\w]/g, '').length, 0) / words.length 
    : 0;
  
  const complexity = calculateComplexity(text, words, sentences, specialChars);
  
  return {
    wordCount: words.length,
    charCount: text.length,
    avgWordLength: Math.round(avgWordLength * 100) / 100,
    sentenceCount: sentences.length,
    specialCharCount: specialChars,
    complexity: Math.round(complexity * 100) / 100
  };
}

// Calculate text complexity score
function calculateComplexity(text: string, words: string[], sentences: string[], specialChars: number): number {
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
  const avgWordLength = words.length > 0 
    ? words.reduce((sum, word) => sum + word.replace(/[^\w]/g, '').length, 0) / words.length 
    : 0;
  const specialCharRatio = text.length > 0 ? specialChars / text.length : 0;
  
  // Technical terms count
  const techTermCount = words.filter(word => 
    technicalTerms.has(word.toLowerCase().replace(/[^\w]/g, ''))
  ).length;
  const techTermRatio = words.length > 0 ? techTermCount / words.length : 0;
  
  // Weighted complexity score
  return (avgWordsPerSentence * 0.3) + 
         (avgWordLength * 0.3) + 
         (specialCharRatio * 100 * 0.2) + 
         (techTermRatio * 100 * 0.2);
}

// Calculate difficulty metrics
export function calculateDifficultyMetrics(text: string): DifficultyMetrics {
  const stats = getTextStats(text);
  const words = text.split(/\s+/).filter(word => word.length > 0);
  
  const techTermCount = words.filter(word => 
    technicalTerms.has(word.toLowerCase().replace(/[^\w]/g, ''))
  ).length;
  
  return {
    avgWordLength: stats.avgWordLength,
    sentenceComplexity: stats.wordCount / stats.sentenceCount || 0,
    specialCharacters: stats.specialCharCount,
    technicalTerms: techTermCount,
    score: stats.complexity
  };
}

// Auto-calculate difficulty based on metrics
export function calculateDifficulty(text: string): Difficulty {
  const metrics = calculateDifficultyMetrics(text);
  
  if (metrics.score < 5) return 'easy';
  if (metrics.score < 10) return 'medium';
  if (metrics.score < 20) return 'hard';
  return 'expert';
}

// Validate text source
function validateTextSource(textSource: TextSource): boolean {
  return textSource.text.length > 0 && 
         textSource.source.length > 0 && 
         ['easy', 'medium', 'hard', 'expert'].includes(textSource.difficulty) &&
         ['general', 'programming', 'science', 'literature', 'quotes', 'technology'].includes(textSource.category);
}

// Enhanced random text selection
export function getRandomText(difficulty?: Difficulty): TextSource {
  if (difficulty) {
    const filteredTexts = allTexts.filter(text => text.difficulty === difficulty);
    return filteredTexts[Math.floor(Math.random() * filteredTexts.length)];
  }
  return allTexts[Math.floor(Math.random() * allTexts.length)];
}

// Get texts by category
export function getTextsByCategory(category: TextCategory): TextSource[] {
  return allTexts.filter(text => text.category === category);
}

// Get texts by difficulty
export function getTextsByDifficulty(difficulty: Difficulty): TextSource[] {
  return allTexts.filter(text => text.difficulty === difficulty);
}

// Search texts by content
export function searchTexts(query: string): TextSource[] {
  const lowercaseQuery = query.toLowerCase();
  return allTexts.filter(text => 
    text.text.toLowerCase().includes(lowercaseQuery) ||
    text.source.toLowerCase().includes(lowercaseQuery) ||
    (text.tags && text.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
}

// Function to fetch a random quote from Quotable API
export async function getRandomQuote(): Promise<TextSource> {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return {
      text: data.content,
      source: data.author,
      difficulty: 'medium' as Difficulty,
      category: 'quotes'
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return getRandomText('medium');
  }
}
// Generate custom text for specific WPM targets
export function generateTextForWPM(targetWPM: number, durationMinutes: number = 1): TextSource {
  const targetWordCount = Math.ceil(targetWPM * durationMinutes);
  
  // Find texts close to target word count
  const suitableTexts = allTexts.filter(text => {
    const stats = getTextStats(text.text);
    return Math.abs(stats.wordCount - targetWordCount) <= targetWordCount * 0.2; // Within 20%
  });
  
  if (suitableTexts.length > 0) {
    return suitableTexts[Math.floor(Math.random() * suitableTexts.length)];
  }
  
  // Fallback to combining texts if needed
  return getRandomText();
}

// Get statistics for all texts
export function getCollectionStats() {
  const totalTexts = allTexts.length;
  const categories = [...new Set(allTexts.map(t => t.category))];
  const difficulties = [...new Set(allTexts.map(t => t.difficulty))];
  
  const categoryStats = categories.map(cat => ({
    category: cat,
    count: allTexts.filter(t => t.category === cat).length
  }));
  
  const difficultyStats = difficulties.map(diff => ({
    difficulty: diff,
    count: allTexts.filter(t => t.difficulty === diff).length
  }));
  
  return {
    totalTexts,
    categories: categoryStats,
    difficulties: difficultyStats,
    totalWords: allTexts.reduce((sum, text) => sum + getTextStats(text.text).wordCount, 0),
    averageLength: Math.round(allTexts.reduce((sum, text) => sum + text.text.length, 0) / totalTexts)
  };
}

// Example usage and testing
export function runTests() {
  console.log('=== Typing Test Generator Tests ===');
  
  // Test basic functionality
  console.log('\n1. Random texts:');
  console.log('Easy:', getRandomText('easy').text.substring(0, 50) + '...');
  console.log('Medium:', getRandomText('medium').text.substring(0, 50) + '...');
  console.log('Hard:', getRandomText('hard').text.substring(0, 50) + '...');
  console.log('Expert:', getRandomText('expert').text.substring(0, 50) + '...');
  
  // Test category filtering
  console.log('\n2. Category tests:');
  console.log('Programming:', getTextsByCategory('programming')[0].source);
  console.log('Science:', getTextsByCategory('science')[0].source);
  console.log('Literature:', getTextsByCategory('literature')[0].source);
  
  // Test stats
  console.log('\n3. Text statistics:');
  const sampleText = getRandomText();
  console.log('Sample text:', sampleText.text.substring(0, 30) + '...');
  console.log('Stats:', getTextStats(sampleText.text));
  
  // Test collection stats
  console.log('\n4. Collection statistics:');
  console.log(getCollectionStats());
  
  console.log('\n=== Tests completed ===');
}

// Initialize stats for all texts
allTexts.forEach(text => {
  if (!text.stats) {
    text.stats = getTextStats(text.text);
  }
  if (!text.length) {
    text.length = text.text.length;
  }
});

export default {
  getRandomText,
  getRandomQuote,
  getTextStats,
  calculateDifficulty,
  calculateDifficultyMetrics,
  getTextsByCategory,
  getTextsByDifficulty,
  searchTexts,
  generateTextForWPM,
  getCollectionStats,
  runTests,
  allTexts
};