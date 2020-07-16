import { RATIOS } from './ratios';

export const modularScale = ({
  base = 16,
  ratio = RATIOS.PERFECT_FOURTH,
  interval = 2,
}) => {
  return (step) => {
    return Math.floor(base * Math.pow(ratio, step / interval));
  };
};

export default modularScale;
