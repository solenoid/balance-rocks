const showIt = r => {
  const container = document.createElement("div");
  // TODO bail on error coming back and don't assume photos array
  container.innerHTML = r.photos
    .map(photo => {
      return `<a href="${photo.url}" target="photo">
        <img src="${photo.src.tiny}"/>
      </a>`;
    })
    .join("<br>");
  document.body.appendChild(container);
};

const LIVE_API = false;
if (LIVE_API) {
  // TODO consider reading and respecting rate limiting response headers
  fetch("https://api.pexels.com/v1/search?query=balance+rocks&per_page=10", {
    headers: { Authorization: "TBD how to do this safely or if it even matters" },
  })
    .then(r => r.json())
    .then(showIt)
    .catch(e => {
      console.error(e);
    });
} else {
  showIt(window.CANNED_RESPONSE);
}
