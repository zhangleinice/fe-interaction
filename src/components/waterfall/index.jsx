/**
 *
 * 瀑布流
 *
 * 思路：
 * 1. 记录每列高度
 * 2. 依次将每一张图片定位到最小列下面
 *
 */

import React, { useEffect, useState, useRef } from "react";
import "./index.css";

const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const images = importAll(
  require.context("../../imgs/zzy", false, /\.(png|jpe?g|svg|webp)$/)
);

const Waterfall = () => {
  const waterfallRef = useRef(null);
  const imgWidth = 220;
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [columnHeights, setColumnHeights] = useState([]);
  const [columnInfo, setColumnInfo] = useState(null);

  useEffect(() => {
    getColumnInfo();
    window.addEventListener("resize", getColumnInfo);
    return () => {
      window.removeEventListener("resize", getColumnInfo);
    };
  }, []);

  useEffect(() => {
    if (imagesLoaded === images.length) {
      layout();
    }
  }, [imagesLoaded, columnInfo]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const getColumnInfo = () => {
    const waterfall = waterfallRef.current;
    if (!waterfall) return;

    let waterfallWidth = waterfall.offsetWidth;
    let column = Math.floor(waterfallWidth / imgWidth);
    let gapCount = Math.max(column - 1, 1);
    let freeSpace = waterfallWidth - imgWidth * column;
    let gap = Math.max(freeSpace / gapCount, 10); // 确保最小间距

    setColumnInfo({ gap, column });
    setColumnHeights(new Array(column).fill(0));
  };

  const layout = () => {
    if (!columnInfo || !waterfallRef.current) return;

    const boxes = Array.from(waterfallRef.current.children);
    let newColumnHeights = [...columnHeights];

    boxes.forEach((box) => {
      const minHeight = Math.min(...newColumnHeights);
      const columnIndex = newColumnHeights.indexOf(minHeight);

      box.style.position = "absolute";
      box.style.left = `${columnIndex * (imgWidth + columnInfo.gap)}px`;
      box.style.top = `${minHeight + 20}px`; // 添加固定上边距

      const boxHeight = box.offsetHeight;
      newColumnHeights[columnIndex] += boxHeight + 20; // 添加固定间距
    });

    // 设置容器高度
    const maxHeight = Math.max(...newColumnHeights);
    waterfallRef.current.style.height = `${maxHeight + 20}px`;

    setColumnHeights(newColumnHeights);
  };

  return (
    <div className="waterfall" ref={waterfallRef}>
      {images.map((img, idx) => (
        <div className="box" key={idx}>
          <img src={img} alt={`img ${idx + 1}`} onLoad={handleImageLoad} />
        </div>
      ))}
    </div>
  );
};

export default Waterfall;
