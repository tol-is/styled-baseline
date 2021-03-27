import { h } from "preact";
import { css } from "emotion";

const preventCollapse = 0.1;

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
  // ratios
  const descentAbs = Math.abs(font.descent);
  const capHeightRatio = font.capHeight / font.unitsPerEm;
  const ascentRatio = (font.ascent - font.capHeight) / font.unitsPerEm;
  const descentRatio = descentAbs / font.unitsPerEm;

  // bounding box
  const boundingBox = font.ascent + descentAbs + font.lineGap;
  const boundingBoxHeight = (boundingBox / font.unitsPerEm) * fontSize;

  // type height
  const capSize = capHeightRatio * fontSize;
  const typeRows = Math.round(capSize / baseline);
  const typeHeight = snap ? typeRows * baseline : capSize;

  // leading
  const leadingValue = snap ? Math.ceil(leading) : leading;
  const minLeading = snap ? typeRows : typeHeight;
  const typeLeading =
    leading < 0 ? Math.max(leadingValue, minLeading * -1) : leadingValue;

  // line height
  const typeLineGap = typeLeading * baseline;
  const typeLineHeight = typeHeight + typeLineGap;

  // leading trim
  const lineGapHeight = (font.lineGap / font.unitsPerEm) * fontSize;
  const lineHeightOffset =
    (boundingBoxHeight - typeLineHeight - lineGapHeight) / 2;

  const trimTop = ascentRatio * fontSize - lineHeightOffset;
  const trimBottom = descentRatio * fontSize - lineHeightOffset;

  // align to baseline
  const paddingTop = snap
    ? preventCollapse + ((trimBottom + trimTop) % baseline)
    : preventCollapse;

  const trimTopValue = `${trimTop * -1 - preventCollapse}px`;
  const trimBottomBalue = `${trimBottom * -1 - preventCollapse}px`;

  const fontSizeValue = `${fontSize}px;`;
  const lineHeightValue = `${typeLineHeight}px;`;
  const paddingTopValue = `${paddingTop}px`;
  const paddingBottomValue = `${preventCollapse}px`;

  // TODO useEmRem and unitless lh
  console.log(typeLineHeight);
  return (
    <span
      data-gramm_editor="false"
      contentEditable
      className={css`
        display: block;
        font-family: "${font.familyName}";
        font-weight: ${font["OS/2"].usWeightClass};
        font-size: ${fontSizeValue};
        line-height: ${lineHeightValue};
        // padding-top: ${paddingTopValue};
        padding-bottom: ${paddingBottomValue};
        margin-bottom: ${flow * baseline}px;
        background-color: ${!debug
          ? "transparent"
          : dark
          ? "rgba(255, 0, 107,0.3)"
          : "rgba(255, 0, 107,0.1)"};
        &::before,
        &::after {
          content: "";
          display: block;
          height: 0;
        }
        // &::before {
        //   margin-top: ${trimTopValue};
        // }
        &::after {
          margin-bottom: ${trimBottomBalue};
        }
        &:focus {
          outline: none;
        }
      `}
    >
      {children}
      {dark}
    </span>
  );
};
