"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExamPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const STUDENT_ID = "STUDENT_21";

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  const [faceLostSince, setFaceLostSince] = useState<number | null>(null);
  const [cameraLostSince, setCameraLostSince] = useState<number | null>(null);

  const [faceViolated, setFaceViolated] = useState(false);
  const [cameraViolated, setCameraViolated] = useState(false);

  /* 🔗 BACKEND LOGGER */
  const logEvent = async (event: string) => {
    try {
      await fetch("http://localhost:5000/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: STUDENT_ID,
          event,
        }),
      });
    } catch (err) {
      console.error("Backend logging failed", err);
    }
  };

  /* ⛔ LOCK BACK NAVIGATION */
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.onpopstate = () => history.go(1);
  }, []);

  /* ⏱ EXAM TIMER */
  useEffect(() => {
    if (!permissionGranted) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          logEvent("Exam finished");
          alert("Exam completed");
          router.push("/dashboard/student");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [permissionGranted, router]);

  /* 🎥 START CAMERA */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setPermissionGranted(true);
      logEvent("Camera & microphone access granted");
    } catch {
      alert("Camera & microphone permission is mandatory");
      logEvent("Camera permission denied");
    }
  };

  /* 👁 PROCTORING MONITOR (STABLE & LOCKED) */
  useEffect(() => {
    if (!permissionGranted || !videoRef.current) return;

    const interval = setInterval(() => {
      const video = videoRef.current;

      /* CAMERA DISCONNECT CHECK */
      if (!video || video.readyState < 2) {
        if (!cameraLostSince) {
          setCameraLostSince(Date.now());
        } else if (
          Date.now() - cameraLostSince > 5000 &&
          !cameraViolated
        ) {
          alert("⚠ Camera disconnected!");
          logEvent("Camera disconnected for >5 seconds");
          setCameraViolated(true);
        }
        return;
      } else {
        setCameraLostSince(null);
        setCameraViolated(false);
      }

      /* FACE VISIBILITY CHECK (SIMULATED) */
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        if (!faceLostSince) {
          setFaceLostSince(Date.now());
        } else if (
          Date.now() - faceLostSince > 5000 &&
          !faceViolated
        ) {
          alert("⚠ Face not visible!");
          logEvent("Face not visible for >5 seconds");
          setFaceViolated(true);
        }
      } else {
        setFaceLostSince(null);
        setFaceViolated(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [
    permissionGranted,
    faceLostSince,
    cameraLostSince,
    faceViolated,
    cameraViolated,
  ]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1633] to-black text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">AI Proctored Examination</h1>
        <div className="bg-white/10 px-4 py-2 rounded-xl font-semibold">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {!permissionGranted ? (
        /* PERMISSION SCREEN */
        <div className="max-w-xl mx-auto bg-white text-black rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Exam Rules & Permissions
          </h2>

          <ul className="list-disc ml-5 text-gray-700 space-y-2 mb-6">
            <li>Camera must remain ON throughout the exam</li>
            <li>No additional persons allowed</li>
            <li>No mobile phones permitted</li>
            <li>AI continuously monitors behavior</li>
          </ul>

          <button
            onClick={startCamera}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#5c145a] to-[#7a1c6b]"
          >
            Allow Camera & Microphone
          </button>
        </div>
      ) : (
        /* EXAM SCREEN */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* QUESTIONS */}
          <div className="lg:col-span-3 bg-white text-black rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4">Question 1</h2>
            <p className="mb-6">
              What is the main purpose of AI-based exam proctoring?
            </p>

            <div className="space-y-3">
              <label className="block">
                <input type="radio" name="q1" /> Prevent cheating
              </label>
              <label className="block">
                <input type="radio" name="q1" /> Increase exam duration
              </label>
              <label className="block">
                <input type="radio" name="q1" /> Replace invigilators
              </label>
              <label className="block">
                <input type="radio" name="q1" /> None of the above
              </label>
            </div>
          </div>

          {/* CAMERA FEED */}
          <div className="bg-black/40 rounded-3xl p-4 text-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-40 rounded-xl object-cover"
            />
            <p className="mt-2 text-green-400 font-semibold">
              Camera Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
