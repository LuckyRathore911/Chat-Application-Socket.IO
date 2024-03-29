import React, { useState, useEffect } from "react";

const Image = ({ fileName, blob }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }, [blob]);

  return (
    <img style={{ width: 150, height: "auto" }} src={imageSrc} alt={fileName} />
  );
};

export default Image;
