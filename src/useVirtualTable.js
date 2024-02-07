import { useRef, useEffect, useState, useMemo } from 'react';

// A custom hook that calculates the visible rows and columns for a table
export default function useVirtualTable(data, columns, rowHeight, columnWidth) {
  // A ref to the table element
  const tableRef = useRef(null);

  // The state for the scroll position
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  // The state for the container size
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // A function that updates the scroll position
  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollLeft, scrollTop } = tableRef.current;
      setScrollPosition({ x: scrollLeft, y: scrollTop });
    }
  };

  // A function that updates the container size
  const handleResize = () => {
    if (tableRef.current) {
      const { clientWidth, clientHeight } = tableRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }
  };

  // Add event listeners for scroll and resize events
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Calculate the visible rows and columns based on the scroll position and the container size
  const visibleRowsAndColumns = useMemo(() => {
    // The number of rows and columns in the data
    const rowCount = data.length;
    const columnCount = columns.length;

    // The index of the first and last visible row
    const firstRowIndex = Math.floor(scrollPosition.y / rowHeight);
    const lastRowIndex = Math.min(
      rowCount - 1,
      Math.floor((scrollPosition.y + containerSize.height) / rowHeight)
    );

    // The index of the first and last visible column
    const firstColumnIndex = Math.floor(scrollPosition.x / columnWidth);
    const lastColumnIndex = Math.min(
      columnCount - 1,
      Math.floor((scrollPosition.x + containerSize.width) / columnWidth)
    );

    // The visible rows and columns
    const visibleRows = data.slice(firstRowIndex, lastRowIndex + 1);
    const visibleColumns = columns.slice(firstColumnIndex, lastColumnIndex + 1);

    return { visibleRows, visibleColumns };
  }, [data, columns, rowHeight, columnWidth, scrollPosition, containerSize]);

  // Return the table ref and the visible rows and columns
  return { tableRef, ...visibleRowsAndColumns };
}
