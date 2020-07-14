import { Component, h, render } from 'preact';
import { useState } from 'preact/hooks';

import FontContext from './FontContext';
import AppContext from './AppContext';
import FontLoader from './FontLoader';
import Main from './Main';

const App = () => {
  const [font, setFont] = useState();
  const [baseline, setBaseline] = useState(8);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      <AppContext.Provider value={{ baseline, setBaseline }}>
        <FontLoader />
        {font && <Main />}
      </AppContext.Provider>
    </FontContext.Provider>
  );
};

render(<App />, document.body);
