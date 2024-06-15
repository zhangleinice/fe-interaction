/**
 *
 * 瀑布流
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

  const [columnHeights, setColumnHeights] = useState([]);

  const [columnInfo, setColumnInfo] = useState(null);

  //   resize不生效
  useEffect(() => {
    getColumnInfo();
    window.addEventListener("resize", getColumnInfo);
    return () => {
      window.removeEventListener("resize", getColumnInfo);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("load", layout);

    return () => {
      window.removeEventListener("load", layout);
    };
  }, [columnInfo]);

  const getColumnInfo = () => {
    const waterfall = waterfallRef.current;

    let waterfallWidth = waterfall.offsetWidth;

    let column = Math.floor(waterfallWidth / imgWidth);
    let gapCount = column - 1;
    let freeSpace = waterfallWidth - imgWidth * column;
    let gap = freeSpace / gapCount;
    setColumnInfo({ gap: gap, column: column });
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
      box.style.top = `${minHeight + columnInfo.gap}px`;

      newColumnHeights[columnIndex] += box.offsetHeight + columnInfo.gap / 2; // 更新列高度
    });

    setColumnHeights(newColumnHeights);
  };

  return (
    <div className="waterfall" ref={waterfallRef}>
      {images.map((img, idx) => (
        <div className="box" key={idx}>
          <img src={img} alt={`img ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Waterfall;
