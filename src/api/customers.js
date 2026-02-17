import { http } from "./http";
export const customersApi = {
  get: (id) => http.get(`/customers/${id}`).then(r => r.data),
  update: (id, payload) => http.patch(`/customers/${id}`, payload).then(r => r.data),
};
