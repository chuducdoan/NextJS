"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

interface IProps {
  data: ITrack[];
  title: string;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;
  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          right: "0",
          zIndex: "2",
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRight />
      </Button>
    );
  };
  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          left: "0",
          zIndex: "2",
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeft />
      </Button>
    );
  };
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <Box
        sx={{
          margin: "0 50px",
          ".track": {
            padding: "0 10px",
            display: "flex",
            justifyItems: "center",

            img: {
              height: 150,
              width: 150,
              objectFit: "cover",
            },
          },
          h3: {
            border: "1px solid #ccc",
            padding: "20px",
            height: "200px",
          },
        }}
      >
        <h2>{title}</h2>
        <Slider {...settings}>
          {data.map((track) => (
            <div className="track" key={track._id}>
              <div>
                <img src={track.imgUrl} />
                <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                  <h4>{track.title}</h4>
                </Link>
                <h5>{track.description}</h5>
              </div>
            </div>
          ))}
        </Slider>
        <Divider />
      </Box>
    </>
  );
};

export default MainSlider;
