import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export default function NextImage({ src, alt, fill, className, ...props }: ImageProps) {
  const style = fill
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%" }
    : undefined;
  return <img src={src} alt={alt} className={className} style={style} />;
}
