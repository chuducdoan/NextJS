"use client";

import { createContext, useContext, useState } from "react";

const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initValue: IShareTrack = {
    id: 0,
    title: "",
    description: "",
    imgUrl: "",
    trackUrl: "",
    category: "",
    countLike: 0,
    countPlay: 0,
    isPlaying: false,
  };
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initValue);

  return (
    <TrackContext.Provider
      value={{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
