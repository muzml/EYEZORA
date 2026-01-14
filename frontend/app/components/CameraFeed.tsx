"use client";

import { useEffect, useRef } from "react";

export default function CameraFeed({ onFrame }: { onFrame: (img: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
  }, []);

  const captureFrame = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    onFrame(canvas.toDataURL("image/jpeg"));
  };

  useEffect(() => {
    const interval = setInterval(captureFrame, 5000);
    return () => clearInterval(interval);
  }, []);

  return <video ref={videoRef} autoPlay muted className="rounded-xl" />;
}
