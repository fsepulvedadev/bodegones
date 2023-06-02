import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import azul from "./assets/png/azul.png";
import purpura from "./assets/png/purpura.png";
import rosa from "./assets/png/rosa.png";

import FuncionesDeMapa from "./components/FuncionesDeMapa.jsx";
import Navbar from "./components/Navbar";
import Lista from "./components/Lista";
import { useBodegonesStore } from "./store/bodegonesStore";

function App() {
  const { bodegones } = useBodegonesStore((state) => ({
    bodegones: state.bodegones,
  }));

  let anchor = [-18, -26];

  let iconoAzul = new Icon({
    iconUrl: azul,
    iconSize: [38, 38],
    iconAnchor: [38, 38],
    popupAnchor: anchor,
  });
  let iconoPurpura = new Icon({
    iconUrl: purpura,
    iconSize: [38, 38],
    iconAnchor: [38, 38],
    popupAnchor: anchor,
  });
  let iconoRosa = new Icon({
    iconUrl: rosa,
    iconSize: [38, 38],
    iconAnchor: [38, 38],
    popupAnchor: anchor,
  });

  const randomIcon = () => {
    let iconos = [iconoAzul, iconoPurpura, iconoRosa];
    return iconos[Math.floor(Math.random() * iconos.length)];
  };

  return (
    <div className="pb-4 text-red-600 md:h-screen pattern-checks-md bg-slate-100">
      <div className="p-2 mx-auto lg:w-12/12">
        <Navbar />
        <div className="flex flex-col-reverse gap-2 md:grid md:grid-cols-2">
          <MapContainer
            maxBounds={[
              [-34.763419814328486, -58.2114779737599],
              [-34.51484440985933, -58.78225600157626],
            ]}
            maxBoundsViscosity={0.5}
            id="map"
            center={[-34.63007387287545, -58.41834]}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FuncionesDeMapa />

            {bodegones?.map((bodegon) => (
              <Marker
                icon={randomIcon()}
                key={bodegon.id}
                position={bodegon.ubicacion}
              >
                <Popup key={bodegon.id}>
                  {bodegon.nombre}
                  <br />
                  {bodegon.direccion}
                  <br />

                  {bodegon.barrio}
                  <br />
                  {bodegon.descripcion}
                  <br />
                  {bodegon.telefono}
                  <br />
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <Lista />
        </div>
      </div>
    </div>
  );
}

export default App;
