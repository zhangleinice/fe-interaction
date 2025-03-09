import React, { useEffect, useState, useRef, useCallback } from "react";
import "./index.less";
// 导入图片的辅助函数
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};

// 导入图片
const images = importAll(
  require.context("../../imgs/bigpic", false, /\.(png|jpe?g|svg|webp)$/)
);

interface VirtualListProps {
  listData?: any[];
  itemSize?: number;
  containerHeight?: number;
  bufferSize?: number; // 缓冲区大小，提前渲染的项目数量
}

const VirtualList: React.FC<VirtualListProps> = ({
  listData = images,
  itemSize = 400,
  containerHeight = 800,
  bufferSize = 2
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(0);
  const [visibleData, setVisibleData] = useState<any[]>([]);

  // 计算可见项目
  const calculateVisibleItems = useCallback(() => {
    if (!listRef.current) return;
    
    const scrollTop = listRef.current.scrollTop;
    const newStart = Math.max(0, Math.floor(scrollTop / itemSize) - bufferSize);
    const visibleCount = Math.ceil(containerHeight / itemSize) + 2 * bufferSize;
    const end = Math.min(newStart + visibleCount, listData.length);
    
    setStart(newStart);
    setVisibleData(listData.slice(newStart, end));
  }, [listData, itemSize, containerHeight, bufferSize]);

  // 滚动处理
  const handleScroll = useCallback(() => {
    requestAnimationFrame(calculateVisibleItems);
  }, [calculateVisibleItems]);

  // 初始化
  useEffect(() => {
    calculateVisibleItems();
  }, [calculateVisibleItems, listData]);

  return (
    <div
      ref={listRef}
      className="virtual-list-container"
      style={{ height: containerHeight, overflowY: "auto" }}
      onScroll={handleScroll}
    >
      <div
        className="virtual-list-phantom"
        style={{ height: `${listData.length * itemSize}px` }}
      />
      <div
        className="virtual-list"
        style={{ transform: `translateY(${start * itemSize}px)` }}
      >
        {visibleData.map((img, index) => (
          <div
            key={start + index}
            className="virtual-list-item"
            style={{
              height: itemSize,
              lineHeight: `${itemSize}px`,
            }}
          >
            <img
              src={img}
              alt={`img ${start + index + 1}`}
              className="virtual-list-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList; 