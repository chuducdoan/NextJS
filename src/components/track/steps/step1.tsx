"use client";
import { sendRequestFile } from "@/utils/api";
import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./theme.css";
import axios from "axios";

interface IProps {
  setValue: (v: number) => void;
  setTrackUpload: (v: any) => void;
  trackUpload: any;
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

function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      onClick={(e) => e.preventDefault()}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event: any) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}

const Step1 = (props: IProps) => {
  const { data: session } = useSession();
  const { trackUpload } = props;

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        props.setValue(1);
        const audio = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", audio);

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
            formData,
            {
              headers: {
                ["Authorization"]: `Bearer ${session?.access_token}`,
              },
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.floor(
                  //@ts-ignore
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                props.setTrackUpload({
                  ...trackUpload,
                  fileName: acceptedFiles[0].name,
                  percent: percentCompleted,
                });
              },
            }
          );
          props.setTrackUpload((prevState: any) => ({
            ...prevState,
            uploadedTrackName: res.data.data.fileName,
          }));
        } catch (error) {
          // @ts-ignore
          alert(error?.response?.data?.message);
        }
      }
    },
    [session]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3", ".m4a", ".wav"],
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Click hoặc Drag/Drop để upload file track</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;
