import { useEffect, useMemo, useState } from "react";

const KEY = "pd_cart";

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(v) { localStorage.setItem(KEY, JSON.stringify(v)); }

export function useCart() {
  const [items, setItems] = useState(() => read());

  useEffect(() => { write(items); }, [items]);

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);

  function add(pkg, qty = 1) {
    setItems(prev => {
      const found = prev.find(x => x.packageId === pkg.id);
      if (found) return prev.map(x => x.packageId === pkg.id ? { ...x, qty: x.qty + qty } : x);
      return [...prev, { packageId: pkg.id, name: pkg.name, price: pkg.price, qty }];
    });
  }

  function inc(packageId) { setItems(prev => prev.map(x => x.packageId === packageId ? { ...x, qty: x.qty + 1 } : x)); }
  function dec(packageId) { setItems(prev => prev.map(x => x.packageId === packageId ? { ...x, qty: x.qty - 1 } : x).filter(x => x.qty > 0)); }
  function remove(packageId) { setItems(prev => prev.filter(x => x.packageId !== packageId)); }
  function clear() { setItems([]); }

  return { items, count, total, add, inc, dec, remove, clear };
}
