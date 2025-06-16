'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">TypeFast</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Test your typing speed and accuracy</p>
        <button
          onClick={() => router.push('/typing-test')}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
