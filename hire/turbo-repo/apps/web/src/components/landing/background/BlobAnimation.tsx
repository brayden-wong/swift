import React, { useEffect, useState } from "react";

const BlobAnimation = () => {
  const [blobPath, setBlobPath] = useState(
    "M44.5,-77.2C56,-70.3,62.8,-55.2,67.4,-41C72,-26.7,74.5,-13.4,77,1.4C79.4,16.2,81.9,32.4,74.9,42.6C67.9,52.8,51.6,56.9,37.5,60.6C23.5,64.4,11.7,67.9,-0.3,68.4C-12.3,68.9,-24.5,66.3,-32.7,59.1C-40.8,51.9,-44.8,40.1,-49.6,29.4C-54.3,18.8,-59.8,9.4,-60.4,-0.4C-61.1,-10.1,-56.8,-20.2,-54.1,-34.4C-51.4,-48.6,-50.3,-66.8,-41.5,-75.3C-32.8,-83.7,-16.4,-82.4,0,-82.4C16.4,-82.5,32.9,-84,44.5,-77.2Z"
  );

  // Function to generate a random number within a specified range
  const randomFloat = (start: any, end: any) => {
    return (Math.random() * (end - start) + start).toFixed(2);
  };

  // Function to generate a random path data string for variations
  const generateRandomPathData = () => {
    const pathData = [];

    // Start with the initial 'M' command
    pathData.push(`M${randomFloat(20, 60)},${randomFloat(-80, -60)}`);

    // Generate random 'C' commands with variations
    for (let i = 0; i < 4; i++) {
      pathData.push(
        `C${randomFloat(-10, 10)},${randomFloat(-10, 10)},${randomFloat(
          -10,
          10
        )},${randomFloat(-10, 10)},${randomFloat(20, 60)},${randomFloat(
          60,
          80
        )}`
      );
    }

    // Close the path with 'Z' command
    pathData.push("Z");

    return pathData.join(" ");
  };

  // Function to update the blob path gradually over time
  const changeBlobPath = () => {
    const randomPath = generateRandomPathData();
    setBlobPath(randomPath);
  };

  // Animate the transition between paths initially and every 2 seconds
  useEffect(() => {
    const initialPath =
      "M44.5,-77.2C56,-70.3,62.8,-55.2,67.4,-41C72,-26.7,74.5,-13.4,77,1.4C79.4,16.2,81.9,32.4,74.9,42.6C67.9,52.8,51.6,56.9,37.5,60.6C23.5,64.4,11.7,67.9,-0.3,68.4C-12.3,68.9,-24.5,66.3,-32.7,59.1C-40.8,51.9,-44.8,40.1,-49.6,29.4C-54.3,18.8,-59.8,9.4,-60.4,-0.4C-61.1,-10.1,-56.8,-20.2,-54.1,-34.4C-51.4,-48.6,-50.3,-66.8,-41.5,-75.3C-32.8,-83.7,-16.4,-82.4,0,-82.4C16.4,-82.5,32.9,-84,44.5,-77.2Z";
    setBlobPath(initialPath);
    setTimeout(changeBlobPath, 2000);
    const interval = setInterval(changeBlobPath, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blob-container">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d={blobPath}
          transform="translate(100 100)"
          className="smooth"
        />
      </svg>
    </div>
  );
};

export default BlobAnimation;
