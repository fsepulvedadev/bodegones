import { create } from "zustand";
import { useBodegonesStore } from "./bodegonesStore";

const { setBodegones } = useBodegonesStore.getState();

export const useBusquedaStore = create((set) => ({
  busqueda: "",
  setBusqueda: (busqueda) => set({ busqueda }),
  getBusqueda: (busqueda) => {
    const bodegones = useBodegonesStore.getState().allBodegones;

    const target = bodegones.filter((bodegon) => {
      return bodegon.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    setBodegones(target);
  },
}));
