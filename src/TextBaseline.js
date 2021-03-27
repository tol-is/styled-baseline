import { h } from "preact";
import { css } from "emotion";

const PRECISION = 4;

function roundTo(number, precision) {
  if (typeof number !== "number") {
    throw new TypeError("Expected value to be a number");
  }

  if (precision === Infinity) {
    return number;
  }

  if (!Number.isInteger(precision)) {
    throw new TypeError("Expected precision to be an integer");
  }

  const isNegative = number < 0;
  const inputNumber = isNegative ? Math.abs(number) : number;

  const power = 10 ** precision;
  const result =
    Math.round(Number((inputNumber * power).toPrecision(15))) / power;

  return isNegative ? -result : result;
}

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
  // console.log(font);
  const absoluteDescent = Math.abs(font.descent);

  const capHeightRatio = font.capHeight / font.unitsPerEm;
  const descentRatio = absoluteDescent / font.unitsPerEm;
  const ascentRatio = font.ascent / font.unitsPerEm;
  const lineGapRatio = font.lineGap / font.unitsPerEm;

  const contentAreaMetric = font.ascent + font.lineGap + absoluteDescent;
  const contentAreaRatio = contentAreaMetric / font.unitsPerEm;

  const capHeight = fontSize * capHeightRatio;
  const ascentHeight = ascentRatio * fontSize;
  const descentHeight = descentRatio * fontSize;
  const lineGapHeight = lineGapRatio * fontSize;
  const lineGapHeightHalf = lineGapHeight / 2;
  const contentAreaHeight = Math.round(contentAreaRatio * fontSize);

  const typeRowHeight = capHeight + leading * baseline;
  const typeRowHeightBaseline = Math.ceil(typeRowHeight / baseline) * baseline;
  const lineHeight = snap ? typeRowHeightBaseline : typeRowHeight;

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

  const spaceTop = typeHeightBaseline - typeHeight;

  const fontSizeValue = fontSize;
  const lineHeightValue = lineHeight;
  const trimTopValue = trimTop;
  const trimBottomValue = trimBottom;
  const spaceTopValue = snap ? spaceTop : 0;

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
        padding-top: ${spaceTopValue}px;
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
      `}
    >
      {children}
    </span>
  );
};

// &::before {
//   content: "";
//   margin-bottom: ${roundTo(
//     leadingTrim(ascentRatio - capHeightRatio + lineGapRatio / 2) * -1,
//     PRECISION
//   )}em;
//   display: table;
// }
// &::after {
//   content: "";
//   margin-top: ${roundTo(
//     leadingTrim(descentRatio + lineGapRatio / 2) * -1,
//     PRECISION
//   )}em;
//   display: table;
// }
