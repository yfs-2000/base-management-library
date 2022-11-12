import React, { FC, useState } from "react";
import { ossHttpUrl } from "../../utili/constant";

const Index: FC<{
  url: string;
  onPreview: (file: File | string) => void;
  width?: number;
  height?: number;
}> = ({ url, onPreview, width = 50, height = 50 }) => {
  const [load, setLoad] = useState(false);
  const src = ossHttpUrl(url);
  return (
    <img
      onLoad={() => {
        setLoad(true);
      }}
      onClick={() => {
        if (!load) {
          return;
        }
        onPreview(src);
      }}
      width={width}
      height={height}
      style={{
        objectFit: "contain",
        cursor: "pointer",
      }}
      src={src}
      alt=""
    />
  );
};

export default Index;
