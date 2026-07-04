import type { ComponentPropsWithoutRef } from "react";
import { breakpoints } from "../../../data/breakpoints";

type ScreenSize = "desktop" | "tablet" | "mobile";

type PictureSource = {
  src: string;
  width: number;
  height: number;
};

type PictureProps = {
  alt: string;
  sources: Record<ScreenSize, PictureSource>;
  priority?: boolean;
  imgClassName?: string;
} & ComponentPropsWithoutRef<"picture">;

export function Picture({
  alt,
  sources,
  priority = false,
  imgClassName,
  ...rest
}: PictureProps) {
  return (
    <picture {...rest}>
      <source
        media={`(min-width: ${breakpoints.large})`}
        srcSet={sources.desktop.src}
      />

      <source
        media={`(min-width: ${breakpoints.medium})`}
        srcSet={sources.tablet.src}
      />

      <img
        src={sources.mobile.src}
        alt={alt}
        width={sources.mobile.width}
        height={sources.mobile.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "auto" : "async"}
        className={imgClassName}
      />
    </picture>
  );
}
