declare module "canvas-confetti" {
  type ConfettiOptions = {
    particleCount?: number;
    spread?: number;
    origin?: { y: number };
    colors?: string[];
  };

  interface Confetti {
    (options?: ConfettiOptions): void;
  }
  const confetti: Confetti;

  export default confetti;
}
