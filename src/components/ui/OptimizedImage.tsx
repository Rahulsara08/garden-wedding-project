"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import imageManifestRaw from "@/config/imageManifest.json";

interface ImageManifestItem {
  width: number;
  height: number;
  aspectRatio: number;
  blurDataURL?: string;
  webp?: string;
  avif?: string;
  variants?: Array<{ width: number; webp: string; avif: string }>;
}

const manifest = imageManifestRaw as Record<string, ImageManifestItem>;

export interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  aspectRatio?: number;
  usePictureTag?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  aspectRatio,
  usePictureTag = false,
  fill = false,
  style,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean source path key for manifest lookup
  const cleanSrcKey = src.split("?")[0].replace(/^public\//, "/");
  const manifestData = manifest[cleanSrcKey];

  const resolvedWidth = width || manifestData?.width;
  const resolvedHeight = height || manifestData?.height;
  const blurUrl = manifestData?.blurDataURL;
  const calculatedAspect = aspectRatio || manifestData?.aspectRatio;

  // IntersectionObserver to trigger eager load slightly before viewport entry
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgEl = e.currentTarget;
    if (imgEl && "decode" in imgEl) {
      imgEl
        .decode()
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
    if (onLoad) onLoad(e);
  };

  // Determine AVIF/WebP variants if available
  const avifSrc = manifestData?.avif || src;
  const webpSrc = manifestData?.webp || src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${fill ? "w-full h-full" : ""} ${className}`}
      style={{
        ...(calculatedAspect && !fill ? { aspectRatio: `${calculatedAspect}` } : {}),
        ...style,
      }}
    >
      {/* Soft Blur-Up / Shimmer Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 z-0 bg-[#FAF3E4]/60 animate-pulse pointer-events-none transition-opacity duration-500"
          style={{
            ...(blurUrl
              ? {
                  backgroundImage: `url(${blurUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(12px)",
                  transform: "scale(1.08)",
                }
              : {}),
          }}
        />
      )}

      {/* Render Picture element or Next Image */}
      {isInView && (
        usePictureTag && manifestData?.variants ? (
          <picture className={`relative z-1 ${fill ? "w-full h-full" : ""}`}>
            <source
              type="image/avif"
              srcSet={manifestData.variants.map((v) => `${v.avif} ${v.width}w`).join(", ")}
              sizes={sizes}
            />
            <source
              type="image/webp"
              srcSet={manifestData.variants.map((v) => `${v.webp} ${v.width}w`).join(", ")}
              sizes={sizes}
            />
            <img
              src={src}
              alt={alt}
              width={resolvedWidth}
              height={resolvedHeight}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              // @ts-ignore
              fetchpriority={priority ? "high" : "auto"}
              onLoad={handleImageLoad}
              className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        ) : (
          <Image
            src={webpSrc}
            alt={alt}
            width={!fill ? resolvedWidth : undefined}
            height={!fill ? resolvedHeight : undefined}
            fill={fill}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            sizes={sizes}
            blurDataURL={blurUrl}
            placeholder={blurUrl ? "blur" : "empty"}
            onLoad={handleImageLoad}
            className={`transition-opacity duration-500 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            {...props}
          />
        )
      )}
    </div>
  );
};
