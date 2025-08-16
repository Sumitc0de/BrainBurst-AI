import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer(initialMinutes, onTimeUp) {
  // Get initial time from localStorage or default
  const getInitialTime = () => {
    const saved = localStorage.getItem("quizTimeLeft");
    const parsed = Number(saved);
    return !isNaN(parsed) && parsed > 0
      ? parsed
      : initialMinutes * 60;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Save timeLeft to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quizTimeLeft", timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onTimeUpRef.current && onTimeUpRef.current();
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  // Optional: stop function for manual control
  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { timeLeft, stop };
}