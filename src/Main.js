import { h } from "preact";
import { useContext } from "preact/hooks";
import { css } from "emotion";

import FontContext from "./FontContext";
import AppContext from "./AppContext";
import TextBaseline from "./TextBaseline";

import modularScale from "./modular-scale";

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

  const scale = modularScale({ base: size, ratio, interval: 1 });

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
        >
          Velit anim aliquip id do culpa commodo do. Quis qui eu nulla cillum
          Lorem deserunt aliqua laborum consectetur nisi sunt veniam aute
          laborum. Ex nostrud aliquip sint duis.
        </TextBaseline>
      ))}
    </section>
  );
};

//
