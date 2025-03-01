import React, { useState, useEffect, useCallback } from "react";
import "./index.css";

const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const images = importAll(
  require.context("../../imgs/bigpic", false, /\.(png|jpe?g|svg|webp)$/)
);

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="carousel-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
