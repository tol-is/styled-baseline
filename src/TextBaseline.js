import { h } from 'preact';
import { css } from 'emotion';

// TODO
const preventCollapse = 0.02;

export default ({
  children,
  font,
  fontSize,
  baseline = 8,
  leading = 0,
  flow = 0,
}) => {
  const {
    familyName,
    capHeight,
    ascent,
    descent,
    unitsPerEm: upm,
    lineGap,
  } = font;

  // ratios
  const descentAbs = Math.abs(descent);
  const capHeightRatio = capHeight / upm;
  const ascentRatio = (ascent - capHeight) / upm;
  const descentRatio = descentAbs / upm;

  // content area
  const emSquare = ascent + descentAbs + lineGap;
  const boundingBoxHeight = (emSquare / upm) * fontSize;

  // type
  const capSize = capHeightRatio * fontSize;
  const typeRows = Math.ceil(capSize / baseline);
  const typeHeight = typeRows * baseline;

  // leading
  const leadingRound = Math.round(leading);
  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typeRows) * -1
      : leadingRound;

  // line height
  const lineHeight = typeHeight + leadingValue * baseline;

  // leading trim
  const lineGapHeight = (lineGap / upm) * fontSize;
  const lineHeightOffset = (boundingBoxHeight - lineHeight - lineGapHeight) / 2;
  const trimTop = ascentRatio * fontSize - lineHeightOffset;
  const trimBottom = descentRatio * fontSize - lineHeightOffset;

  // align to baseline
  const paddingTop = preventCollapse + ((trimBottom + trimTop) % baseline);

  return (
    <span
      data-gramm_editor="false"
      contentEditable
      className={css`
        display: inline-block;
   
        font-family: '${familyName}';
        font-weight: ${font['OS/2'].usWeightClass};
        font-size: ${fontSize}px;
        line-height: ${lineHeight}px;
        padding-top: ${paddingTop}px;
        padding-bottom: ${preventCollapse}px;
        margin-bottom: ${flow * baseline}px;
        &:before{
          content: '';
          display:block;
          margin-top:${trimTop * -1 - preventCollapse}px;
          height: 0;   
        }
        &:after{
          content: '';
          display:block;
          margin-bottom:${trimBottom * -1 - preventCollapse}px;
          height: 0;   
        }
        &:focus{
          background-color: rgba(0,0,0,0.05);
          outline:none;
        }
        `}
    >
      {children}
    </span>
  );
};
