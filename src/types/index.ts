export type Cell = {
  x: number;
  y: number;
  isSelected: boolean;
  isMatched: boolean;
  value: number | (() => React.JSX.Element);
};

export type Player = {
  name: string;
  isActive: boolean;
  time: number;
  pairsMatched: number;
  movesTaken: number;
  isWinner: boolean;
};
