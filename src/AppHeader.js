import { Component, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { css, injectGlobal } from "emotion";
import fontkit from "fontkit";

import blobToBuffer from "blob-to-buffer";

import FontContext from "./FontContext";
import AppContext from "./AppContext";
import ratios from "./ratios";

import Inter from "./fonts/AvertaPE-Regular.otf";

const defaultFontUrl = Inter;

const selectClass = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 30px;
  text-align: left;
  color: #2b2b2b;
  width: 100%;
  padding: 0 8px 0 8px;
  background-color: white;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const inputClass = css`
  height: 30px;
  text-align: left;
  color: #2b2b2b;
  width: 100%;
  padding: 0 8px 0 8px;
  background-color: white;
  &.selected {
    background-color: #2b2b2b;
    color: white;
  }
`;

const gridBtn = css`
  display: block;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  color: #2b2b2b;
  padding: 0 0 0 8px;
  background-color: white;
  &:disabled {
    color: #ccc;
  }
`;

export default () => {
  //
  const { font, setFont } = useContext(FontContext);
  const {
    dark,
    setDark,
    baseline,
    setBaseline,
    size,
    setSize,
    snap,
    setSnap,
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
        font-weight: ${font["OS/2"].usWeightClass};
        src: url('${fontData}')
            format('opentype');
      }
    `;
  };

  return (
    <header
      className={css`
        font-family: system-ui;
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;
        background-color: white;
        width: 100%;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(12, minmax(auto, 1fr));
          & > * {
            text-align: left;
            font-size: 9px;
            padding: 3px 0 0 8px;
          }
        `}
      >
        <div>DARK</div>
        <div>FONT</div>
        <div>BASELINE</div>
        <div>LEADING</div>
        <div>ROOT SIZE</div>
        <div>SCALE</div>
        <div>LENGTH</div>
        <div>V-RHYTHM</div>
        <div>ALIGN TO GRID</div>
        <div>RULERS</div>
        <div>BOUNDING BOX</div>
        <div></div>
      </div>
      <div
        className={css`
          height: 30px;
          display: grid;
          grid-template-columns: repeat(12, minmax(auto, 1fr));
        `}
      >
        <button className={gridBtn} onClick={() => setDark(!dark)}>
          D
        </button>
        <div
          className={css`
            overflow: hidden;
            position: relative;
            width: 100%;
            display: flex;
            padding: 0 0 0 8px;
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
          {font ? font.familyName : "F"}
        </div>

        <div
          className={css`
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
            overflow: hidden;
          `}
        >
          <input
            className={inputClass}
            type="number"
            value={lead}
            min={-12}
            max={12}
            step={!snap ? 0.1 : 1}
            onChange={(e) => setLead(e.target.value)}
          />
        </div>
        <div
          className={css`
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
            overflow: hidden;
            position: relative;
          `}
        >
          <select
            className={selectClass}
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
          >
            {Object.keys(ratios).map((k) => (
              <option value={ratios[k]}>{k}</option>
            ))}
          </select>
          <div className={gridBtn}>{ratio}</div>
        </div>
        <div
          className={css`
            overflow: hidden;
          `}
        >
          <input
            className={inputClass}
            type="number"
            value={length}
            min={1}
            max={20}
            step={1}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>
        <div
          className={css`
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
        <button
          className={gridBtn}
          onClick={() => {
            setSnap(!snap);
          }}
        >
          A
        </button>
        <button className={gridBtn} onClick={() => setGrid(!grid)}>
          R
        </button>
        <button className={gridBtn} onClick={() => setDebug(!debug)}>
          B
        </button>
        <a
          className={gridBtn}
          onClick={() => setDark(!dark)}
          href="https://github.com/a7sc11u/styled-baseline"
          target="_blank"
        >
          GH
        </a>
      </div>
    </header>
  );
};
