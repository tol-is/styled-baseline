import { createContext } from 'preact';

export default createContext({
  baseline: 8,
  setBaseline: () => null,
  size: 8,
  setSize: () => null,
  lead: 1,
  setLead: () => null,
});
