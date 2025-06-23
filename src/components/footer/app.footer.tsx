"use client";
import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container, Hidden } from "@mui/material";
import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef?.current && currentTrack?.isPlaying === true) {
      // @ts-ignore
      playerRef?.current?.audio?.current?.play();
    } 
    if (playerRef?.current && currentTrack?.isPlaying === false) {
      // @ts-ignore
      playerRef?.current?.audio?.current?.pause();
    }
  }, [currentTrack])

  if (!hasMounted) return <></>;

  return (
    <>
      { !!currentTrack?.id && (
          <div style={{ marginTop: 50 }}>
            <AppBar
              position="fixed"
              color="primary"
              sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
            >
              <Container
                sx={{ display: "flex", gap: 10, ".rhap_main": { gap: "30px" } }}
              >
                <AudioPlayer
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${currentTrack.trackUrl}`}
                  onPlay={(e) => setCurrentTrack({...currentTrack, isPlaying: true})}
                  onPause={(e) => setCurrentTrack({...currentTrack, isPlaying: false})}
                  volume={0.5}
                  style={{ boxShadow: "unset", background: "#f2f2f2" }}
                  layout="horizontal-reverse"
                  ref={playerRef}
                  autoPlay={false}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    width: '250px',
                  }}
                >
                  <div style={{ color: "#ccc", width: '100%', overflow: 'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}>{currentTrack.description}</div>
                  <div style={{ color: "#000",width: '100%', overflow: 'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}>{currentTrack.title}</div>
                </div>
              </Container>
            </AppBar>
        </div>
        )
      }
    </>
   
  );
};

export default AppFooter;
