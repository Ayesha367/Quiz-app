"use client";
import { QuizProvider } from "./context/QuizContext";
import Quiz from "@/app/quiz"; // ✅ Use `Quiz` instead of `QuestionCard`

export default function Home() {
  return (
    <QuizProvider>
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
        <Quiz /> {/* ✅ Now this will correctly handle the questions */}
      </div>
    </QuizProvider>
  );
}
