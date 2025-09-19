"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchById } from "../../../redux/quizSlice";

export default function QuizResultPage() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const { quiz } = useSelector((store) => store.quizzes);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchById(quizId));
    }
  }, [dispatch, quizId]);

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="mt-6 shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Statistic</h3>
          <div className="mb-2">
            <strong>Quiz ID:</strong> {quiz?.id}
          </div>
          <div className="mb-2">
            <strong>Quiz Name:</strong> {quiz?.quizName}
          </div>
          <div className="mb-2">
            <strong>Question Count:</strong> {quiz?.answeredQuestionCount} {" / "} {quiz?.questionCount}
          </div>
          <div className="mb-2">
            <strong>Correct Answer Count:</strong> {quiz?.correctAnswerCount}
          </div>
          <div className="mb-2">
            <strong>Succession Ratio:</strong> {" %"} {quiz?.successionRatio}
          </div>
        </Card>
      </div>
    </>
  );
}
