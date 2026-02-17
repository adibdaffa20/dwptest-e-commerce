import { useQuery } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions";
import { getSession } from "../hooks/useSession";
import {
  Box, Card, CardContent, Chip, Stack, Typography, Skeleton
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function money(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);
}

function StatusChip({ label }) {
  const map = {
    PAID:    { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
    PENDING: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    FAILED:  { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  };
  const s = map[label?.toUpperCase()] || map.PAID;
  return (
    <Stack direction="row" alignItems="center" gap={0.6}
      sx={{ bgcolor: s.bg, color: s.color, borderRadius: 99, px: 1.5, py: 0.4, display: "inline-flex" }}>
      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: s.dot, flexShrink: 0 }} />
      <Typography fontSize="0.72rem" fontWeight={700}>{label || "PAID"}</Typography>
    </Stack>
  );
}

function MethodChip({ label }) {
  return (
    <Box sx={{
      bgcolor: "rgba(233,30,140,0.08)",
      color: "#c2185b",
      border: "1px solid rgba(233,30,140,0.2)",
      borderRadius: 99, px: 1.5, py: 0.4,
      fontSize: "0.72rem", fontWeight: 700,
      display: "inline-flex", alignItems: "center",
    }}>
      {label || "QRIS"}
    </Box>
  );
}

function LoadingSkeleton() {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((i) => (
        <Card key={i} sx={{ borderRadius: 3, border: "1px solid #fce4ec", boxShadow: "none" }}>
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <Stack spacing={1} flex={1}>
                <Skeleton variant="text" width="40%" height={20} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="60%" height={16} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="50%" height={16} sx={{ borderRadius: 1 }} />
              </Stack>
              <Stack spacing={1} alignItems="flex-end">
                <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 99 }} />
                <Skeleton variant="text" width={90} height={28} sx={{ borderRadius: 1 }} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default function MyTransactionsPage() {
  const session = getSession();
  const customerId = session?.user?.customerId;

  const { data: trxs = [], isLoading } = useQuery({
    queryKey: ["myTransactions", customerId],
    queryFn: () => transactionsApi.byCustomer(customerId),
    enabled: !!customerId,
  });

  return (
    <Stack spacing={3}>

      {/* ── Header ── */}
      <Box sx={{
        background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
        borderRadius: 3,
        px: 3, py: 3,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative blob */}
        <Box sx={{
          position: "absolute", top: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", filter: "blur(30px)", pointerEvents: "none",
        }} />
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 44, height: 44, borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <ReceiptLongIcon sx={{ color: "white", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography fontWeight={900} fontSize="1.25rem" color="white" lineHeight={1.2}>
              Transaksi Saya
            </Typography>
            <Typography fontSize="0.82rem" color="rgba(255,255,255,0.75)">
              Riwayat pembelian paket data kamu
            </Typography>
          </Box>
        </Stack>

        {/* summary pill */}
        {!isLoading && trxs.length > 0 && (
          <Box sx={{
            mt: 2,
            display: "inline-flex", alignItems: "center", gap: 0.75,
            bgcolor: "rgba(255,255,255,0.18)",
            borderRadius: 99, px: 2, py: 0.6,
          }}>
            <SignalCellularAltIcon sx={{ fontSize: 14, color: "white" }} />
            <Typography fontSize="0.78rem" color="white" fontWeight={700}>
              {trxs.length} transaksi ditemukan
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Loading ── */}
      {isLoading && <LoadingSkeleton />}

      {/* ── Empty state ── */}
      {trxs.length === 0 && !isLoading && (
        <Card sx={{
          borderRadius: 3,
          border: "1px solid #fce4ec",
          boxShadow: "none",
          bgcolor: "white",
        }}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: 3, mx: "auto", mb: 2,
              background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ShoppingBagIcon sx={{ fontSize: 28, color: "#e91e8c" }} />
            </Box>
            <Typography fontWeight={900} fontSize="1rem" color="#2d3748" mb={0.5}>
              Belum ada transaksi
            </Typography>
            <Typography variant="body2" color="#a0aec0">
              Beli paket dari menu Shop dan transaksimu akan muncul di sini.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* ── Transaction list ── */}
      <Stack spacing={1.5}>
        {trxs.map((t, idx) => (
          <Card key={t.id} sx={{
            borderRadius: 3,
            border: "1px solid #fce4ec",
            boxShadow: "none",
            bgcolor: "white",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#f48fb1",
              boxShadow: "0 4px 20px rgba(233,30,140,0.1)",
              transform: "translateY(-1px)",
            },
          }}>
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>

                {/* Left */}
                <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
                  {/* TRX ID */}
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box sx={{
                      width: 28, height: 28, borderRadius: 1.5, flexShrink: 0,
                      background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 3px 8px rgba(233,30,140,0.25)",
                    }}>
                      <Typography color="white" fontWeight={900} fontSize="0.65rem">#</Typography>
                    </Box>
                    <Typography fontWeight={900} fontSize="0.95rem" color="#2d3748">
                      TRX-{t.id}
                    </Typography>
                  </Stack>

                  {/* Date & Phone */}
                  <Stack direction="row" alignItems="center" gap={0.5} flexWrap="wrap">
                    <Stack direction="row" alignItems="center" gap={0.4}>
                      <AccessTimeIcon sx={{ fontSize: 13, color: "#a0aec0" }} />
                      <Typography fontSize="0.78rem" color="#a0aec0">
                        {t.createdAt ? new Date(t.createdAt).toLocaleString("id-ID", {
                          day: "2-digit", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        }) : "-"}
                      </Typography>
                    </Stack>
                    {t.msisdn && (
                      <>
                        <Typography fontSize="0.78rem" color="#e2e8f0">•</Typography>
                        <Stack direction="row" alignItems="center" gap={0.4}>
                          <PhoneAndroidIcon sx={{ fontSize: 13, color: "#a0aec0" }} />
                          <Typography fontSize="0.78rem" color="#a0aec0">{t.msisdn}</Typography>
                        </Stack>
                      </>
                    )}
                  </Stack>

                  {/* Items */}
                  {Array.isArray(t.items) && t.items.length > 0 && (
                    <Box sx={{
                      bgcolor: "#fff8fb",
                      border: "1px solid #fce4ec",
                      borderRadius: 1.5,
                      px: 1.5, py: 0.75,
                      display: "inline-block",
                    }}>
                      <Typography fontSize="0.78rem" color="#718096" fontWeight={600}>
                        {t.items.map(x => `${x.name} ×${x.qty}`).join("  ·  ")}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Right */}
                <Stack alignItems="flex-end" gap={1} flexShrink={0}>
                  <Stack direction="row" gap={0.75} flexWrap="wrap" justifyContent="flex-end">
                    <MethodChip label={t.paymentMethod} />
                    <StatusChip label={t.status} />
                  </Stack>
                  <Typography
                    fontWeight={900}
                    fontSize="1.05rem"
                    sx={{
                      background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {money(t.total)}
                  </Typography>
                </Stack>

              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

    </Stack>
  );
}