import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box, Card, CardContent, Chip, Stack, TextField,
  Typography, Container, InputAdornment, Divider, Skeleton
} from "@mui/material";
import LandingNavbar from "../components/LandingNavbar";
import { http } from "../api/http";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

function money(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);
}

async function listAllTransactions() {
  const { data } = await http.get("/transactions?_sort=createdAt&_order=desc");
  return data || [];
}

function StatusChip({ status }) {
  const map = {
    PAID:    { label: "Berhasil", color: "#10b981", bg: "#ecfdf5", icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
    FAILED:  { label: "Gagal",    color: "#ef4444", bg: "#fef2f2", icon: <CancelIcon sx={{ fontSize: 14 }} /> },
    PENDING: { label: "Pending",  color: "#f59e0b", bg: "#fffbeb", icon: <HourglassEmptyIcon sx={{ fontSize: 14 }} /> },
  };
  const s = map[status?.toUpperCase()] || map.PAID;
  return (
    <Chip
      size="small"
      icon={s.icon}
      label={s.label}
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 700,
        fontSize: "0.72rem",
        border: `1px solid ${s.color}33`,
        "& .MuiChip-icon": { color: s.color },
      }}
    />
  );
}

function PaymentChip({ method }) {
  return (
    <Chip
      size="small"
      label={method || "QRIS"}
      sx={{
        bgcolor: "rgba(233,30,140,0.08)",
        color: "#c2185b",
        fontWeight: 600,
        fontSize: "0.72rem",
        border: "1px solid rgba(233,30,140,0.2)",
      }}
    />
  );
}

