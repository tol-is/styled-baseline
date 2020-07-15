import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';

import FontContext from './FontContext';
import AppContext from './AppContext';
import TextBaseline from './TextBaseline';

export default () => {
  const { font } = useContext(FontContext);
  const { baseline } = useContext(AppContext);

  if (!font) return null;

  let grid = css`
    background-color: #f8f8f8;
    color: #212121;
    min-height: 100vh;
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
      <TextBaseline
        font={font}
        baseline={baseline}
        fontSize={400}
        leading={0}
        flow={6}
      >
        XO
      </TextBaseline>
      <TextBaseline
        font={font}
        baseline={baseline}
        fontSize={42}
        leading={1}
        flow={6}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </TextBaseline>
    </section>
  );
};
