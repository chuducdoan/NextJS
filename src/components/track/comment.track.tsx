'use client';

import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";
import { Box, Grid, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { useHasMounted } from "@/utils/customHook";
dayjs.extend(relativeTime)

interface IProps {
    track: ITrackProps | null;
    comments: ITrackCommentProps[] | null;
    wavesufer: any;
}

const formatTime = (seconds: any) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};

const CommentTrack = (props: IProps) => {
    const {data: session} = useSession();
    const [yourComment, setYourComment] = useState("")
    const {comments, track, wavesufer} = props;
    const toast = useToast();
    const router = useRouter();
    const hasMounted = useHasMounted();

    const handleSubmit = async () =>{
        const resComment = await sendRequest<IBackendRes<null>>({
            url: `http://localhost:8080/api/v1/comments`,
            method: "POST",
            body: {
                "trackId": track?.id,
                "moment": Math.round(wavesufer?.getCurrentTime() ?? 0),
                "content": yourComment
            },
            headers: {
              ["Authorization"]: `Bearer ${session?.access_token}`,
            },
          });
        if (resComment.code === "00") {
            setYourComment("");
            router.refresh()
        } else {
            toast.error(resComment.message);
        }
    }

    const handleJumpTrack = (moment: number) => {
        if (wavesufer) {
            const duration = wavesufer.getDuration();
            wavesufer.seekTo(moment/duration);
            wavesufer.play();
        }
    }

    return <Box sx={{mt: 3}}>
        {session?.user && (
            <TextField onChange={(e) => setYourComment(e.target.value)} value={yourComment} id="standard-basic" label="Comments" variant="standard" fullWidth onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit();
                }
            }}/>
        )}
        <Box sx={{mt: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <img src={fetchDefaultImages(session?.user.type ?? "")} style={{width: '150px'}}/>
                    </div>
                     <Typography>
                        {session?.user.email}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    {comments?.map((cmt: ITrackCommentProps, index: number) => (
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}} key={index}>
                                <Box sx={{display: 'flex', gap: '8px'}}>
                                    <img src={fetchDefaultImages(cmt.type ?? "")} style={{width: '40px', height: '40px', objectFit: 'contain'}}/>
                                    <Box>
                                        <div className="comment-user" style={{fontSize: '13px'}}>{cmt.userName}  <span style={{cursor: 'pointer'}} onClick={() => handleJumpTrack(cmt.moment)}>{formatTime(cmt.moment)}</span></div>
                                        <div className="comment-desc" style={{fontSize: '14px'}}>{cmt.content}</div>
                                    </Box>
                                </Box>
                                <Box sx={{fontSize: '12px', color: '#999'}}>
                                    {hasMounted && dayjs(cmt.createdAt).fromNow()}
                                </Box>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    </Box>
}

export default CommentTrack