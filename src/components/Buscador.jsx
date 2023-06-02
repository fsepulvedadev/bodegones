import { IoSearchSharp } from "react-icons/io5";
import { useBusquedaStore } from "../store/busquedaStore";
import { shallow } from "zustand/shallow";

const Buscador = () => {
  const { busqueda, setBusqueda, getBusqueda } = useBusquedaStore(
    (state) => ({
      busqueda: state.busqueda,
      setBusqueda: state.setBusqueda,
      getBusqueda: state.getBusqueda,
    }),
    shallow
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex items-center justify-center w-full gap-2 p-2"
      >
        <input
          onChange={(e) => {
            setBusqueda(e.target.value);

            if (busqueda.length >= 2) {
              getBusqueda(busqueda);
            }
            console.log(busqueda);
          }}
          type="text"
          placeholder="Ingresa el nombre del bodegón"
          className="w-full max-w-xs border-2 border-red-600 input input-bordered bg-slate-100"
        />
        <div className="text-red-600 rounded pattern-checks-md bg-slate-100">
          <button
            type="submit"
            className="p-3 bg-red-600 border-none rounded shadow-xl hover:bg-red-700"
          >
            <IoSearchSharp className="text-xl text-white " />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buscador;
