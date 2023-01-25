export function addTileLayer(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  tileSize: 512,
  zoomOffset: -1,
  attribution: 'Challenge by < href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</>.Coded by <a href="#">Stanislav Starodub</a>.'
}).addTo(map);
}