import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';

import blobToBuffer from 'blob-to-buffer';

import FontContext from './FontContext';
import AppContext from './AppContext';


import FiraCode from './fonts/FiraCode-Regular.otf';
import Averta from './fonts/Averta-Bold.otf';
import Cera from './fonts/Cera-Regular.ttf';
import AvertaPE from './fonts/AvertaPE-Regular.otf';
import Inter from './fonts/Inter.otf';

const defaultFontUrl = Cera;

export default () => {
  //
  const { setFont } = useContext(FontContext);
  const { baseline, setBaseline } = useContext(AppContext);
  //
  useEffect(() => {
    loadURL(defaultFontUrl);
  }, [defaultFontUrl]);

  const onChange = e => {
    let file = e.target.files && e.target.files[0];
    if (file) {
      loadBlob(file);
    }
  };

  const loadURL = url => {
    fetch(url)
      .then(res => res.blob())
      .then(loadBlob, console.error);
  };

  const loadBlob = blob => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }

      var reader = new FileReader();
      reader.onload = function(e) {
        const font = fontkit.create(buffer);
        useFont({ fontData: reader.result, font });
      };
      reader.readAsDataURL(blob);
    });
  };

  const useFont = ({ fontData, font }) => {
    if (!font) return;
    setFont(font);

    injectGlobal`
      @font-face {
        font-family: '${font.familyName}';
        font-style: normal;
        font-weight: ${font['OS/2'].usWeightClass};
        src: url('${fontData}')
            format('opentype');
      }
    `;
  };

  return (
    <div
      className={css`
        font-family: system-ui;
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;
        background-color: #181818;
        color: #f8f8f8;
        font-size: 16px;
        display: flex;
        width: 100%;
        height: 30px;
        & > * {
          flex: 1;
          text-align-center;
        }
      `}
    >
      <input type="file" onChange={onChange} />
      <div>
        <input type="number" value={baseline} min={2} max={20} step={1} onChange={(e) => setBaseline(e.target.value)} />
      </div>
      
      <button onClick={() => loadURL(Inter)}>InterV</button>
      <button onClick={() => loadURL(FiraCode)}>FiraCode</button>
      <button onClick={() => loadURL(Cera)}>Cera</button>
      <button onClick={() => loadURL(Averta)}>Averta Bold</button>
      <button onClick={() => loadURL(AvertaPE)}>AvertaPE Reg</button>
    </div>
  );
};
