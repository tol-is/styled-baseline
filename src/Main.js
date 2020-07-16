import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';

import FontContext from './FontContext';
import AppContext from './AppContext';
import TextBaseline from './TextBaseline';

import modularScale from './modular-scale';

export default () => {
  const { font } = useContext(FontContext);
  const { baseline, size, lead, flow, ratio, grid } = useContext(AppContext);

  if (!font) return null;

  let bg = css`
    background-color: #f8f8f8;
    color: #212121;
    min-height: 100vh;
    padding-top: ${baseline * 8}px;
    padding-bottom: ${baseline * 8}px;
    padding-left: 80px;
    padding-right: 80px;
    background-repeat: repeat;
    background-size: 100% ${baseline}px;
    ${grid &&
    `background-image: linear-gradient(
      rgba(0, 0, 0, 0.2) 1px,
      transparent 0
    );`}
  `;

  const scale = modularScale({ base: size, ratio, interval: 1 });

  return (
    <section className={bg}>
      {[0, 1, 2, 3, 4].map((v, i) => (
        <TextBaseline
          font={font}
          baseline={baseline}
          fontSize={scale(i)}
          leading={lead}
          flow={flow}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TextBaseline>
      ))}
    </section>
  );
};
