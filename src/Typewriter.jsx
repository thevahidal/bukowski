import { useState, useEffect } from 'react';
import './App.css';

let frameInterval = null;
let timerInterval = null;
function Typewriter({ frames }) {
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
          setAnimatedText('');
          setTimer(0);

          return 0;
        }

        return prevFrame + 1;
      });
    }, 10);
  };

  const stopAnimation = () => {
    clearInterval(frameInterval);
  };

  const startTimer = () => {
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 10);
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
    console.log({
      frames,
    });

    setFrame(-1);
    setAnimatedText('');

    startAnimation();
    startTimer();

    return () => {
      stopAnimation();
      stopTimer();
    };
  }, [frames]);

  return (
    <div
      style={{
        textAlign: 'left',
      }}
    > 
      {timer !== 0 && <div
        style={{
          fontSize: '0.6rem',
          marginBottom: 0,
        }}
      >{Math.round(timer / 10)}ms</div>}
      <pre
        style={{
          marginTop: '0.2rem',
          whiteSpace: 'break-spaces',
          textAlign: 'left',
          fontSize: '0.8rem',
        }}
      >
        {animatedText}
      </pre>
    </div>
  );
}

export default Typewriter;

Typewriter.defaultProps = {
  frames: {},
};
