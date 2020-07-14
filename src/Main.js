import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
import AppContext from './AppContext';
import TextBaseline from './TextBaseline';
import Text from './Text';
const baseline = 8;



export default () => {
  const { font } = useContext(FontContext);
  const { baseline, setBaseline } = useContext(AppContext);

  if (!font) return null;

  let grid = css`
    background-color: #f8f8f8;
    color: #212121;
    min-height:100vh;
    padding-top: ${baseline * 8}px;
    padding-left: 80px;
    padding-right: 80px;
      background-repeat: repeat;
      background-size: 100% ${baseline}px;
      background-image: linear-gradient(
        rgba(255, 107, 107, 0.6) 1px,
        transparent 0
      );
  `;

  return (
    <section className={grid}>
      <TextBaseline font={font} baseline={baseline} fontSize={200} leading={0} flow={6}>
        XOTUS
      </TextBaseline>
      <TextBaseline font={font} baseline={baseline} fontSize={42} leading={2} flow={6}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </TextBaseline>
      <Text font={font} fontSize={100} flow={6}>
        XOTUS
      </Text>
      <ul>
        <li>upm: {font.unitsPerEm}</li>
        <li>ascent: {font.ascent}</li>
        <li>descent: {font.descent}</li>
        <li>capheight: {font.capHeight}</li>
        <li>linegap: {font.lineGap}</li>
      </ul>
    </section>
  );
};
