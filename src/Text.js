import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';


const preventCollapse = 1;

export default ({ 
  children, 
  font, 
  fontSize, 
  baseline=8, 
  leading=0, 
  flow=0 
}) => {

  const { familyName, capHeight, ascent, descent, unitsPerEm:upm } = font

  // // cap height
  const capHeightRatio = capHeight / upm;
  const ascenderRatio = ascent / upm;
  const descenderRatio = descent / upm;
  const preventCollapseRatio = 1 / fontSize;

  // type
  const capSize = capHeightRatio * fontSize;
  const typeRows = Math.ceil(capSize / baseline);
  const typeHeight = typeRows * baseline;
  const typeHeightRatio = typeHeight / fontSize;

  // leading
  const leadingRound = Math.round(leading);

  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typeRows) * -1
      : leadingRound;

  const leadingHeight = leadingValue * baseline;
  const lineHeight = typeHeight + leadingHeight;
  const lineHeightRatio = lineHeight / fontSize;
  const whiteSpaceHalf = (1 - lineHeightRatio) / 2;

  // leading trim
  const trimBottom =
    Math.abs(descenderRatio) - whiteSpaceHalf + preventCollapseRatio;

  const trimTop =
    ascenderRatio - typeHeightRatio - whiteSpaceHalf + preventCollapseRatio;

  return (
    <span
      className={css`
        display: block;
        position: relative;
        font-family: '${familyName}';
        font-weight: ${font['OS/2'].usWeightClass};
        font-size: ${fontSize}px;
        line-height: 1;
        margin-bottom: ${flow*baseline}px;  
        background-color: rgba(0,0,0,0.1);
      `}
    >
      {children}
    </span>
  );
};