function TrxCard({ t }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #fce4ec",
        bgcolor: "white",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(233,30,140,0.1)",
          borderColor: "#f48fb1",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* Header Row */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{
              width: 36, height: 36, borderRadius: 2,
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 3px 10px rgba(233,30,140,0.3)",
            }}>
              <ReceiptLongIcon sx={{ color: "white", fontSize: 18 }} />
            </Box>
            <Box>
              <Typography fontWeight={800} fontSize="0.95rem" color="#2d3748">
                TRX #{t.id}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <AccessTimeIcon sx={{ fontSize: 12, color: "#a0aec0" }} />
                <Typography fontSize="0.72rem" color="#a0aec0">
                  {t.createdAt ? new Date(t.createdAt).toLocaleString("id-ID") : "-"}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Typography fontWeight={900} fontSize="1.1rem"
            sx={{
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {money(t.total)}
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "#fce4ec", mb: 1.5 }} />

        {/* Detail Row */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Stack direction="row" alignItems="center" gap={0.75} mb={0.75}>
              <PhoneAndroidIcon sx={{ fontSize: 14, color: "#e91e8c" }} />
              <Typography fontSize="0.82rem" fontWeight={600} color="#4a5568">
                {t.msisdn}
              </Typography>
            </Stack>
            <Typography fontSize="0.8rem" color="#718096" sx={{
              maxWidth: 280,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {Array.isArray(t.items) ? t.items.map((x) => `${x.name} ×${x.qty}`).join(", ") : "-"}
            </Typography>
          </Box>

          <Stack direction="row" gap={0.75} alignItems="center" flexShrink={0}>
            <PaymentChip method={t.paymentMethod} />
            <StatusChip status={t.status} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Stack spacing={1.5}>
      {[1, 2, 3].map((i) => (
        <Card key={i} sx={{ borderRadius: 3, border: "1px solid #fce4ec" }}>
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 2 }} />
                <Box>
                  <Skeleton width={80} height={18} />
                  <Skeleton width={120} height={14} />
                </Box>
              </Stack>
              <Skeleton width={90} height={24} />
            </Stack>
            <Skeleton height={1} sx={{ mb: 1.5 }} />
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Skeleton width={110} height={16} sx={{ mb: 0.75 }} />
                <Skeleton width={180} height={14} />
              </Box>
              <Stack direction="row" gap={0.75}>
                <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 99 }} />
                <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 99 }} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default function PublicHistoryPage() {
  const [msisdn, setMsisdn] = useState("");

  const { data: trxs = [], isLoading } = useQuery({
    queryKey: ["publicTransactions"],
    queryFn: listAllTransactions,
  });

  const filtered = useMemo(() => {
    const s = msisdn.trim();
    if (!s) return [];
    return trxs.filter((t) => String(t.msisdn || "") === s);
  }, [msisdn, trxs]);

  const hasSearch = msisdn.trim().length > 0;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fdf2f7" }}>
      <LandingNavbar />

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>

          {/* Page Header */}
          <Box>
            <Stack direction="row" alignItems="center" gap={1.5} mb={0.75}>
              <Box sx={{
                width: 44, height: 44, borderRadius: 2.5,
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 16px rgba(233,30,140,0.3)",
              }}>
                <ReceiptLongIcon sx={{ color: "white", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography fontWeight={900} fontSize="1.6rem" color="#2d3748" lineHeight={1.1}>
                  Riwayat Transaksi
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0">
                  Cek status pembelian paket data kamu
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Search Card */}
          <Card sx={{
            borderRadius: 3,
            border: "1px solid #fce4ec",
            bgcolor: "white",
            boxShadow: "0 4px 20px rgba(233,30,140,0.06)",
          }}>
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography fontWeight={700} fontSize="0.9rem" color="#4a5568" mb={1.5}>
                Cari berdasarkan nomor tujuan
              </Typography>
              <TextField
                placeholder="Contoh: 081234567890"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: msisdn ? "#e91e8c" : "#a0aec0", fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f48fb1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e91e8c",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <Typography fontSize="0.75rem" color="#a0aec0" mt={1}>
                Masukkan nomor lengkap yang terdaftar saat transaksi
              </Typography>
            </CardContent>
          </Card>

          {/* Results */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : !hasSearch ? (
            /* Empty state — belum search */
            <Card sx={{
              borderRadius: 3,
              border: "1px dashed #f48fb1",
              bgcolor: "#fff5f9",
            }}>
              <CardContent sx={{ py: 5, textAlign: "center" }}>
                <Box sx={{
                  width: 64, height: 64, borderRadius: 4,
                  bgcolor: "rgba(233,30,140,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mx: "auto", mb: 2,
                }}>
                  <SearchIcon sx={{ fontSize: 32, color: "#e91e8c" }} />
                </Box>
                <Typography fontWeight={700} color="#4a5568" mb={0.5}>
                  Belum ada pencarian
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0">
                  Masukkan nomor tujuan di atas untuk melihat riwayat transaksi
                </Typography>
              </CardContent>
            </Card>
          ) : filtered.length === 0 ? (
            /* No result */
            <Card sx={{
              borderRadius: 3,
              border: "1px dashed #f48fb1",
              bgcolor: "#fff5f9",
            }}>
              <CardContent sx={{ py: 5, textAlign: "center" }}>
                <Box sx={{
                  width: 64, height: 64, borderRadius: 4,
                  bgcolor: "rgba(233,30,140,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mx: "auto", mb: 2,
                }}>
                  <PhoneAndroidIcon sx={{ fontSize: 32, color: "#e91e8c" }} />
                </Box>
                <Typography fontWeight={700} color="#4a5568" mb={0.5}>
                  Transaksi tidak ditemukan
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0">
                  Nomor <strong>{msisdn}</strong> belum pernah melakukan transaksi
                </Typography>
              </CardContent>
            </Card>
          ) : (
            /* Results list */
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" px={0.5}>
                <Typography fontSize="0.85rem" color="#718096">
                  Menampilkan <strong style={{ color: "#e91e8c" }}>{filtered.length}</strong> transaksi untuk <strong>{msisdn}</strong>
                </Typography>
              </Stack>
              {filtered.map((t) => (
                <TrxCard key={t.id} t={t} />
              ))}
            </Stack>
          )}

        </Stack>
      </Container>
    </Box>
  );
}