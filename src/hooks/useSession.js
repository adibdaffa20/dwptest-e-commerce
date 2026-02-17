const KEY = "pd_customer_session";

export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function setSession(v) { localStorage.setItem(KEY, JSON.stringify(v)); }
export function clearSession() { localStorage.removeItem(KEY); }
