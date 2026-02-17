import { http } from "./http";

export const transactionsApi = {
  byCustomer: (customerId) =>
    http.get(`/transactions?customerId=${customerId}&_sort=createdAt&_order=desc`).then(r => r.data),
  create: (payload) => http.post("/transactions", payload).then(r => r.data),
};
