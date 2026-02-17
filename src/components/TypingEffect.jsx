import { useState, useEffect } from 'react';

const TypingEffect = ({ words, speed = 100, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
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
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return (
    <span className="relative">
      {currentText}
      <span className="ml-1 border-r-4 border-accent-blue animate-pulse" />
    </span>
  );
};

export default TypingEffect;
