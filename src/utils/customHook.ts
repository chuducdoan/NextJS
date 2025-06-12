import { useEffect, useState } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const useWavesufer = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: Omit<WaveSurferOptions, "container">
) => {
  const [wavesufer, setWavesufer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    setWavesufer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesufer;
};
