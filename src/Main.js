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
          Ex sit eiusmod enim veniam exercitation tempor aliquip in aute
          cupidatat commodo. Magna deserunt eiusmod nostrud proident. Sit est
          duis cupidatat amet aliquip anim in esse et nulla velit ullamco.Mollit
          anim non anim amet incididunt velit ex irure. Reprehenderit quis anim
          do sint excepteur. Tempor cupidatat occaecat nisi ullamco culpa nisi
          commodo culpa tempor. Anim sunt elit consequat ullamco aute dolor
          proident dolor tempor magna velit. Quis adipisicing id incididunt qui
          adipisicing. Eiusmod consectetur mollit ad nisi.
        </TextBaseline>
      ))}
    </section>
  );
};

//
