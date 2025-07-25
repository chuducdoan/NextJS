"use client";
import { useTheme } from "@mui/material/styles";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import { useTrackContext } from "@/lib/track.wrapper";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";

interface IProps {
  data: ITrackProps;
}

const CardTrack = (props: IProps) => {
  const theme = useTheme<Theme>();
  const { data } = props;
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link href={`/track/${convertSlugUrl(data.title)}-${data.id}.html?audio=${data.trackUrl}`}>
          
          <Typography component="div" variant="h5">
            {data.title}
          </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? <SkipNext /> : <SkipPrevious />}
          </IconButton>
          <IconButton aria-label="play/pause">
            {(currentTrack.id === data.id &&
              currentTrack.isPlaying === false ||
              currentTrack.id !== data.id) && (
                <PlayArrow
                  sx={{ height: 38, width: 38 }}
                  onClick={() => setCurrentTrack({ ...data, isPlaying: true })}
                />
              )}

            {currentTrack.id === data.id && currentTrack.isPlaying === true && (
              <Pause
                sx={{ height: 38, width: 38 }}
                onClick={() => setCurrentTrack({ ...data, isPlaying: false })}
              />
            )}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? <SkipPrevious /> : <SkipNext />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.imgUrl}`}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default CardTrack;
