import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useBodegonesStore } from "../store/bodegonesStore";

const FuncionesDeMapa = () => {
  const { ubiObjetivo } = useBodegonesStore();
  const map = useMap();

  useEffect(() => {
    if (ubiObjetivo) {
      map.flyTo(ubiObjetivo, 17);
      window.scrollTo(0, 0);
    }
  }, [ubiObjetivo]);
  return <div id="anclaDeMapa">FuncionesDeMapa</div>;
};

export default FuncionesDeMapa;
