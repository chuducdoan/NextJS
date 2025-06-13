"use client";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./theme.css";
import { Button, styled } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useCallback } from "react";

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

const Step1 = () => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
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
