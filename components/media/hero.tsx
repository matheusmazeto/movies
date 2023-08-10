"use client";

import { useState } from "react";
import { getTrailer } from "@/lib/utils";
import { PiPlayCircleLight, PiPlayFill } from "react-icons/pi";
import Image from "next/image";
import IframeModal from "../modal";
import Link from "next/link";

export default function MediaHero({ media }: { media: Media }) {
  const [isOpen, setIsOpen] = useState(false);
  const trailer = getTrailer(media);
  const type = media.media_type || media.title ? "movie" : "tv";

  return (
    <div className="relative aspect-[1/1] md:aspect-[4/2] lg:aspect-[16/6]">
      {media.backdrop_path ? (
        <Image
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w1280${media.backdrop_path}`}
          alt=""
          width={1280}
          height={720}
          loading="eager"
          priority
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-zinc-900" />
      )}
      <div className="absolute inset-0 bg-zinc-700 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="px-global h-full flex flex-col justify-between md:justify-center">
          <button
            className="flex items-center justify-center text-7xl w-full my-auto md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <PiPlayCircleLight />
            <span className="sr-only">Watch Trailer</span>
          </button>
          <div>
            <Link href={`/${type}/detail/${media.id}`}>
              <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl lg:text-6xl line-clamp-2">
                {media.title || media.name}
              </h1>
            </Link>
            <p className="mt-2 sm:mt-4 md:mt-6 max-w-3xl tex-lg md:text-xl text-gray-300 line-clamp-3 mb-8 md:mb-0">
              {media.overview}
            </p>
            {trailer && (
              <>
                <button
                  className="mt-4 lg:text-xl hidden md:button"
                  onClick={() => setIsOpen(true)}
                >
                  <PiPlayFill />
                  <span>Watch Trailer</span>
                </button>

                <IframeModal
                  src={trailer}
                  isOpen={isOpen}
                  close={() => setIsOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
