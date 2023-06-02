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
    if (!busqueda) {
      setBodegones(allBodegones);
    }
  }, [allBodegones]);

  useEffect(() => {
    getAllBodegones();
    console.log(allBodegones);
    if (busqueda.length === 0) {
      setBodegones(allBodegones);
    }
  }, [busqueda]);

  return (
    <div className="border-2 border-red-600 bg-slate-100 md:h-[80vh]">
      <Buscador />

      <div className="hidden gap-2 p-2 overflow-auto text-base h-[70vh] md:grid  lg:grid-cols-2 md:grid-cols-2 place-items-center">
        {bodegones?.map((bodegon) => (
          <div
            key={bodegon._id}
            onClick={() => setUbiObjetivo(bodegon.ubicacion)}
            className="duration-500 transform border-2 border-red-600 shadow-2xl card bg-slate-200 hover:border-info md:h-[50vh] cursor-pointer"
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
              <div className="flex justify-start gap-2 mt-4 ">
                {/*     <button
                  onClick={() => setUbiObjetivo(bodegon.ubicacion)}
                  className="gap-2 text-red-500 border-red-500 btn btn-sm btn-outline hover:bg-red-500 hover:text-slate-100 hover:border-red-500 "
                >
                  Ubicar
                  <MdOutlineMyLocation />
                </button> */}
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
      <div className="grid gap-4 p-2 overflow-auto text-base md:hidden place-items-center h-[36vh]">
        {bodegones?.map((bodegon) => (
          <div
            key={bodegon._id}
            onClick={() => setUbiObjetivo(bodegon.ubicacion)}
            className="duration-500 transform border-2 border-red-600 shadow-2xl cursor-pointer card bg-slate-200 hover:border-info h-[16vh] w-11/12"
          >
            <div className="flex flex-col justify-between p-2 text-xs card-body md:p-6 h-[180px] my-1">
              <h2 className="font-semibold text-center text-black ">
                {bodegon.nombre}
              </h2>
              <div className="flex flex-col items-center">
                <p className="italic ">{`"${bodegon.descripcion}"`}</p>

                <div className="flex flex-col gap-2 mt-1">
                  <p className="flex items-center gap-2 ">
                    <IoLocationSharp className="inline w-6 " />{" "}
                    <span className="">{bodegon.direccion}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <IoCallSharp className="inline w-6" />

                    <p className="text-xs font-bold">{bodegon.telefono}</p>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 ">
                <div className="gap-2 mb-2 text-xs text-clip badge badge-info">
                  {bodegon.barrio}
                </div>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir//${handleIr(
                        bodegon.nombre
                      )}`
                    )
                  }
                  className="absolute gap-2 bg-red-600 border-red-600 text-slate-100 text-shite -bottom-2 -right-2 btn btn-sm hover:bg-red-500 hover:text-slate-100 hover:border-red-500 "
                >
                  <IoNavigateSharp className="text-xs" />
                </button>
                <a
                  href={`tel:${bodegon.telefono}`}
                  className="absolute gap-2 bg-red-600 border-red-600 text-slate-100 text-shite -bottom-2 right-9 btn btn-sm hover:bg-red-500 hover:text-slate-100 hover:border-red-500 "
                >
                  <IoCallSharp className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
