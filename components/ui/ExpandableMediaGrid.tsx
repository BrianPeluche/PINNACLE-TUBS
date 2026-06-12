"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { VideoBackground } from "@/lib/VideoBackground";
import { MediaModal } from "./MediaModal";

export type ExpandableMediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      title: string;
      kicker: string;
      description: string;
      shape?: "wide" | "tall" | "standard";
    }
  | {
      type: "video";
      src: string;
      poster: string;
      title: string;
      kicker: string;
      description: string;
      shape?: "wide" | "tall" | "standard";
    };

interface ExpandableMediaGridProps {
  items: readonly ExpandableMediaItem[];
}

function shapeClass(shape: ExpandableMediaItem["shape"]) {
  if (shape === "wide") return "sm:col-span-2";
  if (shape === "tall") return "sm:row-span-2 sm:min-h-[34rem]";
  return "";
}

export function ExpandableMediaGrid({ items }: ExpandableMediaGridProps) {
  const [active, setActive] = useState<ExpandableMediaItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="grid auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={`${item.type}-${item.title}`} className={shapeClass(item.shape)}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative flex h-full w-full overflow-hidden rounded-lg bg-muted text-left shadow-2xl ring-1 ring-foreground/10 transition duration-500 hover:-translate-y-1 hover:ring-accent/60 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {item.type === "video" ? (
                <>
                  <VideoBackground
                    src={item.src}
                    poster={item.poster}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-background/35" aria-hidden="true" />
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
              <div
                className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 mt-auto w-full p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {item.kicker}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold uppercase leading-[0.95] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {active && createPortal(<MediaModal item={active} onClose={close} />, document.body)}
    </>
  );
}
