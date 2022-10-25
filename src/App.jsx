import { useState } from 'react';

import Typewriter from './Typewriter';
import TypingCapturer from './TypingCapturer';

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
      <h4
        style={{
          textAlign: 'left',
          marginTop: '0.5rem',
        }}
      >Bukowsi</h4>
      <TypingCapturer onRecordingEnded={setFrames} />
      <br />
      <Typewriter frames={frames} />
    </div>
  );
}

export default App;
