import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ScanFace } from "lucide-react";
import api from "../api/api";
import "../styles/Scan.css";

export default function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
      });

      videoRef.current.srcObject = stream;
    } catch {
      setError("Unable to access camera.");
    }
  }

  async function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas
      .getContext("2d")
      .drawImage(video, 0, 0);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.95)
    );

    const form = new FormData();
    form.append("file", blob, "face.jpg");

    try {
      setLoading(true);

      const res = await api.post("/analyze", form);

      localStorage.setItem(
        "analysis",
        JSON.stringify(res.data)
      );

      navigate("/result");

    } catch (err) {

      console.log(err);

      alert("Analysis failed.");

      setLoading(false);
    }
  }

  return (
    <div className="scanPage">

      <h1>
        <ScanFace size={42}/>
        Face Scan
      </h1>

      <p>
        Position your face inside the frame.
      </p>

      {error && (
        <h3>{error}</h3>
      )}

      <div className="cameraBox">

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />

        <div className="faceGuide"></div>

      </div>

      <button
        className="captureBtn"
        onClick={capture}
        disabled={loading}
      >

        <Camera size={20}/>

        {loading ? "Analyzing..." : "Capture"}

      </button>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </div>
  );
}