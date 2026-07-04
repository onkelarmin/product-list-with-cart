import type { ComponentPropsWithoutRef } from "react";
import { breakpoints } from "../../../data/breakpoints";

type ScreenSizes = "desktop" | "tablet" | "mobile";

type ImageSource = {
  src: string;
  width: number;
  height: number;
};

type ImageProps = {
  image: ImageSource;
  alt: string;
  responsiveSources?: Partial<Record<ScreenSizes, ImageSource>>;
  imageSizes?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  priority?: boolean;
} & ComponentPropsWithoutRef<"img">;

export function Image({
  image,
  alt,
  responsiveSources,
  imageSizes,
  priority = false,
  ...rest
}: ImageProps) {
  const srcSetValue = responsiveSources
    ? [
        responsiveSources.mobile &&
          `${responsiveSources.mobile.src} ${responsiveSources.mobile.width}w`,
        responsiveSources.tablet &&
          `${responsiveSources.tablet.src} ${responsiveSources.tablet.width}w`,
        responsiveSources.desktop &&
          `${responsiveSources.desktop.src} ${responsiveSources.desktop.width}w`,
      ]
        .filter(Boolean)
        .join(", ")
    : undefined;

  const sizesValue =
    srcSetValue && imageSizes
      ? `(max-width: ${breakpoints.medium}) ${imageSizes.mobile}, (max-width: ${breakpoints.large}) ${imageSizes.tablet}, ${imageSizes.desktop}`
      : undefined;

  return (
    <img
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "auto" : "async"}
      srcSet={srcSetValue}
      sizes={sizesValue}
      {...rest}
    />
  );
}
