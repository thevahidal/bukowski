import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useEffect } from 'react';
import { useCallback } from 'react';

const frames = {
  0: 'D',
  3: 'o',
  6: 'n',
  9: '\'',
  12: 't',
  13: ' ',
  19: 't',
  21: 'r',
  24: 'y',
  41: '.',
  42: '.',
  50: '.',
  55: '*PAUSE*',
  63: '*DELETE*',
  65: '*DELETE*',
  67: '*DELETE*',
  74: '.',
  88: '*PAUSE*',
  91: '*NEWLINE*',
  96: 'B',
  99: '.',
  120: '*PAUSE*',
};

let frameInterval = null;
let timerInterval = null;
function App() {
  const [frame, setFrame] = useState(-1);
  const [timer, setTimer] = useState(0);
  const [animatedText, setAnimatedText] = useState('');

  const startAnimation = () => {
    frameInterval = setInterval(() => {
      setFrame((prevFrame) => {

        if (
          prevFrame ===
          parseInt(Object.keys(frames)[Object.keys(frames).length - 1])
        ) {
          // clearInterval(frameInterval);
          setAnimatedText("");

          return 0;
        }

        return prevFrame + 1;
      });
    }, 100);
  };

  const stopAnimation = () => {
    clearInterval(frameInterval);
  };

  const startTimer = () => {
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  useEffect(() => {
    if (frames[frame]) {
      if (frames[frame] === '*DELETE*') {
        setAnimatedText((prevText) => prevText.slice(0, -1));
      } else if (frames[frame] === '*NEWLINE*') {
        setAnimatedText((prevText) => prevText + '\n');
      } else if (frames[frame] === '*PAUSE*') {
        // do nothing
      } else { 
        setAnimatedText((prevText) => prevText + frames[frame]);
      }
    }
  }, [frame]);

  useEffect(() => {
    startAnimation();
    startTimer();

    return () => {
      stopAnimation();
      stopTimer();
    };
  }, []);

  return (
    <pre className='App'>
      {animatedText}
    </pre>
  );
}

export default App;
