"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { ChevronLeft } from "lucide-react";

const slides = [
  "New Year Sale is Live! Use Code: NY10",
  "New Year Sale is Live! Use Code: NY10",
  "New Year Sale is Live! Use Code: NY10",
];

const options: EmblaOptionsType = { loop: true };

export default function Announcement() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: false, delay: 3000 }),
  ]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi && emblaApi.scrollPrev();
    emblaApi.plugins().autoplay.reset();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins().autoplay.reset();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-templateBrown text-white select-none">
      <div className="templateContainer">
        <div className="flex items-center justify-between h-9">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
          </button>
          <div
            className="overflow-hidden no-scrollbar text-xs  font-title"
            ref={emblaRef}
          >
            <div className="flex">
              {slides.map((text, index) => (
                <span
                  className="grow-0 shrink-0 basis-full size-full my-auto tracking-wide text-center"
                  key={index}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Next announcement"
          >
            <ChevronLeft className="h-4 w-4 rotate-180 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
