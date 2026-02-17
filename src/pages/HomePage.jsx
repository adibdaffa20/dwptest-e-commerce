import { useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, Chip, Stack,
  Typography, Container, Grid, Divider,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const features = [
  { icon: <BoltIcon sx={{ fontSize: 22 }} />,         title: "Instan & Cepat",    desc: "Proses hanya 30 detik",     color: "#e91e8c" },
  { icon: <SecurityIcon sx={{ fontSize: 22 }} />,     title: "Aman Terpercaya",   desc: "Transaksi terenkripsi",     color: "#10b981" },
  { icon: <SupportAgentIcon sx={{ fontSize: 22 }} />, title: "Support 24/7",      desc: "Siap membantu kapanpun",    color: "#3b82f6" },
  { icon: <LocalOfferIcon sx={{ fontSize: 22 }} />,   title: "Harga Terbaik",     desc: "Promo setiap hari",         color: "#f59e0b" },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 22 }} />, title: "Semua Operator",    desc: "Telkomsel, XL, Indosat...", color: "#8b5cf6" },
  { icon: <ReceiptLongIcon sx={{ fontSize: 22 }} />,  title: "Riwayat Lengkap",   desc: "Semua transaksi tercatat",  color: "#ec4899" },
];

export default function HomePage() {
  const nav = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 2 } }}>
      <Stack spacing={3}>

        {/* ── Hero ── */}
        <Card sx={{
          borderRadius: 4,
          background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(233,30,140,0.3)",
        }}>
          {[
            { top: -60,  right: -60,  size: 220, opacity: 0.12 },
            { bottom: -40, left: -40, size: 160, opacity: 0.08 },
            { top: "40%", right: "18%", size: 80, opacity: 0.07 },
          ].map((b, i) => (
            <Box key={i} sx={{
              position: "absolute",
              top: b.top, bottom: b.bottom, left: b.left, right: b.right,
              width: b.size, height: b.size, borderRadius: "50%",
              background: "rgba(255,255,255,1)",
              opacity: b.opacity, filter: "blur(40px)", pointerEvents: "none",
            }} />
          ))}

          <CardContent sx={{ py: { xs: 3, md: 4.5 }, px: { xs: 3, md: 5 }, position: "relative" }}>
            <Stack spacing={2.5}>
              <Box>
                <Chip
                  icon={<VerifiedIcon sx={{ fontSize: "14px !important", color: "white !important" }} />}
                  label="Terpercaya sejak 2020 · 50K+ pengguna"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(10px)",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{
                  fontWeight: 900,
                  color: "white",
                  fontSize: { xs: "1.75rem", sm: "2.4rem", md: "2.8rem" },
                  lineHeight: 1.15,
                  mb: 1.5,
                }}>
                  Beli Paket Data
                  <Box component="span" sx={{ display: "block", color: "rgba(255,255,255,0.82)" }}>
                    30 Detik Beres!
                  </Box>
                </Typography>
                <Typography sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  maxWidth: 500,
                  lineHeight: 1.75,
                }}>
                  Cara tercepat dan termudah untuk top up kuota internet.
                  Pilih paket, bayar, langsung aktif!
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 15 }} />, label: "Proses Instan" },
                  { icon: <LocalOfferIcon sx={{ fontSize: 15 }} />,  label: "Harga Hemat" },
                  { icon: <PhoneAndroidIcon sx={{ fontSize: 15 }} />, label: "Semua Operator" },
                ].map((chip) => (
                  <Chip
                    key={chip.label}
                    icon={chip.icon}
                    label={chip.label}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(10px)",
                      "& .MuiChip-icon": { color: "rgba(255,255,255,0.9)" },
                    }}
                  />
                ))}
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} pt={0.5}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => nav("/app/shop")}
                  sx={{
                    bgcolor: "white", color: "#e91e8c",
                    fontWeight: 800, py: 1.5, px: 4,
                    fontSize: "0.975rem", borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#fff0f7",
                      transform: "translateY(-2px)",
                      boxShadow: "0 14px 32px rgba(0,0,0,0.2)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Mulai Belanja
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ReceiptLongIcon />}
                  onClick={() => nav("/app/transactions")}
                  sx={{
                    color: "white", borderColor: "rgba(255,255,255,0.45)",
                    fontWeight: 600, py: 1.5, px: 4,
                    borderRadius: 3, textTransform: "none",
                    backdropFilter: "blur(10px)",
                    fontSize: "0.975rem",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.12)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Lihat Transaksi
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* ── Feature Cards ── */}
        <Grid container spacing={2} justifyContent="center">
        {features.map((f, i) => (
            <Grid item xs={6} md={3} key={i} sx={{ display: "flex" }}>
            <Card sx={{
                borderRadius: 3,
                width: "100%",
                border: "1px solid #fce4ec",
                bgcolor: "white",
                boxShadow: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 12px 28px ${f.color}22`,
                borderColor: f.color + "55",
                },
            }}>
                <CardContent sx={{ textAlign: "center", py: 3, px: 2 }}>
                <Box sx={{
                    width: 50, height: 50, borderRadius: 2.5,
                    bgcolor: `${f.color}12`, color: f.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    mx: "auto", mb: 1.75,
                }}>
                    {f.icon}
                </Box>
                <Typography fontWeight={800} fontSize="0.9rem" color="#2d3748" mb={0.4}>
                    {f.title}
                </Typography>
                <Typography fontSize="0.78rem" color="#a0aec0" lineHeight={1.5}>
                    {f.desc}
                </Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
        </Grid>

        {/* ── Tip Card ── */}
        <Card sx={{
          borderRadius: 3,
          border: "1px solid #fce4ec",
          bgcolor: "white",
          boxShadow: "none",
          transition: "all 0.25s ease",
          "&:hover": { borderColor: "#f48fb1", boxShadow: "0 4px 16px rgba(233,30,140,0.08)" },
        }}>
          <CardContent sx={{ py: 2.5, px: 3, "&:last-child": { pb: 2.5 } }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box sx={{
                width: 42, height: 42, borderRadius: 2, flexShrink: 0,
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(233,30,140,0.28)",
              }}>
                <LightbulbIcon sx={{ color: "white", fontSize: 19 }} />
              </Box>
              <Box>
                <Typography fontWeight={800} fontSize="0.9rem" color="#2d3748" mb={0.5}>
                  Tips Belanja Cerdas
                </Typography>
                <Divider sx={{ borderColor: "#fce4ec", mb: 1 }} />
                <Typography fontSize="0.82rem" color="#718096" lineHeight={1.75}>
                  Simpan nomor favorit di profil untuk checkout lebih cepat, atau input nomor tujuan langsung saat checkout. Semua transaksi tersimpan rapi untuk referensi kamu.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

      </Stack>
    </Container>
  );
}