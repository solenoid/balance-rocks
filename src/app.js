import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { debounce } from "debounce";
import { CANNED_RESPONSE } from "./canned.js";

// see: https://usehooks.com/useMedia/ for commented version of this code
const useMedia = (queries, values, defaultValue) => {
  const mediaQueryLists = queries.map(q => window.matchMedia(q));
  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  };
  const [value, setValue] = useState(getValue);
  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, []);
  return value;
};

const App = () => {
  const [_, forceUpdate] = useState();
  const debouncedUpdate = debounce(forceUpdate, 16);
  const [colWidth, setColWidth] = useState(0);
  const [howMany, setHowMany] = useState(9);
  const columnCount = useMedia(
    // NOTE: walk down from largest to smallest and use min-with so first match works
    ["(min-width: 1280px)", "(min-width: 600px)", "(min-width: 0px)"],
    [4, 3, 2],
    3,
  );
  // NOTE: keep 5 in coordination with css grid values
  const GRID_ROW_GAP = 5;
  useEffect(() => {
    setColWidth(
      Math.floor((window.innerWidth - (columnCount + 1) * GRID_ROW_GAP) / columnCount),
    );
  });
  useEffect(() => {
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);
  // take the off the wire API and prepare it for just what's needed to render
  const photos = CANNED_RESPONSE.photos.slice(0, howMany).map((d, index) => {
    // TODO stop assuming url structure that seems to happen in practice
    const urlParts = d.url.split("/");
    const nameParts = urlParts[urlParts.length - 2].split("-");
    // remove the number part of the name
    nameParts.pop();
    return {
      url: d.url,
      index: index + 1,
      scaledHeight: (colWidth * d.height) / d.width,
      // TODO figure out if we want to have width be hardcoded here or more dynamic
      src: d.src.original + "?auto=compress&cs=tinysrgb&w=420",
      alt: nameParts.join(" ") + " by " + d.photographer,
    };
  });

  // organize photos into a masonry layout based on varying heights
  // TODO turn this into a well tested function if we stick with this layout approach
  const initialCols = new Array(columnCount).fill().map(() => []);
  const initialHeights = new Array(columnCount).fill(0);
  const [cols] = photos.reduce(
    (memo, cur) => {
      let [cols, heights] = memo;
      const adjustedHeight = 0.5 * cur.scaledHeight;
      const additionalHeight = cur.scaledHeight + GRID_ROW_GAP;
      const colIndex = heights
        .map((h, i, list) =>
          list
            .slice(i + 1)
            .map(d => d + adjustedHeight)
            .every(d => h <= d),
        )
        .findIndex(d => d);
      cols[colIndex].push(cur);
      heights[colIndex] += additionalHeight;
      return [cols, heights];
    },
    [initialCols, initialHeights],
  );

  return (
    <>
      <h1>Solen Dev Balance Rocks</h1>
      <div className="flippers">
        <button disabled={howMany < 1} onClick={() => setHowMany(howMany - 1)}>
          &lsaquo;
        </button>
        <span>{howMany}</span>
        <button disabled={howMany > 11} onClick={() => setHowMany(howMany + 1)}>
          &rsaquo;
        </button>
      </div>
      <div className="masonry">
        {cols.map((col, i) => {
          return (
            <div id={`col-${i}`} key={i}>
              {col.map(p => (
                <a href={p.url} key={p.url} target="photo">
                  <span>{p.index}</span>
                  <img src={p.src} alt={p.alt} style={{ width: colWidth }} />
                </a>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default hot(App);
