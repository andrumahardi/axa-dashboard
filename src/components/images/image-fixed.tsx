import React from "react";
import Image, { ImageProps } from "next/image";

export function ImageFixed({
  src,
  alt,
  style,
  sizes,
  ...imageProps
}: ImageProps) {
  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      sizes={sizes || "min-width: 50px"}
      fill={false}
      style={{
        ...style,
      }}
    />
  );
}
