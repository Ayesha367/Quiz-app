"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Quiz Questions Array
const quizData = [
  { question: "What is Python?", options: ["A programming language", "A snake", "A database", "An operating system"], answer: "A programming language" },
  { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], answer: "def" },
  { question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: "Tuple" },
  { question: "How do you declare a variable in Python?", options: ["var x = 10", "x = 10", "let x = 10", "const x = 10"], answer: "x = 10" },
  { question: "What is used to iterate over a sequence in Python?", options: ["while loop", "for loop", "do-while loop", "repeat loop"], answer: "for loop" },
  { question: "Which of the following is used to read user input in Python?", options: ["scanf()", "input()", "readline()", "getInput()"], answer: "input()" },
  { question: "What does the `len()` function return?", options: ["The last index", "The total number of elements", "The first element", "The maximum value"], answer: "The total number of elements" },
  { question: "Which of these is NOT a valid data type in Python?", options: ["Integer", "String", "Float", "Character"], answer: "Character" },
  { question: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], answer: "#" },
  { question: "Which Python module is used for working with JSON?", options: ["json", "os", "sys", "csv"], answer: "json" }
];

// Context Type
interface QuizContextType {
  questions: typeof quizData;
  currentQuestion: number;
  score: number;
  timeLeft: number;
  quizFinished: boolean;
  selectedAnswer: string | null;
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
}

// Context Creation
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Context Provider Component
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questions] = useState(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // ✅ Use useCallback to prevent function recreation on every render
  const nextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => {
      if (prev < questions.length - 1) {
        setSelectedAnswer(null);
        setTimeLeft(10);
        return prev + 1;
      } else {
        setQuizFinished(true);
        return prev;
      }
    });
  }, [questions.length]);

  // Timer Logic
  useEffect(() => {
    if (quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          nextQuestion();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, quizFinished, nextQuestion]); // ✅ `nextQuestion` is now stable

  // Function to Select Answer
  const selectAnswer = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestion].answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  // Function to Restart Quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setTimeLeft(10);
  }, []);

  return (
    <QuizContext.Provider value={{ questions, currentQuestion, score, timeLeft, quizFinished, selectedAnswer, selectAnswer, nextQuestion, restartQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom Hook to Use Quiz Context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
