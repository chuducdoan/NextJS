"use client";
import { useWavesufer } from "@/utils/customHook";
import { Pause, PlayArrow } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { Tooltip } from "@mui/material";

const formatTime = (seconds: any) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};

const arrComments = [
  {
    id: 1,
    avatar:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    moment: 10,
    user: "username 1",
    content: "just a comment1",
  },
  {
    id: 2,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s",
    moment: 30,
    user: "username 2",
    content: "just a comment3",
  },
  {
    id: 3,
    avatar:
      "https://img.freepik.com/free-photo/pretty-girl-holding-flowers-by-lake_23-2148224688.jpg?semt=ais_hybrid&w=740",
    moment: 50,
    user: "username 3",
    content: "just a comment3",
  },
];

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    let gradient, progressGradient;

    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      // Define the waveform gradient
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      url: "/audio/" + audio,
      barWidth: 3,
      height: 100,
    };
  }, []);

  const wavesufer = useWavesufer(containerRef, optionsMemo);

  const onPlayClick = useCallback(() => {
    if (wavesufer) {
      wavesufer.isPlaying() ? wavesufer.pause() : wavesufer.play();
    }
  }, [wavesufer]);

  useEffect(() => {
    if (!wavesufer) return;
    setIsPlaying(false);
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;

    waveform.addEventListener(
      "pointermove",

      (e) => (hover.style.width = `${e.offsetX}px`)
    );

    const subscriptions = [
      wavesufer.on("play", () => setIsPlaying(true)),
      wavesufer.on("pause", () => setIsPlaying(false)),
      wavesufer.on("decode", (duration) => {
        setDuration(formatTime(duration));
      }),
      wavesufer.on("timeupdate", (currentTime) => {
        setTime(formatTime(currentTime));
      }),
      wavesufer.on("interaction", (currentTime) => {
        wavesufer.play();
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesufer]);

  const calcLeft = (moment: number) => {
    const hardCodeDuration = 200;
    const percent = (moment / hardCodeDuration) * 100;
    return percent + "%";
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: 20,
          height: 400,
          background:
            "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11,15,20) 100%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            height: "calc(100% - 10px)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div className="info" style={{ display: "flex", gap: "24px" }}>
            <div>
              <div
                onClick={() => onPlayClick()}
                style={{
                  borderRadius: "50%",
                  background: "#f50",
                  height: 50,
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? (
                  <Pause sx={{ fontSize: 30, color: "#fff" }} />
                ) : (
                  <PlayArrow sx={{ fontSize: 30, color: "#fff" }} />
                )}
              </div>
            </div>

            <div>
              <h1 style={{ margin: 0, color: "#fff" }}>Hoi Dan IT song</h1>
              <h3 style={{ marginTop: 16, color: "#fff" }}>Doancd</h3>
            </div>
          </div>
          <div ref={containerRef} className="wave-form-container">
            <div className="time">{time}</div>
            <div className="duration">{duration}</div>
            <div className="hover-wave" ref={hoverRef}></div>
            <div
              className="overlay"
              style={{
                height: 30,
                position: "absolute",
                width: "100%",
                bottom: 0,
                backdropFilter: "brightness(0.5)",
              }}
            ></div>

            <div className="comments" style={{ position: "relative" }}>
              {arrComments.map((item) => (
                <Tooltip title={item.content} arrow>
                  <img
                    src={item.avatar}
                    alt=""
                    style={{
                      height: 20,
                      width: 20,
                      position: "absolute",
                      top: 71,
                      zIndex: 20,
                      left: calcLeft(item.moment),
                    }}
                    key={item.id}
                    onPointerMove={(e) => {
                      const hover = hoverRef.current!;
                      hover.style.width = calcLeft(item.moment + 3);
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            background: "gray",
            height: 250,
            flexGrow: 1,
          }}
        ></div>
      </div>
    </div>
  );
};

export default WaveTrack;
