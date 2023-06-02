import { create } from "zustand";

export const useBodegonesStore = create((set) => ({
  bodegones: [],
  setBodegones: (bodegones) => set({ bodegones }),
  allBodegones: [],
  getAllBodegones: async () => {
    const res = await fetch("https://api-bodegones.vercel.app/bodegones");
    const nuevosBodegones = await res.json();
    nuevosBodegones.forEach((bodegon) => {
      if (typeof bodegon.ubicacion === "string") {
        bodegon.ubicacion = bodegon.ubicacion
          .split(",")
          .map((e) => parseFloat(e));
      }
    });

    set((state) => ({ ...state, allBodegones: nuevosBodegones }));
    /*  set((state) => ({ ...state, bodegones: nuevosBodegones })); */
  },
  ubiObjetivo: null,
  setUbiObjetivo: (ubiObjetivo) => set({ ubiObjetivo }),
}));
