import { Component, h, render } from "preact";
import { useState } from "preact/hooks";

import FontContext from "./FontContext";
import AppContext from "./AppContext";
import AppHeader from "./AppHeader";
import Main from "./Main";

const App = () => {
  const [font, setFont] = useState();
  const [baseline, setBaseline] = useState(8);
  const [size, setSize] = useState(20);
  const [lead, setLead] = useState(2);
  const [flow, setFlow] = useState(6);
  const [ratio, setRatio] = useState("1.333333333");
  const [length, setLength] = useState(12);
  const [snap, setSnap] = useState(true);
  const [grid, setGrid] = useState(false);
  const [debug, setDebug] = useState(false);
  const [dark, setDark] = useState(true);

  const handleSnapChange = (snap) => {
    if (snap) {
      setLead(Math.round(lead));
    }

    setSnap(snap);
  };

  return (
    <FontContext.Provider value={{ font, setFont }}>
      <AppContext.Provider
        value={{
          baseline,
          setBaseline,
          size,
          setSize,
          snap,
          setSnap: handleSnapChange,
          lead,
          setLead,
          flow,
          setFlow,
          ratio,
          setRatio,
          length,
          setLength,
          grid,
          setGrid,
          debug,
          setDebug,
          dark,
          setDark,
        }}
      >
        <AppHeader />
        {font && <Main />}
      </AppContext.Provider>
    </FontContext.Provider>
  );
};

render(<App />, document.body);
