export type Difficulty = 'easy' | 'medium' | 'hard';

interface TextEngineProps {
  difficulty: Difficulty;
  onTextGenerated: (text: string) => void;
}

const textPool = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "Sphinx of black quartz, judge my vow.",
    "Crazy Fredrick bought many very exquisite opal jewels."
  ],
  medium: [
    "The five boxing wizards jump quickly. The early morning rays filtered through the dusty window panes, casting long shadows across the wooden floor.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood? The answer lies in the heart of the forest.",
    "The quick brown fox jumps over the lazy dog while the clever cat watches from the shadows, plotting its next move.",
    "She sells seashells by the seashore, and the shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
    "The early bird catches the worm, but the second mouse gets the cheese. Life is full of such interesting paradoxes."
  ],
  hard: [
    "The anthropomorphic qualities of the mechanical devices in the laboratory were uncanny, as if they possessed a consciousness of their own, watching and waiting for the perfect moment to spring into action.",
    "The quantum entanglement of particles in the experiment defied classical physics, creating a paradox that challenged our understanding of space-time and the fundamental nature of reality itself.",
    "The cryptographic algorithm implemented a sophisticated hashing function that utilized multiple layers of encryption, making it virtually impossible to crack without the proper decryption key.",
    "The philosophical implications of artificial intelligence raise profound questions about consciousness, free will, and the nature of human existence in an increasingly technological world.",
    "The intricate dance of subatomic particles within the quantum field creates a complex web of interactions that scientists are only beginning to understand, revealing the beautiful complexity of the universe."
  ]
};

export const TextEngine: React.FC<TextEngineProps> = ({ difficulty, onTextGenerated }) => {
  const generateText = () => {
    const texts = textPool[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedText = texts[randomIndex];
    onTextGenerated(selectedText);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Difficulty: {difficulty}</h2>
        <button
          onClick={generateText}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          New Text
        </button>
      </div>
    </div>
  );
}; 