// components/Camera.tsx
import { useRef, useEffect, useState } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStream(stream); // Simpan stream ke state
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    startCamera();

    return () => {
      // Clean up function
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop(); // Stop semua track dalam stream
        });
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: "50%", height: "auto" }} />

      <br />
      <button onClick={handleCapture}>Capture</button>
      {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
