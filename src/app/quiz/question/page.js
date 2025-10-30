"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { message, Input, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchNextQA, fetchHint, fetchAnswer } from "../../redux/quizSlice";

export default function QuizQuestionPage() {
  const [quizId, setQuizId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const dispatch = useDispatch();
  const { qaPair } = useSelector((store) => store.quizzes);
  const [answer, setAnswer] = useState("");
  const [submittedResponse, setSubmittedResponse] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [hint, setHint] = useState(false);
  const [hintSentence, setHintSentence] = useState(null);

  const msg = {
    error: (errorMessage) =>
      messageApi.open({ type: "error", content: errorMessage, duration: 10 }),
    success: (successMessage) =>
      messageApi.open({
        type: "success",
        content: successMessage,
        duration: 5,
      }),
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuizId(params.get("quizId"));
    if (quizId) {
      dispatch(fetchNextQA(quizId));
      setSubmitted(false);
      setAnswer("");
      setSubmittedResponse(null);
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    if (qaPair?.question === null) {
      router.push(`/quiz/statistic?quizId=${quizId}`);
    }
  }, [qaPair, quizId, router]);

  const handleSubmit = async () => {
    if (!qaPair) {
      msg.error("No question available.");
      return;
    }

    const answerRequest = {
      quizId,
      qaPair: { ...qaPair, answer },
    };

    try {
      const answerResponse = await dispatch(
        fetchAnswer(answerRequest)
      ).unwrap();
      setSubmittedResponse(answerResponse);
      setSubmitted(true);
    } catch (error) {
      msg.error("Response issue!");
      setSubmitted(false);
    }

    setHint(false);
    setHintSentence(null);
  };

  const handleNextQuestion = () => {
    dispatch(fetchNextQA(quizId));
    setSubmitted(false);
    setAnswer("");
    setSubmittedResponse(null);
  };

  const handleHint = async () => {
    try {
      const response = await dispatch(
        fetchHint(qaPair.id)
      ).unwrap();
      setHintSentence(response?.sentence);
      setHint(true);
    } catch (error) {
      msg.error("Response issue!");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quiz #{quizId}</h2>

          {qaPair ? (
            <>
              <p className="mb-3">
                <strong>Question {qaPair.no}:</strong> {qaPair.question}
              </p>

              <Input
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onPressEnter={handleSubmit}
                disabled={submitted}
                className="mb-3"
              />

              {hint && (
                <p className="mb-3">
                  <strong>Hint:</strong> {hintSentence}
                </p>
              )}

              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full"
                disabled={submitted || !answer}
              >
                Submit Answer
              </Button>

              <Button
                type="primary"
                onClick= {handleHint}
                className="w-full"
                disabled={hint || answer}
              >
                Get a Hint
              </Button>

              {submitted && (
                <Button
                  type="default"
                  onClick={handleNextQuestion}
                  className="w-full mt-3"
                >
                  Next Question
                </Button>
              )}
            </>
          ) : (
            <p>Loading question...</p>
          )}
        </Card>

        {submittedResponse && (
          <Card className="mt-6 shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Submitted Response</h3>
            <div className="mb-2">
              <strong>Question {submittedResponse?.no}:</strong>{" "}
              {submittedResponse?.question}
            </div>
            <div className="mb-2">
              <strong>Your Answer:</strong>{" "}
              {submittedResponse?.answer || <em>Not answered</em>}
            </div>
            <div className="mb-2">
              <strong>Correct Answer:</strong>{" "}
              {submittedResponse?.correctAnswer || (
                <em>Not correct answered</em>
              )}
            </div>
            <div className="mb-2">
              <strong>Synonym:</strong> {submittedResponse?.synonym}
            </div>
            <div className="mb-2">
              <strong>English to English:</strong>{" "}
              {submittedResponse?.english2English}
            </div>
            <div className="mb-2">
              <strong>Sample Sentence:</strong> {submittedResponse?.sentence}
            </div>
            <div>
              <strong>Result:</strong>{" "}
              {submittedResponse?.correct ? (
                <span className="text-green-600 font-semibold">Correct ✅</span>
              ) : (
                <span className="text-red-600 font-semibold">Incorrect ❌</span>
              )}
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
