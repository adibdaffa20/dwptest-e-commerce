import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions";
import { customersApi } from "../api/customers";
import { getSession } from "../hooks/useSession";
import { useCart } from "../hooks/useCart";
import {
  Box, Button, Card, CardContent, Chip, Divider,
  MenuItem, Snackbar, Alert, Stack, TextField, Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PaymentIcon from "@mui/icons-material/Payment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BoltIcon from "@mui/icons-material/Bolt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WifiIcon from "@mui/icons-material/Wifi";

function money(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(n || 0);
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    fontSize: "0.9rem",
    bgcolor: "white",
    transition: "all 0.2s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f48fb1" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e91e8c", borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
  "& .MuiFormHelperText-root": { fontSize: "0.75rem" },
};

/* ─── cart item row ─── */
function CartItem({ it, onInc, onDec, onRemove }) {
  return (
    <Box sx={{
      p: 2, borderRadius: 2.5,
      border: "1px solid #fce4ec",
      bgcolor: "white",
      transition: "all 0.2s ease",
      "&:hover": { boxShadow: "0 4px 14px rgba(233,30,140,0.08)", borderColor: "#f48fb1" },
    }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1.5}>
        {/* icon + nama */}
        <Stack direction="row" gap={1.25} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: 2, flexShrink: 0,
            background: "linear-gradient(135deg, #e91e8c, #c2185b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px rgba(233,30,140,0.25)",
          }}>
            <WifiIcon sx={{ fontSize: 18, color: "white" }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={800} fontSize="0.9rem" color="#2d3748" noWrap>
              {it.name}
            </Typography>
            <Typography fontSize="0.75rem" color="#a0aec0">
              {money(it.price)} / paket
            </Typography>
          </Box>
        </Stack>

        {/* subtotal */}
        <Typography fontWeight={900} fontSize="0.95rem" flexShrink={0} sx={{
          background: "linear-gradient(135deg, #e91e8c, #c2185b)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {money(it.price * it.qty)}
        </Typography>
      </Stack>

      {/* qty + remove */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5}>
        {/* qty stepper */}
        <Box sx={{
          display: "flex", alignItems: "center",
          border: "1px solid #fce4ec", borderRadius: 2,
          overflow: "hidden", bgcolor: "#fff5f9",
        }}>
          <Box component="button" onClick={onDec} sx={{
            width: 32, height: 32, border: "none", cursor: "pointer",
            bgcolor: "transparent", color: "#e91e8c",
            display: "flex", alignItems: "center", justifyContent: "center",
            "&:hover": { bgcolor: "rgba(233,30,140,0.08)" },
            transition: "background 0.2s",
          }}>
            <RemoveIcon sx={{ fontSize: 14 }} />
          </Box>
          <Typography sx={{
            px: 1.5, minWidth: 32, textAlign: "center",
            fontWeight: 800, fontSize: "0.875rem", color: "#2d3748",
          }}>
            {it.qty}
          </Typography>
          <Box component="button" onClick={onInc} sx={{
            width: 32, height: 32, border: "none", cursor: "pointer",
            bgcolor: "transparent", color: "#e91e8c",
            display: "flex", alignItems: "center", justifyContent: "center",
            "&:hover": { bgcolor: "rgba(233,30,140,0.08)" },
            transition: "background 0.2s",
          }}>
            <AddIcon sx={{ fontSize: 14 }} />
          </Box>
        </Box>

        {/* remove */}
        <Button
          size="small" onClick={onRemove} startIcon={<DeleteOutlineIcon sx={{ fontSize: "15px !important" }} />}
          sx={{
            color: "#f87171", fontWeight: 600, textTransform: "none",
            fontSize: "0.78rem", borderRadius: 2,
            border: "1px solid #fecaca",
            "&:hover": { bgcolor: "#fff5f5", borderColor: "#f87171" },
          }}
        >
          Hapus
        </Button>
      </Stack>
    </Box>
  );
}

/* ══════════════════════════════════ */
export default function CheckoutPage() {
  const qc = useQueryClient();
  const session = getSession();
  const customerId = session?.user?.customerId;

  const { items, total, inc, dec, remove, clear, count } = useCart();
  const [msisdn, setMsisdn] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const { data: customer } = useQuery({
    queryKey: ["customerMe", customerId],
    queryFn: () => customersApi.get(customerId),
    enabled: !!customerId,
  });

  const effectiveMsisdn = useMemo(
    () => msisdn.trim() || customer?.phone || "",
    [msisdn, customer?.phone]
  );

  const createMut = useMutation({
    mutationFn: transactionsApi.create,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["myTransactions", customerId] });
      setToast({ open: true, msg: "Checkout sukses! Transaksi berhasil dibuat.", type: "success" });
      clear();
    },
    onError: (e) =>
      setToast({ open: true, msg: e?.message || "Checkout gagal.", type: "error" }),
  });

  function checkout() {
    if (!customerId)      return setToast({ open: true, msg: "Session tidak valid.", type: "error" });
    if (items.length === 0) return setToast({ open: true, msg: "Cart masih kosong.", type: "error" });
    if (!effectiveMsisdn) return setToast({ open: true, msg: "Nomor tujuan wajib diisi.", type: "error" });

    createMut.mutate({
      customerId,
      msisdn: effectiveMsisdn,
      paymentMethod,
      status: "PAID",
      total,
      createdAt: new Date().toISOString(),
      items: items.map((x) => ({
        packageId: x.packageId, name: x.name, price: x.price, qty: x.qty,
      })),
    });
  }

  return (
    <Stack spacing={2.5}>

      {/* ── HERO ── */}
      <Card sx={{
        borderRadius: 4, overflow: "hidden",
        background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
        boxShadow: "0 12px 32px rgba(233,30,140,0.3)",
        position: "relative",
      }}>
        <Box sx={{
          position: "absolute", top: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.08)", filter: "blur(30px)",
          pointerEvents: "none",
        }} />
        <CardContent sx={{ py: 3, px: 3, position: "relative" }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box sx={{
              width: 44, height: 44, borderRadius: 2.5,
              bgcolor: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>
              <ShoppingCartIcon sx={{ color: "white", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography fontWeight={900} fontSize="1.4rem" color="white" lineHeight={1.2}>
                Checkout
              </Typography>
              <Typography fontSize="0.85rem" sx={{ color: "rgba(255,255,255,0.85)", mt: 0.25 }}>
                Periksa cart, isi nomor tujuan, lalu bayar.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5} alignItems="flex-start">

        {/* ── KIRI: CART ── */}
        <Box sx={{ flex: 1.4, minWidth: 0, width: "100%" }}>
          <Card sx={{
            borderRadius: 3, border: "1px solid #fce4ec",
            bgcolor: "white",
            boxShadow: "0 4px 16px rgba(233,30,140,0.06)",
          }}>
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>

              {/* header cart */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <ShoppingCartIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                  <Typography fontWeight={800} fontSize="1rem" color="#2d3748">Cart</Typography>
                </Stack>
                <Chip
                  label={`${count} item`}
                  size="small"
                  sx={{
                    bgcolor: count > 0 ? "rgba(233,30,140,0.08)" : "#f7fafc",
                    color: count > 0 ? "#e91e8c" : "#a0aec0",
                    fontWeight: 700, fontSize: "0.75rem",
                    border: `1px solid ${count > 0 ? "rgba(233,30,140,0.2)" : "#e2e8f0"}`,
                  }}
                />
              </Stack>

              {items.length === 0 ? (
                /* empty cart */
                <Box sx={{
                  py: 5, textAlign: "center",
                  border: "1px dashed #fce4ec", borderRadius: 3,
                  bgcolor: "#fff8fb",
                }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: 3, mx: "auto", mb: 1.5,
                    bgcolor: "rgba(233,30,140,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ShoppingCartIcon sx={{ fontSize: 26, color: "#f48fb1" }} />
                  </Box>
                  <Typography fontWeight={700} color="#2d3748" mb={0.5}>Cart masih kosong</Typography>
                  <Typography fontSize="0.82rem" color="#a0aec0">
                    Tambah paket dari menu Shop terlebih dahulu.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1.25}>
                  {items.map((it) => (
                    <CartItem
                      key={it.packageId}
                      it={it}
                      onInc={() => inc(it.packageId)}
                      onDec={() => dec(it.packageId)}
                      onRemove={() => remove(it.packageId)}
                    />
                  ))}
                </Stack>
              )}

              {/* total + clear */}
              {items.length > 0 && (
                <>
                  <Divider sx={{ borderColor: "#fce4ec", my: 2 }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button
                      size="small" onClick={clear}
                      startIcon={<DeleteOutlineIcon sx={{ fontSize: "15px !important" }} />}
                      sx={{
                        color: "#f87171", fontWeight: 600, textTransform: "none",
                        fontSize: "0.8rem", borderRadius: 2,
                        border: "1px solid #fecaca",
                        "&:hover": { bgcolor: "#fff5f5" },
                      }}
                    >
                      Hapus Semua
                    </Button>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography fontSize="0.75rem" color="#a0aec0" mb={0.25}>Total</Typography>
                      <Typography fontWeight={900} fontSize="1.3rem" sx={{
                        background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>
                        {money(total)}
                      </Typography>
                    </Box>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* ── KANAN: FORM ── */}
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Card sx={{
            borderRadius: 3, border: "1px solid #fce4ec",
            bgcolor: "white",
            boxShadow: "0 4px 16px rgba(233,30,140,0.06)",
          }}>
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>

              {/* nomor tujuan */}
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <PhoneAndroidIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                <Typography fontWeight={800} fontSize="1rem" color="#2d3748">Nomor Tujuan</Typography>
              </Stack>

              <TextField
                label="Nomor penerima paket"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                placeholder={customer?.phone || "08xxxxxxxxxx"}
                helperText={
                  customer?.phone
                    ? `Default dari profil: ${customer.phone}`
                    : "Isi nomor HP penerima paket data"
                }
                fullWidth
                sx={{ ...inputSx, mb: 2.5 }}
              />

              <Divider sx={{ borderColor: "#fce4ec", mb: 2.5 }} />

              {/* metode bayar */}
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <PaymentIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                <Typography fontWeight={800} fontSize="1rem" color="#2d3748">Metode Pembayaran</Typography>
              </Stack>

              <TextField
                select label="Pilih metode"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                fullWidth
                sx={{ ...inputSx, mb: 2.5 }}
              >
                <MenuItem value="QRIS">QRIS</MenuItem>
                <MenuItem value="Transfer Bank">Transfer Bank</MenuItem>
                <MenuItem value="Debit/Kredit">Debit / Kredit</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </TextField>

              <Divider sx={{ borderColor: "#fce4ec", mb: 2.5 }} />

              {/* ringkasan */}
              <Box sx={{
                p: 2, borderRadius: 2.5,
                bgcolor: "rgba(233,30,140,0.04)",
                border: "1px solid rgba(233,30,140,0.12)",
                mb: 2.5,
              }}>
                <Stack direction="row" alignItems="center" gap={0.75} mb={1.5}>
                  <ReceiptLongIcon sx={{ fontSize: 15, color: "#e91e8c" }} />
                  <Typography fontSize="0.8rem" fontWeight={700} color="#e91e8c">Ringkasan</Typography>
                </Stack>
                <Stack spacing={0.75}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontSize="0.82rem" color="#718096">Jumlah item</Typography>
                    <Typography fontSize="0.82rem" fontWeight={700} color="#2d3748">{count} item</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontSize="0.82rem" color="#718096">Metode bayar</Typography>
                    <Typography fontSize="0.82rem" fontWeight={700} color="#2d3748">{paymentMethod}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontSize="0.82rem" color="#718096">Nomor tujuan</Typography>
                    <Typography fontSize="0.82rem" fontWeight={700} color="#2d3748" noWrap sx={{ maxWidth: 150 }}>
                      {effectiveMsisdn || "—"}
                    </Typography>
                  </Stack>
                  <Divider sx={{ borderColor: "rgba(233,30,140,0.15)", my: 0.5 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize="0.875rem" fontWeight={700} color="#2d3748">Total</Typography>
                    <Typography fontWeight={900} fontSize="1.1rem" sx={{
                      background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                      {money(total)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* bayar button */}
              <Button
                fullWidth variant="contained" size="large"
                disabled={createMut.isPending || items.length === 0}
                onClick={checkout}
                startIcon={
                  createMut.isPending
                    ? null
                    : <BoltIcon sx={{ fontSize: "20px !important" }} />
                }
                sx={{
                  py: 1.6, borderRadius: 3,
                  fontWeight: 800, fontSize: "1rem", textTransform: "none",
                  background: items.length === 0
                    ? undefined
                    : "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                  boxShadow: items.length === 0
                    ? "none"
                    : "0 8px 24px rgba(233,30,140,0.4)",
                  "&:hover:not(:disabled)": {
                    background: "linear-gradient(135deg, #d81b60, #ad1457)",
                    boxShadow: "0 12px 32px rgba(233,30,140,0.5)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                {createMut.isPending ? "Memproses..." : "Bayar & Buat Transaksi"}
              </Button>

            </CardContent>
          </Card>
        </Box>

      </Stack>

      {/* ── TOAST ── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          sx={{
            borderRadius: 3, fontWeight: 600,
            bgcolor: toast.type === "success" ? "#fff0f7" : "#fff5f5",
            color: toast.type === "success" ? "#c2185b" : "#c53030",
            border: `1px solid ${toast.type === "success" ? "rgba(233,30,140,0.2)" : "#fecaca"}`,
            "& .MuiAlert-icon": {
              color: toast.type === "success" ? "#e91e8c" : "#f87171",
            },
          }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}