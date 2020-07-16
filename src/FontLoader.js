import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';

import blobToBuffer from 'blob-to-buffer';

import FontContext from './FontContext';
import AppContext from './AppContext';

import FiraCode from './fonts/FiraCode-Regular.otf';
import Cera from './fonts/Cera-Regular.ttf';
import AvertaPE from './fonts/AvertaPE-Regular.otf';
import Inter from './fonts/Inter.otf';

const defaultFontUrl = Inter;

const inputClass = css`
  height: 30px;
  width: 100%;
  text-align: center;
  color: #2b2b2b;
  background-color: white;
  &.selected {
    background-color: #2b2b2b;
    color: white;
  }
`;

const gridBtn = css`
  display: block;
  height: 30px;
  width: 60px;

  flex: 0 0 60px;
  text-align: center;
  color: #2b2b2b;
  background-color: white;
  &.selected {
    background-color: #2b2b2b;
    color: white;
  }
`;

export default () => {
  //
  const { setFont } = useContext(FontContext);
  const {
    dark,
    setDark,
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
  } = useContext(AppContext);
  //
  useEffect(() => {
    loadURL(defaultFontUrl);
  }, [defaultFontUrl]);

  const onChange = (e) => {
    let file = e.target.files && e.target.files[0];
    if (file) {
      loadBlob(file);
    }
  };

  const loadURL = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then(loadBlob, console.error);
  };

  const loadBlob = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
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
        background-color: white;
        display: flex;
        width: 100%;
        height: 30px;
      `}
    >
      <button className={gridBtn} onClick={() => setGrid(!grid)}>
        G
      </button>

      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={baseline}
          min={2}
          max={20}
          step={1}
          onChange={(e) => setBaseline(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={ratio}
          min={1.1}
          max={2}
          step={0.05}
          onChange={(e) => setRatio(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={size}
          min={12}
          max={400}
          step={1}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={lead}
          min={-5}
          max={5}
          step={1}
          onChange={(e) => setLead(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={flow}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setFlow(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 60px;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <input
          type="file"
          onChange={onChange}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          `}
        />
        F
      </div>
      <button className={inputClass} onClick={() => loadURL(Inter)}>
        InterV
      </button>
      <button className={inputClass} onClick={() => loadURL(FiraCode)}>
        FiraCode
      </button>
      <button className={inputClass} onClick={() => loadURL(Cera)}>
        Cera
      </button>
      <button className={inputClass} onClick={() => loadURL(AvertaPE)}>
        Averta
      </button>
      <button className={gridBtn} onClick={() => setDark(!dark)}>
        D
      </button>
    </div>
  );
};
