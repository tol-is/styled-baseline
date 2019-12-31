import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
import TextBaseline from './TextBaseline';

let grid = css`
  background-color: #f8f8f8;
  color: #212121;
  padding: 16px;
  padding-top: 176px;
  padding-left: 80px;
  padding-right: 80px;
  min-height: 100vh;
  position: relative;
  background-repeat: repeat;
  background-size: 100% 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 8px,
    transparent 8px
  );
`;

export default () => {
  const { font } = useContext(FontContext);

  if (!font) return null;

  return (
    <section className={grid}>
      <TextBaseline fontSize={22} leading={2} flow={6}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </TextBaseline>
      <TextBaseline fontSize={22} leading={2} flow={2}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </TextBaseline>
    </section>
  );
};
