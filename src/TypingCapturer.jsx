import { useState, useEffect, useRef } from 'react';
import * as Panelbear from "@panelbear/panelbear-js";

let timerInterval;
const TypingCapturer = ({ onRecordingEnded }) => {
  const [frames, setFrames] = useState({});
  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState('');
  const [capturingId, setCapturingId] = useState(null);

  const textareaRef = useRef();

  const startTimer = () => {
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const startRecording = () => {
    startTimer();
    setRecording(true);
    const newCapturingId = Math.random().toString(36).substring(7);
    setCapturingId(newCapturingId);
    Panelbear.track("recording_started", {
        id: newCapturingId,
    });
  };

  const stopRecording = () => {
    stopTimer();
    if (onRecordingEnded) {
      onRecordingEnded({ ...frames, [timer]: '*PAUSE*' });
    }
    setRecording(false);
    setFrames({});
    setTimer(0);
    setText('');
    Panelbear.track("recording_stopped", {
        id: capturingId,
        frames: Object.keys(frames).length,
        length: timer,
    });
  };

  const handleKeyDown = (e) => {
    const { key } = e;

    if (key === 'Enter') {
      setFrames((prevFrames) => ({ ...prevFrames, [timer]: '*NEWLINE*' }));
    } else if (key === 'Backspace') {
      setFrames((prevFrames) => ({ ...prevFrames, [timer]: '*DELETE*' }));
    } else if (key.length === 1) {
      setFrames((prevFrames) => ({ ...prevFrames, [timer]: key }));
    } else {
      // do nothing
    }
  };

  const handleTextareaClick = () => {
    if (textareaRef.current.disabled) {
      alert('Click the "Start" button to start recording.');
    }
  };

  useEffect(() => {
    textareaRef.current.focus();
  }, [recording]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <textarea
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyDown}
        disabled={!recording}
        ref={textareaRef}
        placeholder={
          !recording
            ? 'Click the "Start" button to start recording.'
            : 'Now start typing here...'
        }
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='textarea'
        style={{}}
        onClick={handleTextareaClick}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.5rem',
        }}
      >
        <div>
          {!recording ? (
            <button className='button success' onClick={startRecording}>
              Start Capturing
            </button>
          ) : (
            <button className='button' onClick={stopRecording}>
              Finish Capturing
            </button>
          )}
        </div>
        {timer !== 0 && (
          <div
            style={{
              fontSize: '0.6rem',
              color: '#555',
            }}
          >
            {Math.round(timer / 10)}ms
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingCapturer;

TypingCapturer.defaultProps = {
  onRecordingEnded: (frames) => {
    console.log(frames);
  },
};
