import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StatisticsDisplayProps {
  wpm: number;
  accuracy: number;
  errors: number;
  history: Array<{
    wpm: number;
    accuracy: number;
    timestamp: number;
  }>;
}

export const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({
  wpm,
  accuracy,
  errors,
  history
}) => {
  const chartData = history.map((item, index) => ({
    name: `Test ${index + 1}`,
    wpm: item.wpm,
    accuracy: item.accuracy
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">WPM</h3>
          <p className="text-3xl font-bold text-blue-600">{wpm}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Accuracy</h3>
          <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Errors</h3>
          <p className="text-3xl font-bold text-red-600">{errors}</p>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Performance History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                stroke="#3B82F6"
                strokeWidth={2}
                name="WPM"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke="#10B981"
                strokeWidth={2}
                name="Accuracy"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 