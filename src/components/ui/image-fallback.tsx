import * as React from "react";
import Image from "next/image";

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

const ImageWithFallback = React.forwardRef<HTMLInputElement, ImageWithFallbackProps>(({ src, fallbackSrc, alt = "", ...props }, ref) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc || "/images/nonimage.png");
      setHasError(true);
    }
  };

  return (
    <Image
      // @ts-expect-error - next/image is not typed correctly, should accept blob
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
});

ImageWithFallback.displayName = "ImageWithFallback";

export { ImageWithFallback };
