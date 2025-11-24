import { useEffect } from "react";
import { useAnimation } from "framer-motion";

interface IAnimationHook {
  setEndPresent?: (value: boolean) => void;
  startAnimate: { y: number; duration: number };
  endAnimate: { y: number; duration: number };
}

export function useAnimationHook({
  setEndPresent,
  startAnimate,
  endAnimate
}: IAnimationHook) {
  const controls = useAnimation();

  useEffect(() => {
    async function run() {
      await controls.start({
        y: startAnimate.y,
        transition: { duration: startAnimate.duration }
      });

      await controls.start({
        y: endAnimate.y,
        transition: { duration: endAnimate.duration }
      });

      if (setEndPresent) setEndPresent(true);
    }

    run();
  }, [controls, startAnimate, endAnimate, setEndPresent]);

  return { controls };
}
