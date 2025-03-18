"use client";
import { useQuiz } from "@/app/context/QuizContext";
import QuestionCard from "@/components/QuestionCard";

export default function Quiz() {
  const { questions, currentQuestion, timeLeft, selectedAnswer, selectAnswer, nextQuestion, score, quizFinished, restartQuiz } = useQuiz();
  const question = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      {quizFinished ? (
        <div className="bg-purple-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-2">Your Score: <span className="font-bold text-yellow-400">{score}</span> / {questions.length}</p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-lg">Time Left: {timeLeft}s</p>
          {question && (
            <QuestionCard
              question={question.question}
              options={question.options}
              answer={question.answer}
              onSelect={selectAnswer}
              selectedAnswer={selectedAnswer}  // ✅ FIXED: `selectedAnswer` pass ho raha hai
            />
          )}
          {currentQuestion < questions.length - 1 && (
            <button
              className="mt-4 px-6 py-2 bg-yellow-500 rounded-lg text-black font-bold"
              onClick={nextQuestion}
              disabled={!question}
            >
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}
