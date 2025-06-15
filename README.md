# TypeFast - Modern Typing Speed Test Application

TypeFast is a modern, feature-rich typing speed test application built with Next.js, TypeScript, and Tailwind CSS. It provides an engaging platform for users to improve their typing speed and accuracy through various difficulty levels and real-time feedback.

## Features

### 🚀 Real-time Typing Analysis
- Character-by-character comparison
- Instant error highlighting
- Live WPM (Words Per Minute) calculation
- Accuracy tracking
- Error count monitoring

### 📊 Performance Statistics
- Detailed performance metrics
- Interactive performance charts
- Historical data visualization
- Progress tracking over time

### 🎯 Multiple Difficulty Levels
- Easy: Short, simple sentences
- Medium: Longer, more complex passages
- Hard: Technical and complex content

### 🎨 Modern UI/UX
- Clean, minimalist design
- Responsive layout
- Smooth animations with Framer Motion
- Real-time visual feedback
- Dark mode support

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database**: Prisma (for future features)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/typefast.git
   cd typefast
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
typefast/
├── components/
│   ├── TypingTest.tsx      # Main typing test component
│   ├── StatisticsDisplay.tsx # Performance statistics
│   └── TextEngine.tsx      # Text generation engine
├── lib/                    # Utility functions
├── prisma/                 # Database schema
├── public/                 # Static assets
└── src/                    # Source files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Future Enhancements

- [ ] User authentication
- [ ] Global leaderboards
- [ ] Custom text input
- [ ] Multiple language support
- [ ] Practice mode with specific focus areas
- [ ] Mobile app version

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

Made with ❤️ by Sanchay Jadon
