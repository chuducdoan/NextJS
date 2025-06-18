"use client";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  LinearProgressProps,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { error } from "console";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt";
import { useToast } from "@/utils/toast";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload(props: any) {
  const { data: session } = useSession();
  const { setInfo, info } = props;

  const handleUpload = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post(
        "http://localhost:8080/api/v1/files/upload",
        formData,
        {
          headers: {
            ["Authorization"]: `Bearer ${session?.access_token}`,
          },
        }
      );
      setInfo({
        ...info,
        imgUrl: res.data.data.fileName,
        imgLink: res.data.data.fileUrl,
      });
    } catch (error) {
      // @ts-ignore
      alert(error?.response?.data.message);
    }
  };

  return (
    <Button component="label" variant="contained" startIcon={<CloudUpload />}>
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(e: any) => {
          const event = e.target as HTMLInputElement;
          if (event.files) {
            handleUpload(event.files[0]);
          }
        }}
        multiple
      />
    </Button>
  );
}

interface IProps {
  trackUpload: any;
  setValue: (v: number) => void;
}

interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  imgLink: string;
  category: string;
}

const Step2 = (props: IProps) => {
  const { trackUpload, setValue } = props;
  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    imgLink: "",
    category: "",
  });
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (trackUpload && trackUpload.uploadedTrackName) {
      setInfo({ ...info, trackUrl: trackUpload.uploadedTrackName });
    }
  }, [trackUpload]);

  const handleSubmitForm = async () => {
    const res = await sendRequest<IBackendRes<JWT>>({
      url: "http://localhost:8080/api/v1/tracks",
      method: "POST",
      body: info,
      headers: {
        ["Authorization"]: `Bearer ${session?.access_token}`,
      },
    });
    if (res.code === "00") {
      toast.success("Thêm mới track thành công.");
      setValue(0);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>{trackUpload?.fileName}</div>
          <LinearProgressWithLabel value={trackUpload.percent} />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <div style={{ height: 250, width: 250, background: "#ccc" }}>
              {info.imgUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${info.imgUrl}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <InputFileUpload setInfo={setInfo} info={info} />
          </Box>
        </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            label="Title"
            variant="standard"
            fullWidth
            value={info?.title}
            onChange={(e) =>
              setInfo({
                ...info,
                title: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={info?.description}
            onChange={(e) =>
              setInfo({
                ...info,
                description: e.target.value,
              })
            }
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={info.category}
              onChange={(e) =>
                setInfo({
                  ...info,
                  category: e.target.value,
                })
              }
              label="Category"
            >
              <MenuItem value={"CHILL"}>CHILL</MenuItem>
              <MenuItem value={"WORKOUT"}>WORKOUT</MenuItem>
              <MenuItem value={"PARTY"}>PARTY</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => handleSubmitForm()}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
