import React from "react";
import { render } from "react-dom";
import { CANNED_RESPONSE } from "./canned.js";

class Welcome extends React.Component {
  render() {
    const photos = CANNED_RESPONSE.photos.map(d => {
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
        {photos.map(p => (
          <a href={p.url} key={p.url} target="photo">
            <img src={p.src} alt={p.alt} />
          </a>
        ))}
      </>
    );
  }
}

render(<Welcome />, document.getElementById("app"));
