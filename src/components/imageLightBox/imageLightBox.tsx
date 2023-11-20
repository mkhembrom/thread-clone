"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

type imageLightBoxProps = {
  img: string;
  id: string;
};

const ImageLightBox = ({ img, id }: imageLightBoxProps) => {
  const [open, setOpen] = useState(false);
  const fullscreenRef = React.useRef(null);
  const slide: { src: string }[] = [
    {
      src: `${img}`,
    },
  ];
  return (
    <>
      <Image
        ref={fullscreenRef}
        className="rounded-2xl"
        src={img}
        width={120}
        height={180}
        alt={id}
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slide}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        plugins={[Fullscreen]}
        fullscreen={{ ref: fullscreenRef }}
      />
    </>
  );
};

export default ImageLightBox;
