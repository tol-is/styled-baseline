import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';

import blobToBuffer from 'blob-to-buffer';

import FontContext from './FontContext';

import FiraCode from './fonts/FiraCode-Regular.otf';
import FiraSans from './fonts/FiraSans-Book.otf';

const defaultFontUrl = FiraSans;

export default () => {
  //
  const { setFont } = useContext(FontContext);
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
        padding: 16px;
        font-size: 16px;
        display: flex;
        width: 100%;
        height: 80px;
        & > * {
          flex: 1;
          text-align-center;
        }
      `}
    >
      Choose Font : <input type="file" onChange={onChange} />
    </div>
  );
};
