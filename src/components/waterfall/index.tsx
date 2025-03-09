// 瀑布流
import React, { useState, useEffect, useRef } from 'react';
import './index.less';

interface WaterfallProps {
    images: string[];
    columns?: number;
    gutter?: number;
}

const Waterfall: React.FC<WaterfallProps> = ({ images, columns = 3, gutter = 10 }) => {
    const [columns, setColumns] = useState(3);
    const [gutter, setGutter] = useState(10);
    const [columnWidth, setColumnWidth] = useState(0);
    const [items, setItems] = useState<{ id: string; width: number; height: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleResize = () => {
            const containerWidth = containerRef.current?.clientWidth || 0;
            const newColumns = Math.max(1, Math.floor(containerWidth / 300));
            setColumns(newColumns);

            const newColumnWidth = (containerWidth - (newColumns - 1) * gutter) / newColumns;
            setColumnWidth(newColumnWidth);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const newItems = Array.from({ length: 20 }, (_, index) => ({
            id: index.toString(),
            width: Math.floor(Math.random() * 200) + 100,
            height: Math.floor(Math.random() * 200) + 100,
        }))
    }, [columns, gutter, columnWidth]);

    return (
        <div className="waterfall-container" ref={containerRef}>
            <div className="waterfall-wrapper">
                {items.map((item) => (
                    <div key={item.id} className="waterfall-item" style={{ width: `${item.width}px`, height: `${item.height}px` }}>
                        <img src={item.src} alt={`waterfall-${item.id}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Waterfall;