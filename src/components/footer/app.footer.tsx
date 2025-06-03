"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return <></>;

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
    >
      <Container sx={{ display: "flex", gap: 10 }}>
        <AudioPlayer
          autoPlay={true}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          onPlay={(e) => console.log("onPlay")}
          volume={0.5}
          style={{ boxShadow: "unset", background: "#f2f2f2" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            minWidth: 100,
          }}
        >
          <div style={{ color: "#ccc" }}>Eric</div>
          <div style={{ color: "#000" }}>Who am I ?</div>
        </div>
      </Container>
    </AppBar>
  );
};

export default AppFooter;
