"use client";
import React from "react";

type QuestionCardProps = {
  question: string;
  options: string[];
  answer: string;
  onSelect: (answer: string) => void;
  selectedAnswer: string | null;
};

export default function QuestionCard({ question, options, answer, onSelect, selectedAnswer }: QuestionCardProps) {
  return (
    <div className="w-full max-w-md bg-purple-900 text-white p-6 rounded-lg shadow-lg text-center">
      <div className="text-sm mb-2">{question}</div>
      <div className="mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full px-4 py-2 mt-2 rounded-md text-white 
            ${selectedAnswer === option ? (option === answer ? "bg-green-500" : "bg-red-500") : "bg-purple-600 hover:bg-purple-500"}`}
            onClick={() => onSelect(option)}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && selectedAnswer !== answer && (
        <p className="text-red-300 mt-2">Correct Answer: {answer}</p>
      )}
    </div>
  );
}
