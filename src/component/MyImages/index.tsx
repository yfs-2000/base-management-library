import React, { useState, useEffect } from "react";
import noImg from "src/common/images/noImg.svg";
interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  errorUrl?: string;
}
const Index: React.FC<Props> = (props) => {
  const { src: propsSrc, errorUrl = noImg, ...value } = props;
  const [src, setSrc] = useState(propsSrc ? propsSrc : errorUrl);
  useEffect(() => {
    setSrc(propsSrc ? propsSrc : errorUrl);
  }, [propsSrc, errorUrl]);
  const errorFn = () => {
    if (errorUrl) {
      setSrc(errorUrl);
    }
  };
  return <img src={src} onError={errorFn} {...value} />;
};

export default Index;
