import React, { useEffect, useState, useRef } from "react";
import "./index.css";

const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const images = importAll(
  require.context("../../imgs/bigpic", false, /\.(png|jpe?g|svg|webp)$/)
);

const VirtualList = ({
  listData = images,
  itemSize = 400,
  containerHeight = 800,
}) => {
  const listRef = useRef(null);
  const [start, setStart] = useState(0);

  const handleScroll = () => {
    const scrollTop = listRef.current.scrollTop;
    const newStart = Math.floor(scrollTop / itemSize);
    setStart(newStart);
  };

  const visibleCount = Math.ceil(containerHeight / itemSize);
  const end = Math.min(start + visibleCount, listData.length);
  const visibleData = listData.slice(start, end);

  return (
    <div
      ref={listRef}
      className="infinite-list-container"
      style={{ height: containerHeight, overflowY: "auto" }}
      onScroll={handleScroll}
    >
      {/* <div
        className="infinite-list-phantom"
        style={{ height: `${listData.length * itemSize}px` }}
      ></div> */}
      <div
        className="infinite-list"
        // style={{ transform: `translateY(${start * itemSize}px)` }}
      >
        {visibleData.map((img, index) => (
          <div
            key={index}
            className="infinite-list-item"
            style={{
              height: itemSize,
              lineHeight: `${itemSize}px`,
            }}
          >
            <img
              src={img}
              alt={`img ${start + index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
