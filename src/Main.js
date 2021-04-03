import { h } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { css } from "emotion";

import FontContext from "./FontContext";
import AppContext from "./AppContext";
import TextBaseline from "./TextBaseline";

import { modularScale, carbonScale } from "./scales";

export default () => {
  const { font } = useContext(FontContext);
  const {
    dark,
    baseline,
    size,
    snap,
    lead,
    flow,
    ratio,
    length,
    grid,
    debug,
  } = useContext(AppContext);

  if (!font) return null;

  const minHeight = Math.ceil(30 / baseline);

  let bg = css`
    background-color: ${dark ? `#060606` : `#FFFFFF`};
    color: ${dark ? `#FFFFFF` : `#060606`};
    min-height: 100vh;
    padding-top: ${baseline * 1 + baseline * flow + minHeight * baseline}px;
    padding-bottom: ${baseline * flow + minHeight * baseline}px;
    padding-left: 5vw;
    padding-right: 5vw;
    background-repeat: repeat;
    background-size: 100% ${baseline}px;
    ${grid &&
    `background-image: linear-gradient(
      rgba(255, 0, 107, ${dark ? 0.2 : 0.2}) 1px,
      transparent 0
    );`}
  `;

  const scale = useMemo(() => {
    return ratio === "IBM Carbon"
      ? carbonScale({ base: parseInt(size), length: length })
      : modularScale({ base: size, ratio });
  }, [size, length, ratio, baseline]);

  return (
    <section className={bg}>
      {Array.from(new Array(length)).map((v, i) => (
        <TextBaseline
          font={font}
          baseline={baseline}
          fontSize={scale(i)}
          leading={lead}
          flow={flow}
          snap={snap}
          dark={dark}
          debug={debug}
          precision={3}
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
