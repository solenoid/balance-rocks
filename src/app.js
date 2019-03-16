import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { CANNED_RESPONSE } from "./canned.js";

const App = () => {
  const [_, forceUpdate] = useState();
  const [colWidth, setColWidth] = useState(0);
  const [howMany, setHowMany] = useState(9);
  useEffect(() => {
    // NOTE 20 px and 3 columns should be coordinated with css setup
    setColWidth(Math.floor((window.innerWidth - 20) / 3));
  });
  useEffect(() => {
    // TODO consider debouncing the resize
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  });
  // take the off the wire API and prepare it for just what's needed to render
  const photos = CANNED_RESPONSE.photos.slice(0, howMany).map(d => {
    // TODO stop assuming url structure that seems to happen in practice
    const urlParts = d.url.split("/");
    const nameParts = urlParts[urlParts.length - 2].split("-");
    // remove the number part of the name
    nameParts.pop();
    console.log();
    return {
      url: d.url,
      scaledHeight: (colWidth * d.height) / d.width,
      // TODO figure out if we want to have width be hardcoded here or more dynamic
      src: d.src.original + "?auto=compress&cs=tinysrgb&w=420",
      alt: nameParts.join(" ") + " by " + d.photographer,
    };
  });
  // organize photos into a masonry layout based on varying heights
  const [[c1, c2, c3]] = photos.reduce(
    (memo, cur) => {
      let [[c1, c2, c3], [h1, h2, h3]] = memo;
      const csh = 0.8 * cur.scaledHeight;
      const additionalHeight = cur.scaledHeight + 5;
      if (h1 < h2 + csh && h1 < h3 + csh) {
        c1.push(cur);
        h1 += additionalHeight;
      } else if (h2 < h3 + csh) {
        c2.push(cur);
        h2 += additionalHeight;
      } else {
        c3.push(cur);
        h3 += additionalHeight;
      }
      return [[c1, c2, c3], [h1, h2, h3]];
    },
    [[[], [], []], [0, 0, 0]],
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
        <div id="col-1">
          {c1.map(p => (
            <a href={p.url} key={p.url} target="photo">
              <img src={p.src} alt={p.alt} style={{ width: colWidth }} />
            </a>
          ))}
        </div>
        <div id="col-2">
          {c2.map(p => (
            <a href={p.url} key={p.url} target="photo">
              <img src={p.src} alt={p.alt} style={{ width: colWidth }} />
            </a>
          ))}
        </div>
        <div id="col-3">
          {c3.map(p => (
            <a href={p.url} key={p.url} target="photo">
              <img src={p.src} alt={p.alt} style={{ width: colWidth }} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default hot(App);
