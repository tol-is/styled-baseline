import { h } from 'preact';
import { css } from 'emotion';

// TODO
const preventCollapse = 1;

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

  // 1.0311404413

  // trying to compute a padding top value
  // to realign the type to the baseline grid
  // essentially bring the line-height back to the computed
  // typeHeight + leadingValue * baseline at line 39.
  // eg XO with InterV should be 300px, but it's 290.94px
  const actualHeight = lineHeight - trimTop - trimBottom;
  const paddingTop = lineHeight - actualHeight;

  return (
    <div
      className={css`
        margin-bottom: ${flow * baseline}px;
      `}
    >
      <span
        className={css`
        display: inline-block;
        vertical-align: bottom;
        position: relative;
        font-family: '${familyName}';
        font-weight: ${font['OS/2'].usWeightClass};
        font-size: ${fontSize}px;
        line-height: ${lineHeight}px;
        padding-top: ${paddingTop}px;
        background-color: rgba(0,0,0,0.1);
        &:before{
          content: '';
          display:block;
          margin-top:${trimTop * -1}px;
          height: 0;   
        }
        &:after{
          content: '';
          display:block;
          margin-bottom:${trimBottom * -1}px;
          height: 0;   
        }
        `}
      >
        {children}
      </span>
    </div>
  );
};
