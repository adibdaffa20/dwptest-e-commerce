import { http } from "./http";

export const packagesApi = {
  listActive: async () => {
    const res = await http.get("/packages"); // ambil mentah tanpa query/filter
    const data = Array.isArray(res.data) ? res.data : [];

    // DEBUG: lihat data mentah dari API
    console.log("API /packages raw:", data);

    // anggap aktif jika isActive tidak ada, atau true/"true"/1
    const active = data.filter((p) => {
      const v = p?.isActive;
      if (v === undefined || v === null) return true;
      if (v === true) return true;
      if (v === false) return false;
      if (String(v).toLowerCase() === "true") return true;
      if (Number(v) === 1) return true;
      return false;
    });

    // sort by price asc (safe)
    active.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));

    console.log("API /packages active:", active);
    return active;
  },
};
