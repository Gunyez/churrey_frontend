import { useState } from "react";
import "../styles/slider.css";

const ImageSlider = ({ photos = [] }) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpen = (index) => {
    setSlideIndex(index);
    setOpen(true);
  };

  const handleMove = (direction) => {

    let newIndex;

    if (direction === "left") {
      newIndex =
        slideIndex === 0
          ? photos.length - 1
          : slideIndex - 1;
    } else {
      newIndex =
        slideIndex === photos.length - 1
          ? 0
          : slideIndex + 1;
    }

    setSlideIndex(newIndex);
  };

  if (!photos.length) {
    return <p>No images available</p>;
  }

  return (
    <div>

      {/* Thumbnail Grid */}
      <div
        className="gallery"
        onScroll={(e) => {

          const scrollLeft = e.target.scrollLeft;
          const width = e.target.clientWidth;

          const index = Math.round(scrollLeft / width);

          setActiveIndex(index);
        }}
      >

        {photos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt={`House ${i + 1}`}
            onClick={() => handleOpen(i)}
            className="thumb"
          />
        ))}

      </div>

      {/* Mobile Dots */}
      <div className="mobileDots">

        {photos.map((_, i) => (
          <span
            key={i}
            className={
              i === activeIndex
                ? "dot active"
                : "dot"
            }
          />
        ))}

      </div>

      {/* Slider Modal */}
      {open && (
        <div className="sliderOverlay">

          <span
            className="closeBtn"
            onClick={() => setOpen(false)}
          >
            ✖
          </span>

          <span
            className="arrow left"
            onClick={() => handleMove("left")}
          >
            ❮
          </span>

          <div className="sliderWrapper">

            <img
              src={photos[slideIndex]}
              alt={`Slide ${slideIndex + 1}`}
              className="sliderImage"
            />

          </div>

          {/* Slider Dots */}
          <div className="dots">

            {photos.map((_, i) => (
              <span
                key={i}
                className={
                  i === slideIndex
                    ? "dot active"
                    : "dot"
                }
                onClick={() => setSlideIndex(i)}
              />
            ))}

          </div>

          <span
            className="arrow right"
            onClick={() => handleMove("right")}
          >
            ❯
          </span>

        </div>
      )}

    </div>
  );
};

export default ImageSlider;