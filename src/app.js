import { Component, h, render } from 'preact';
import { useState } from 'preact/hooks';

import FontContext from './FontContext';
import AppContext from './AppContext';
import FontLoader from './FontLoader';
import Main from './Main';

const App = () => {
  const [font, setFont] = useState();
  const [baseline, setBaseline] = useState(8);
  const [size, setSize] = useState(16);
  const [lead, setLead] = useState(2);
  const [flow, setFlow] = useState(6);
  const [ratio, setRatio] = useState(1.25);
  const [grid, setGrid] = useState(false);
  const [dark, setDark] = useState(true);

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
          flow,
          setFlow,
          ratio,
          setRatio,
          grid,
          setGrid,
          dark,
          setDark,
        }}
      >
        <FontLoader />
        {font && <Main />}
      </AppContext.Provider>
    </FontContext.Provider>
  );
};

render(<App />, document.body);
