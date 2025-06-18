"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UploadTab = () => {
  const [value, setValue] = useState(0);
  const [trackUpload, setTrackUpload] = useState({
    fileName: "",
    percent: 0,
    uploadedTrackName: "",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", border: "1px solid rgba(0, 0, 0, 0.12)", mt: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tracks" disabled={value !== 0} />
          <Tab label="Basic information" disabled={value !== 1} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Step1
          setValue={setValue}
          setTrackUpload={setTrackUpload}
          trackUpload={trackUpload}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Step2 trackUpload={trackUpload} setValue={setValue} />
      </CustomTabPanel>
    </Box>
  );
};

export default UploadTab;
