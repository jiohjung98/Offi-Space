/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useMemo, useState } from "react";

interface WheelPickerProps {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  containerHeight?: number;
  containerWidth?: number;
  itemHeight?: number;
}

const DatePickerWheel: React.FC<WheelPickerProps> = ({
  items,
  value,
  onChange,
  containerHeight = 150,
  containerWidth = 40,
  itemHeight = 50,
}) => {
  const itemsContRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const itemsMap = useMemo(
    () =>
      items.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map<string, number>()
      ),
    [items]
  );

  const currentValue = useRef(itemsMap.get(value) ?? 0);

  useEffect(() => {
    let lastScrollTime = Date.now();

    function handleScroll(event: Event) {
      const now = Date.now();
      if (now - lastScrollTime < 100 || isScrolling) {
        return;
      }

      setIsScrolling(true);
      requestAnimationFrame(() => {
        const scrollTop = Math.max(
          (event.target as HTMLUListElement).scrollTop,
          0
        );
        const selectedIndex = Math.min(
          Math.floor(scrollTop / itemHeight),
          items.length - 1
        );
        currentValue.current = selectedIndex;
        itemRefs.current[selectedIndex]?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });

        onChange(items[selectedIndex].value);
        setIsScrolling(false);
        lastScrollTime = now;
      });
    }

    const container = itemsContRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [onChange, items, itemHeight, isScrolling]);

  useEffect(() => {
    const selectedIndex = itemsMap.get(value) ?? 0;
    currentValue.current = selectedIndex;
    itemRefs.current[selectedIndex]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [value, itemsMap]);

  return (
    <div className="container mx-auto" style={{ height: `${containerHeight}px`, width: `${containerWidth}%` }}>
      <ul className="items" ref={itemsContRef}>
        {items.map((item, index) => (
          <li
            key={item.value}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="item"
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatePickerWheel;
