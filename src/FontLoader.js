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
`;

export default () => {
  //
  const { setFont } = useContext(FontContext);
  const {
    baseline,
    setBaseline,
    size,
    setSize,
    lead,
    setLead,
    scale,
    setScale,
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
      {/* <div
        className={css`
          flex: 0 0 10%;
          overflow: hidden;
          margin-right: 20px;
        `}
      >
        <input type="file" onChange={onChange} />
      </div> */}
      <div
        className={css`
          flex: 0 0 5%;
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
          flex: 0 0 5%;
          overflow: hidden;
        `}
      >
        <input
          className={inputClass}
          type="number"
          value={scale}
          min={1.1}
          max={2}
          step={0.1}
          onChange={(e) => setScale(e.target.value)}
        />
      </div>
      <div
        className={css`
          flex: 0 0 5%;
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
          flex: 0 0 5%;
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
    </div>
  );
};
