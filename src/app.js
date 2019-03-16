import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import { CANNED_RESPONSE } from "./canned.js";

const App = () => {
  const [howMany, setHowMany] = useState(8);
  const photos = CANNED_RESPONSE.photos.slice(0, howMany).map(d => {
    // TODO stop assuming url structure that seems to happen in practice
    const urlParts = d.url.split("/");
    const nameParts = urlParts[urlParts.length - 2].split("-");
    // remove the number part of the name
    nameParts.pop();
    return {
      url: d.url,
      src: d.src.tiny, // .original + "?auto=compress&cs=tinysrgb&w=200",
      alt: nameParts.join(" ") + " by " + d.photographer,
    };
  });
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
      {photos.map(p => (
        <a href={p.url} key={p.url} target="photo">
          <img src={p.src} alt={p.alt} />
        </a>
      ))}
    </>
  );
};

export default hot(App);