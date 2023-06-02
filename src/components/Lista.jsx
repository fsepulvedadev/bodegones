import { useBodegonesStore } from "../store/bodegonesStore";
import { shallow } from "zustand/shallow";
import foto from "../assets/los-bohemios.jpg";
import { IoLocationSharp, IoNavigateSharp, IoCallSharp } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { useEffect } from "react";
import Buscador from "./Buscador";
import { useBusquedaStore } from "../store/busquedaStore";

const Lista = () => {
  const { bodegones, allBodegones, setBodegones } = useBodegonesStore(
    (state) => ({
      bodegones: state.bodegones,
      allBodegones: state.allBodegones,
      setBodegones: state.setBodegones,
    }),
    shallow
  );
  const handleIr = (nombre) => {
    nombre = nombre.split(" ").join("%20");
    return nombre;
  };

  const { busqueda } = useBusquedaStore((state) => ({
    busqueda: state.busqueda,
  }));
  const { getAllBodegones } = useBodegonesStore();
  const { setUbiObjetivo } = useBodegonesStore();

  useEffect(() => {
    getAllBodegones();
    if (!busqueda) {
      setBodegones(allBodegones);
    }
  }, [busqueda]);

  return (
    <div className="mt-2 border-2 border-red-600 bg-slate-100">
      <Buscador />

      <div className="grid grid-cols-2 gap-2 p-2 overflow-auto text-base lg:grid-cols-4 md:grid-cols-3 place-items-center h-2/4 min-h-[20vh]">
        {bodegones?.map((bodegon) => (
          <div
            key={bodegon.id}
            className="card  bg-slate-200 shadow-xl border-2 border-red-600 hover:border-info transform duration-500 h-[500px]"
          >
            <figure className="">
              {bodegon.website && (
                <a
                  href={`https://${bodegon.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TbWorldWww className="absolute text-2xl text-red-600 rounded-full cursor-pointer bottom-2 right-2 drop-shadow-2xl hover:text-info" />
                </a>
              )}
              <img src={foto} alt="Album" className="" />
            </figure>
            <div className="flex flex-col justify-between p-2 card-body md:p-6">
              <h2 className="font-semibold text-center text-black card-title">
                {bodegon.nombre}
              </h2>
              <div className="flex flex-col items-center ">
                <p className="mt-4 italic">{`"${bodegon.descripcion}"`}</p>

                <div className="flex flex-col gap-2 my-4 ">
                  <p className="flex items-center gap-2 ">
                    <IoLocationSharp className="inline w-6 text-lg" />{" "}
                    <span className="text-xs">{bodegon.direccion}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <IoCallSharp className="inline w-6" />

                    <span className="text-xs font-bold">
                      {bodegon.telefono}
                    </span>
                  </p>
                </div>
              </div>

              <div className="gap-2 badge badge-info">{bodegon.barrio}</div>
              <div className="flex justify-center gap-2 mt-4 ">
                <button
                  onClick={() => setUbiObjetivo(bodegon.ubicacion)}
                  className="gap-2 text-red-500 border-red-500 btn btn-sm btn-outline hover:bg-red-500 hover:text-slate-100 hover:border-red-500 "
                >
                  Ubicar
                  <MdOutlineMyLocation />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir//${handleIr(
                        bodegon.nombre
                      )}`
                    )
                  }
                  className="gap-2 text-red-500 border-red-500 btn btn-sm btn-outline hover:bg-red-500 hover:text-slate-100 hover:border-red-500 "
                >
                  Ir
                  <IoNavigateSharp />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
