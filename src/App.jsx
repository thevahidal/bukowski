import { useState } from 'react';
import * as Panelbear from "@panelbear/panelbear-js";

import Typewriter from './Typewriter';
import TypingCapturer from './TypingCapturer';
import VideoRenderer from './VideoRenderer';

Panelbear.trackPageview();

const demoFrames = {
  285: 'D',
  309: 'o',
  332: 'n',
  363: "'",
  374: 't',
  381: ' ',
  456: 't',
  463: 'r',
  482: 'y',
  568: '.',
  609: '.',
  641: '.',
  778: '*DELETE*',
  817: '*DELETE*',
  835: '*DELETE*',
  933: '.',
  1024: '*NEWLINE*',
  1221: 'B',
  1330: '.',
  1546: '*PAUSE*',
};

function App() {
  const [frames, setFrames] = useState(demoFrames);

  return (
    <div
      style={{
        maxWidth: 400,
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.8rem',
        }}
      >
        <h4
          style={{
            textAlign: 'left',
            margin: 0,
          }}
        >
          Bukowsi
        </h4>
        <div>
          <a
            href='https://github.com/thevahidal/bukowski'
            target='_blank'
            referrerPolicy='no-referrer'
            className='tab'
          >
            GitHub
          </a>
        </div>
      </div>
      <TypingCapturer onRecordingEnded={setFrames} />
      <br />
      <div
        className='options'
      >
        <VideoRenderer />
      </div>
      <Typewriter frames={frames} />
    </div>
  );
}

export default App;
