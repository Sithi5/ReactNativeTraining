export type A = {
  method: (id: number) => void;
  str: string;
  rata: number;
  bloubli: number;
};

export type B = {
  method: (id: number) => void;
  str: string;
};

export type C = A | B;
