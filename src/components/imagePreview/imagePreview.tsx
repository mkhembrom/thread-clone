"use client";
import { IImage, IPost } from "@/app/types";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

interface imagePreviewProps {
  postData?: IPost;
  imageData: IImage[];
}

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ImagePreview({ imageData }: imagePreviewProps) {
  const fullscreenRef = React.useRef(null);

  const [[page, direction], setPage] = useState([0, 0]);
  const [count, setCount] = useState(0);

  const imageIndex = wrap(0, imageData.length as number, page);
  const [isHovered, setHovered] = useState(false);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleLeft = () => {
    setCount((n) => (n === 0 ? imageData.length - 1 : n - 1));
    paginate(-1);
  };

  const handleRight = () => {
    setCount((n) => (n + 1) % imageData.length);

    paginate(1);
  };
  const [open, setOpen] = useState(false);
  const [closeOnPullDown, setCloseOnPullDown] = React.useState(false);
  const [closeOnBackdropClick, setCloseOnBackdropClick] = React.useState(false);

  const slide = imageData.map((src: any) => ({
    src: `${src.imageUrl}`,
  }));

  function reorderArray<T>(arr: T[], count: number): T[] {
    const selectedItems = arr.slice(0, count); // Select the desired number of items
    const remainingItems = arr.slice(count); // Get the remaining items

    const reorderedArray: T[] = [...selectedItems, ...remainingItems]; // Concatenate the arrays

    return reorderedArray;
  }

  // Provide the desired count value
  const imageSlide: { src: string }[] = reorderArray(slide, count);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        ref={fullscreenRef}
        className={` flex relative h-[500px] w-full sm:w-[320px] rounded-lg  object-cover max-w-80 overflow-hidden`}
      >
        <motion.img
          placeholder="blur"
          key={page}
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          loading="lazy"
          width={320}
          height={500}
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-lg object-cover group "
          src={`${imageData[imageIndex]?.imageUrl}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
              setCount((n) => (n + 1) % imageData.length);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
              setCount((n) => (n === 0 ? imageData.length - 1 : n - 1));
            }
          }}
        />
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[slide[count]]}
          controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
          render={{
            buttonPrev: imageData.length > 1 ? undefined : () => null,
            buttonNext: imageData.length > 1 ? undefined : () => null,
            iconNext: () => <></>,
            iconPrev: () => <></>,
          }}
          // plugins={[Counter]}

          // counter={{ container: { style: { top: 0, left: 0 } } }}
          plugins={[Fullscreen]}
          fullscreen={{ ref: fullscreenRef }}
        />

        {imageData.length > 1 && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`h-28 w-full 
                  bg-gradient-to-t from-black rounded-b-md absolute -bottom-2 left-0 z-30  right-0 items-center justify-between px-4 flex`}
              >
                <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div
                      className="cursor-pointer w-10 h-10 flex items-center justify-center pr-1 rounded-full text-white"
                      onClick={handleLeft}
                    >
                      <BsArrowLeftCircleFill size={35} />
                    </div>

                    <div
                      className="cursor-pointer w-10 h-10 flex items-center justify-center pl-1 rounded-full text-white"
                      onClick={handleRight}
                    >
                      <BsArrowRightCircleFill size={35} />
                    </div>
                  </div>
                  <p className="text-md font-light text-white">
                    {count + 1}/{imageData.length}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
