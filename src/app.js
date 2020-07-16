import { Component, h, render } from 'preact';
import { useState } from 'preact/hooks';

import FontContext from './FontContext';
import AppContext from './AppContext';
import FontLoader from './FontLoader';
import Main from './Main';

const App = () => {
  const [font, setFont] = useState();
  const [baseline, setBaseline] = useState(12);
  const [size, setSize] = useState(16);
  const [lead, setLead] = useState(1);
  const [scale, setScale] = useState(1.25);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      <AppContext.Provider
        value={{
          baseline,
          setBaseline,
          size,
          setSize,
          lead,
          setLead,
          scale,
          setScale,
        }}
      >
        <FontLoader />
        {font && <Main />}
      </AppContext.Provider>
    </FontContext.Provider>
  );
};

render(<App />, document.body);
