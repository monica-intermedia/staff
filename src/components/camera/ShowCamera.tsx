import { useState } from "react";
import Camera from "./Camera";

const ShowCamera = () => {
  const [showCamera, setShowCamera] = useState(false);

  const handleClick = () => {
    setShowCamera(!showCamera);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {showCamera ? "Hide Camera" : "Show Camera"}
      </button>
      {showCamera && <Camera />}
    </div>
  );
};

export default ShowCamera;
