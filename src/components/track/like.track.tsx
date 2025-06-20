"use client"
import { Favorite, PlayArrow } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IProps {
    track: ITrackProps | null;
}

const LikeTrack = (props: IProps) => {
    const {data: session} = useSession();
    const {track} = props;
    const [trackLikes, setTrackLikes] = useState<ITrackLike | null>(null);

    const fetchData = async () => {
        if (session?.access_token) {
            // logic get array track user like
        }
    }

    useEffect(() => {
        fetchData();
    }, [session])

    return <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
            <Chip label="Like" variant="outlined" icon={<Favorite />}/> 
        </Box>
        <Box>
            <Chip label={track?.countPlay}  icon={<PlayArrow />} sx={{mr: 1}}/>
            <Chip label={track?.countLike}  icon={<Favorite />}/>
        </Box>
    </Box>
}

export default LikeTrack;