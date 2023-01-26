import { addTileLayer, addOffset, getAddress, validateIp } from './helpers/index.js';
 const icon = '../images/icon-location.svg';
const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
const latInit = 50.908148, lngInit = 34.79907;
const sizePopupText = '14px';

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);


const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const iconPath = L.icon({
  iconUrl: "../leaflet/images/marker-icon.png",
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea).setView([latInit, lngInit], 13);

addTileLayer(map);

 function getData() {
  if (validateIp(ipInput.value)) {

    getAddress(ipInput.value)
    .then(setInfo)
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

let popup = L.popup();

function onMapClick(e) {

  popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at <br />" + e.latlng.toString())
    .openOn(map);
  popup.setContent()._wrapper.style.fontSize = sizePopupText;
  let latlng = e.latlng;
  L.marker([e.latlng.lat, e.latlng.lng], { icon:  iconPath}).addTo(map)

}

  map.on('click', onMapClick);

let marker = L.marker([latInit, lngInit], { icon: markerIcon }).addTo(map).bindPopup("It's my native city - Sumy!").openPopup();
marker._popup._wrapper.style.fontSize = sizePopupText;

function setInfo(mapData) {
  const {lat, lng, country, region, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ', ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;
  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map)
  }
}



