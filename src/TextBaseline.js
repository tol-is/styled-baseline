import { h } from "preact";
import { css } from "emotion";

export default ({
  children,
  font,
  fontSize,
  baseline = 8,
  leading = null,
  flow = 0,
  snap = true,
  dark = true,
  debug = false,
}) => {
  const descentAbsolute = Math.abs(font.descent);
  const descentRatio = descentAbsolute / font.unitsPerEm;
  const capHeightRatio = font.capHeight / font.unitsPerEm;
  const ascentRatio = font.ascent / font.unitsPerEm;
  const lineGapRatio = font.lineGap / font.unitsPerEm;

  const contentAreaUnits = font.ascent + font.lineGap + descentAbsolute;
  const contentAreaRatio = contentAreaUnits / font.unitsPerEm;

  const capHeight = fontSize * capHeightRatio;
  const ascentHeight = ascentRatio * fontSize;
  const descentHeight = descentRatio * fontSize;
  const lineGapHeight = lineGapRatio * fontSize;
  const lineGapHeightHalf = lineGapHeight / 2;
  const contentAreaHeight = Math.round(contentAreaRatio * fontSize);

  const typeRowHeight = capHeight + leading * baseline;
  const typeRowHeightBaseline = Math.ceil(typeRowHeight / baseline) * baseline;
  const lineHeight = snap ? typeRowHeightBaseline : Math.round(typeRowHeight);

  const lineHeightOffset = contentAreaHeight - lineHeight;
  const lineHeightOffsetHalf = lineHeightOffset / 2;

  const trimTop =
    Math.round(
      ascentHeight - capHeight + lineGapHeightHalf - lineHeightOffsetHalf
    ) * -1;

  const trimBottom =
    Math.round(descentHeight + lineGapHeightHalf - lineHeightOffsetHalf) * -1;

  const typeHeight = lineHeight + trimTop + trimBottom;
  const typeHeightBaseline = Math.ceil(typeHeight / baseline) * baseline;

  const spaceTop = snap ? typeHeightBaseline - typeHeight : 0;
  const fontSizeValue = fontSize;
  const lineHeightValue = lineHeight;
  const trimTopValue = trimTop + spaceTop;
  const trimBottomValue = trimBottom;

  return (
    <span
      data-gramm_editor="false"
      contentEditable
      className={css`
        display: block;
        font-family: "${font.familyName}";
        font-weight: ${font["OS/2"].usWeightClass};
        font-size: ${fontSizeValue}px;
        line-height: ${lineHeightValue}px;
        margin-bottom: ${flow * baseline}px;
        background-color: ${!debug
          ? "transparent"
          : dark
          ? "rgba(255, 0, 107,0.3)"
          : "rgba(255, 0, 107,0.1)"};
        &::before {
          content: "";
          margin-bottom: ${trimTopValue}px;
          display: table;
        }
        &::after {
          content: "";
          margin-top: ${trimBottomValue}px;
          display: table;
        }
        &:focus {
          outline: none;
        }
      `}
    >
      {children}
    </span>
  );
};
