import { useState, useEffect } from 'react';

const TypingEffect = ({ words, speed = 100, delay = 2000, loop = true }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      if (!loop && currentWordIndex === words.length - 1) return;
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length + 1));
        if (currentText === currentFullWord) {
          if (!loop && currentWordIndex === words.length - 1) return;
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay, loop]);

  return (
    <span className="relative whitespace-pre-wrap">
      {currentText}
      <span className="inline-block w-[4px] h-[0.9em] bg-accent-blue ml-1 align-middle animate-pulse" />
    </span>
  );
};

export default TypingEffect;
