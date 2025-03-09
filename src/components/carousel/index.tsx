// 写一个轮播图组件
import React, { useState, useEffect } from 'react';
import './index.less';

interface CarouselProps {
    images: string[];
    interval?: number;
    autoPlay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000, autoPlay = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    useEffect(() => {
        if (autoPlay) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, interval);

            return () => clearInterval(intervalId);
        }
    }, [autoPlay, images.length, interval]);
    
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        <img src={image} alt={`carousel-${index}`} />
                    </div>
                ))}
            </div>
            <div className="carousel-dots">
                {images.map((_, index) => (
                    <div key={index} className="carousel-dot" onClick={() => handleDotClick(index)}></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;