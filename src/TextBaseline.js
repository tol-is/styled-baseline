import { h } from "preact";
import { css } from "emotion";

const precision = 4;
const toPrecision = (input, precision) => {
  return input.toPrecision(precision);
};

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
  const toBaseline = (num) => Math.ceil(num / baseline) * baseline;

  const descentAbsolute = Math.abs(font.descent);
  const contentArea = font.ascent + font.lineGap + descentAbsolute;

  const contentAreaRatio = contentArea / font.unitsPerEm;
  const descentRatio = descentAbsolute / font.unitsPerEm;
  const ascentRatio = font.ascent / font.unitsPerEm;
  const lineGapRatio = font.lineGap / font.unitsPerEm;
  const lineGapRatioHalf = lineGapRatio / 2;
  const capHeightRatio = font.capHeight / font.unitsPerEm;
  const capHeight = fontSize * capHeightRatio;
  const rowHeight = snap ? toBaseline(capHeight) : capHeight;
  const rowHeightRatio = rowHeight / fontSize;

  const lineHeight = rowHeight + leading * baseline;
  const contentAreaHeight = contentAreaRatio * fontSize;
  const lineHeightOffset = contentAreaHeight - lineHeight;
  const lineHeightOffsetHalf = lineHeightOffset / 2;
  const lineHeightOffsetHalfRatio = lineHeightOffsetHalf / fontSize;

  const trimTop =
    (ascentRatio -
      rowHeightRatio +
      lineGapRatioHalf -
      lineHeightOffsetHalfRatio) *
    -1;

  const trimBottom =
    (descentRatio + lineGapRatioHalf - lineHeightOffsetHalfRatio) * -1;

  const lineHeightValue = toPrecision(lineHeight / fontSize, precision);
  const trimTopValue = toPrecision(trimTop, precision);
  const trimBottomValue = toPrecision(trimBottom, precision);

  return (
    <span
      data-gramm_editor="false"
      contentEditable
      className={css`
        display: block;
        font-family: "${font.familyName}";
        font-weight: ${font["OS/2"].usWeightClass};
        font-size: ${fontSize}px;
        line-height: ${lineHeightValue};
        margin-bottom: ${flow * baseline}px;
        padding-top: ${0}px;
        background-color: ${!debug
          ? "transparent"
          : dark
          ? "var(--debug-bg)"
          : "var(--debug-bg)"};
        &::before {
          content: "";
          margin-bottom: ${trimTopValue}em;
          display: table;
        }
        &::after {
          content: "";
          margin-top: ${trimBottomValue}em;
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
