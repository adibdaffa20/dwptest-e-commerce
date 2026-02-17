import {
  Box, Button, Card, CardContent, Chip, Stack,
  Typography, Container, Grid, Divider, Avatar
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import WifiIcon from "@mui/icons-material/Wifi";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function SectionHeader({ label, title, subtitle }) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
      <Chip
        label={label}
        size="small"
        sx={{
          mb: 1.5,
          bgcolor: "rgba(233,30,140,0.08)",
          color: "#e91e8c",
          fontWeight: 700,
          fontSize: "0.75rem",
          border: "1px solid rgba(233,30,140,0.2)",
        }}
      />
      <Typography
        fontWeight={900}
        fontSize={{ xs: "1.6rem", md: "2rem" }}
        color="#2d3748"
        lineHeight={1.2}
        mb={1}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          color="#a0aec0"
          fontSize="0.95rem"
          sx={{ maxWidth: 500, mx: "auto", lineHeight: 1.7 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

const features = [
  { icon: <BoltIcon sx={{ fontSize: 24 }} />,         color: "#e91e8c", title: "Proses Instan",    desc: "Paket aktif dalam hitungan detik setelah pembayaran berhasil dikonfirmasi." },
  { icon: <LocalOfferIcon sx={{ fontSize: 24 }} />,   color: "#f59e0b", title: "Harga Terbaik",    desc: "Harga transparan, tidak ada biaya tersembunyi. Hemat setiap transaksi." },
  { icon: <SecurityIcon sx={{ fontSize: 24 }} />,     color: "#10b981", title: "Transaksi Aman",   desc: "Setiap transaksi terenkripsi dan tersimpan rapi di riwayat akun kamu." },
  { icon: <SupportAgentIcon sx={{ fontSize: 24 }} />, color: "#3b82f6", title: "Support 24/7",     desc: "Tim kami siap membantu kapan saja bila kamu mengalami kendala." },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 24 }} />, color: "#8b5cf6", title: "Semua Operator",   desc: "Tersedia untuk Telkomsel, Indosat, XL, Tri, Smartfren, dan lainnya." },
  { icon: <ReceiptLongIcon sx={{ fontSize: 24 }} />,  color: "#ec4899", title: "Riwayat Lengkap",  desc: "Semua transaksi tercatat dan bisa dicek kapan saja dengan mudah." },
];

const steps = [
  { icon: <StorefrontIcon sx={{ fontSize: 26, color: "white" }} />,  title: "Pilih Paket",     desc: "Browse berbagai pilihan paket data sesuai kebutuhan dan budget kamu." },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 26, color: "white" }} />, title: "Input Nomor",    desc: "Masukkan nomor tujuan — bisa untuk diri sendiri atau orang lain." },
  { icon: <BoltIcon sx={{ fontSize: 26, color: "white" }} />,         title: "Bayar & Aktif", desc: "Pilih metode pembayaran, konfirmasi, dan paket langsung aktif!" },
];

const operators = ["Telkomsel", "Indosat", "XL", "Tri", "Smartfren", "Axis"];

const testimonials = [
  { name: "Alya R.",    role: "Mahasiswa",        rating: 5, text: "Beli paket di sini gampang banget, prosesnya cepat dan harganya murah. Jadi langganan!" },
  { name: "Bima S.",    role: "Freelancer",        rating: 5, text: "Suka banget ada fitur riwayat, jadi gampang track pengeluaran data bulanan saya." },
  { name: "Citra M.",   role: "Ibu Rumah Tangga",  rating: 5, text: "Mudah dipakai, bisa beli paket buat anak juga tanpa ribet. Sangat recommended!" },
  { name: "Dian P.",    role: "Pelajar SMA",       rating: 5, text: "Harganya jauh lebih murah dari tempat lain. Promo mingguan-nya juga keren banget!" },
  { name: "Eko W.",     role: "Karyawan Swasta",   rating: 5, text: "Praktis banget, tinggal pilih paket dan bayar. Aktif langsung dalam hitungan detik!" },
  { name: "Fitri N.",   role: "Content Creator",   rating: 5, text: "Sebagai kreator butuh kuota besar tiap hari. Kuotify jadi andalan karena stok paketnya lengkap." },
  { name: "Galih A.",   role: "Pengusaha UMKM",    rating: 5, text: "Beli buat karyawan juga gampang, tinggal input nomor tujuan. Hemat waktu banget!" },
];

const stats = [
  { value: "50K+",  label: "Pengguna Aktif" },
  { value: "200K+", label: "Transaksi Sukses" },
  { value: "99.9%", label: "Uptime Layanan" },
  { value: "< 30s", label: "Rata-rata Proses" },
];

const faqs = [
  { q: "Berapa lama paket aktif setelah bayar?",          a: "Paket langsung aktif dalam hitungan detik setelah pembayaran dikonfirmasi oleh sistem." },
  { q: "Apakah bisa beli paket untuk nomor lain?",        a: "Ya! Kamu bisa input nomor tujuan siapapun saat checkout, tidak harus nomor sendiri." },
  { q: "Metode pembayaran apa saja yang tersedia?",       a: "Kami mendukung QRIS, transfer bank, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit." },
  { q: "Bagaimana jika paket tidak masuk setelah bayar?", a: "Hubungi support kami melalui WhatsApp. Tim kami akan segera menangani dalam 15 menit." },
];

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: "#fdf2f7", minHeight: "100vh" }}>
      <LandingNavbar />

      {/* ── 1. HERO ── */}
        <Box sx={{
        background: "linear-gradient(160deg, #fdf2f7 0%, #fff0f7 40%, #fce4ec 100%)",
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        }}>
        {[
            { top: -80,    right: -80,   size: 300, opacity: 0.22 },
            { bottom: -60, left: -60,    size: 240, opacity: 0.15 },
            { top: "40%",  right: "20%", size: 120, opacity: 0.10 },
        ].map((b, i) => (
            <Box key={i} sx={{
            position: "absolute",
            top: b.top, bottom: b.bottom, left: b.left, right: b.right,
            width: b.size, height: b.size, borderRadius: "50%",
            background: "linear-gradient(135deg, #e91e8c, #c2185b)",
            opacity: b.opacity, filter: "blur(60px)", pointerEvents: "none",
            }} />
        ))}

        {/* Sama persis dengan LandingNavbar: maxWidth 1200, px { xs: 2, md: 4 } */}
        <Box sx={{
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, md: 4 },   /* ← px simetris, bukan pl+pr:0 */
            position: "relative",
        }}>
            <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 5, md: 6 },
            }}>

      {/* kiri: copy */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack spacing={3}>
          <Box>
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: "14px !important", color: "#e91e8c !important" }} />}
              label="Terpercaya sejak 2020 · 50K+ pengguna"
              sx={{
                mb: 2,
                bgcolor: "rgba(233,30,140,0.08)",
                color: "#c2185b",
                fontWeight: 700,
                fontSize: "0.78rem",
                border: "1px solid rgba(233,30,140,0.2)",
              }}
            />
            <Typography
              fontWeight={900} lineHeight={1.15} color="#2d3748"
              fontSize={{ xs: "2rem", sm: "2.6rem", md: "3rem" }}
            >
              Beli Paket Data
              <Box component="span" sx={{
                display: "block",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Lebih Cepat & Hemat
              </Box>
            </Typography>
          </Box>

          <Typography color="#718096" fontSize="1.05rem" lineHeight={1.8} sx={{ maxWidth: 460 }}>
            Platform terbaik untuk top up kuota internet semua operator.
            Proses instan, harga transparan, dan riwayat tersimpan rapi.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              component={RouterLink} to="/daftar-harga"
              variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.6, px: 4, borderRadius: 3,
                fontWeight: 700, fontSize: "1rem", textTransform: "none",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                boxShadow: "0 8px 24px rgba(233,30,140,0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
                  boxShadow: "0 12px 32px rgba(233,30,140,0.5)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Lihat Daftar Harga
            </Button>
            <Button
              component={RouterLink} to="/masuk"
              variant="outlined" size="large"
              sx={{
                py: 1.6, px: 4, borderRadius: 3,
                fontWeight: 600, fontSize: "1rem", textTransform: "none",
                color: "#e91e8c", borderColor: "#f48fb1",
                "&:hover": { borderColor: "#e91e8c", bgcolor: "#fff0f7", transform: "translateY(-2px)" },
                transition: "all 0.25s ease",
              }}
            >
              Masuk & Beli Paket
            </Button>
          </Stack>

          <Stack direction="row" spacing={2.5} flexWrap="wrap">
            {["Checkout < 30 detik", "Harga transparan", "Riwayat lengkap"].map((t) => (
              <Stack key={t} direction="row" alignItems="center" spacing={0.5}>
                <CheckCircleIcon sx={{ fontSize: 15, color: "#10b981" }} />
                <Typography fontSize="0.82rem" color="#4a5568" fontWeight={600}>{t}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* kanan: card — flex:1 + justifyContent flex-end */}
      <Box sx={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        <Box sx={{
          position: "relative",
          width: "100%",
          maxWidth: 400,
        }}>
          <Card sx={{
            borderRadius: 4,
            border: "1px solid #fce4ec",
            boxShadow: "0 24px 60px rgba(233,30,140,0.15)",
            overflow: "hidden",
          }}>
            <Box sx={{
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              px: 3, py: 2.5,
            }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1}>
                  <SignalCellularAltIcon sx={{ color: "white", fontSize: 20 }} />
                  <Typography color="white" fontWeight={800} fontSize="1rem">Kuotify</Typography>
                </Stack>
                <Chip label="Live" size="small" sx={{
                  bgcolor: "#4ade80", color: "white",
                  fontWeight: 700, fontSize: "0.7rem", height: 22,
                }} />
              </Stack>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Typography fontSize="0.72rem" color="#a0aec0" fontWeight={700} mb={1.5} letterSpacing="0.8px">
                PAKET TERPOPULER
              </Typography>
              <Stack spacing={1.25}>
                {[
                  { name: "Paket 10GB", price: "Rp 35.000",  days: "30 hari", hot: false },
                  { name: "Paket 25GB", price: "Rp 75.000",  days: "30 hari", hot: true  },
                  { name: "Paket 50GB", price: "Rp 130.000", days: "60 hari", hot: false },
                ].map((pkg) => (
                  <Box key={pkg.name} sx={{
                    px: 2, py: 1.5, borderRadius: 2.5,
                    border: pkg.hot ? "2px solid #e91e8c" : "1px solid #fce4ec",
                    bgcolor: pkg.hot ? "#fff0f7" : "white",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: 1,
                  }}>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction="row" alignItems="center" gap={0.75}>
                        <Typography fontWeight={800} fontSize="0.875rem" color="#2d3748" noWrap>
                          {pkg.name}
                        </Typography>
                        {pkg.hot && (
                          <Chip label="🔥 Terlaris" size="small" sx={{
                            height: 20, fontSize: "0.62rem", fontWeight: 700,
                            bgcolor: "#e91e8c", color: "white", flexShrink: 0,
                          }} />
                        )}
                      </Stack>
                      <Typography fontSize="0.72rem" color="#a0aec0" mt={0.25}>
                        {pkg.days}
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight={900} fontSize="0.9rem" flexShrink={0}
                      sx={{
                        background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {pkg.price}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                component={RouterLink} to="/daftar-harga"
                fullWidth variant="contained" size="large"
                sx={{
                  mt: 2.5, borderRadius: 2.5, py: 1.4,
                  fontWeight: 700, textTransform: "none",
                  background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                  boxShadow: "0 6px 18px rgba(233,30,140,0.35)",
                  "&:hover": { background: "linear-gradient(135deg, #d81b60, #ad1457)" },
                }}
              >
                Lihat Semua Paket →
              </Button>
            </CardContent>
          </Card>

          {/* badge mengikuti sudut card, bukan keluar container */}
          <Box sx={{
            position: "absolute", top: -14, right: 0,
            bgcolor: "#fbbf24", color: "white",
            borderRadius: 3, px: 2, py: 1,
            boxShadow: "0 6px 16px rgba(251,191,36,0.4)",
            display: { xs: "none", sm: "flex" },
            alignItems: "center", gap: 0.5,
            zIndex: 1,
          }}>
            <EmojiEventsIcon sx={{ fontSize: 16 }} />
            <Typography fontSize="0.78rem" fontWeight={800}>#1 Tercepat</Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  </Box>
</Box>

      {/* ── 2. STATS — truly centered ── */}
      <Box
        sx={{
          bgcolor: "white",
          borderTop: "1px solid #fce4ec",
          borderBottom: "1px solid #fce4ec",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
          {/* FIX: Use justifyContent="center" so the grid row is horizontally centered */}
          <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
            {stats.map((s, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box
                  sx={{
                    py: { xs: 3.5, md: 4.5 },
                    px: { xs: 2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    borderRight: {
                      xs: i % 2 === 0 ? "1px solid #fce4ec" : "none",
                      md: i < 3 ? "1px solid #fce4ec" : "none",
                    },
                    borderBottom: {
                      xs: i < 2 ? "1px solid #fce4ec" : "none",
                      md: "none",
                    },
                  }}
                >
                  <Typography
                    fontWeight={900}
                    fontSize={{ xs: "1.9rem", md: "2.4rem" }}
                    lineHeight={1}
                    textAlign="center"
                    sx={{
                      background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    fontSize={{ xs: "0.82rem", md: "0.9rem" }}
                    color="#a0aec0"
                    fontWeight={600}
                    textAlign="center"
                  >
                    {s.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 3. FEATURES ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader
          label="Kenapa Kuotify?"
          title="Semua yang kamu butuhkan ada di sini"
          subtitle="Kami hadir untuk membuat pengalaman beli paket data jadi sesimpel dan secepat mungkin."
        />
        <Box sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          alignItems: "stretch",
        }}>
          {features.map((f, i) => (
            <Card key={i} sx={{
              borderRadius: 3,
              border: "1px solid #fce4ec",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 16px 36px ${f.color}22`,
                borderColor: f.color + "55",
              },
            }}>
              <CardContent sx={{
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                "&:last-child": { pb: 3 },
              }}>
                <Box sx={{
                  width: 50, height: 50, borderRadius: 2.5,
                  bgcolor: `${f.color}12`, color: f.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mb: 2, flexShrink: 0,
                }}>
                  {f.icon}
                </Box>
                <Typography fontWeight={800} fontSize="0.975rem" color="#2d3748" mb={1}>
                  {f.title}
                </Typography>
                <Typography fontSize="0.845rem" color="#718096" lineHeight={1.7} sx={{ flex: 1 }}>
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* ── 4. HOW IT WORKS ── */}
      <Box sx={{
        bgcolor: "white",
        borderTop: "1px solid #fce4ec",
        borderBottom: "1px solid #fce4ec",
        py: { xs: 6, md: 10 },
      }}>
        <Container maxWidth="lg">
          <SectionHeader
            label="Cara Kerja"
            title="Beli paket cuma 3 langkah"
            subtitle="Sesederhana itu. Tidak perlu ribet, tidak perlu antre."
          />
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {steps.map((s, i) => (
              <Grid item xs={12} md={4} key={i} sx={{ display: "flex" }}>
                <Card sx={{
                  borderRadius: 3, border: "1px solid #fce4ec",
                  textAlign: "center", flex: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 36px rgba(233,30,140,0.12)",
                  },
                }}>
                  <CardContent sx={{ p: 3.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{
                      width: 64, height: 64, borderRadius: 3, mb: 2,
                      background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 8px 20px rgba(233,30,140,0.3)",
                      position: "relative", flexShrink: 0,
                    }}>
                      {s.icon}
                      <Box sx={{
                        position: "absolute", top: -10, right: -10,
                        width: 26, height: 26, borderRadius: "50%",
                        bgcolor: "#fbbf24", color: "white",
                        fontSize: "0.72rem", fontWeight: 900,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(251,191,36,0.45)",
                      }}>
                        {i + 1}
                      </Box>
                    </Box>
                    <Typography fontWeight={800} fontSize="1.05rem" color="#2d3748" mb={1}>
                      {s.title}
                    </Typography>
                    <Typography fontSize="0.85rem" color="#718096" lineHeight={1.7}>
                      {s.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              component={RouterLink} to="/masuk"
              variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5, px: 5, borderRadius: 3,
                fontWeight: 700, textTransform: "none", fontSize: "1rem",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #d81b60, #ad1457)", transform: "translateY(-2px)" },
                transition: "all 0.25s ease",
              }}
            >
              Mulai Sekarang
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── 5. OPERATORS ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeader
          label="Operator"
          title="Semua operator tersedia"
          subtitle="Kami mendukung seluruh operator seluler besar di Indonesia."
        />
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
          {operators.map((op) => (
            <Card key={op} sx={{
              borderRadius: 3, border: "1px solid #fce4ec",
              px: 3, py: 2, bgcolor: "white",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "#e91e8c",
                boxShadow: "0 8px 20px rgba(233,30,140,0.12)",
                transform: "translateY(-2px)",
              },
            }}>
              <Stack direction="row" alignItems="center" gap={1.25}>
                <Box sx={{
                  width: 34, height: 34, borderRadius: 2,
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(233,30,140,0.25)",
                }}>
                  <WifiIcon sx={{ color: "white", fontSize: 17 }} />
                </Box>
                <Typography fontWeight={800} fontSize="0.9rem" color="#2d3748">{op}</Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* ── 6. TESTIMONIALS ── */}
    <Box sx={{
    bgcolor: "white",
    borderTop: "1px solid #fce4ec",
    borderBottom: "1px solid #fce4ec",
    py: { xs: 6, md: 10 },
    overflow: "hidden",
    }}>
    <Container maxWidth="lg">
        <SectionHeader
        label="Testimoni"
        title="Apa kata pengguna kami?"
        subtitle="Ribuan pengguna sudah merasakan kemudahan Kuotify setiap harinya."
        />
    </Container>

    {/* Marquee wrapper — full width, tidak dibatasi Container */}
    <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>

        {/* Fade left */}
        <Box sx={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: { xs: 40, md: 80 },
        background: "linear-gradient(to right, white 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
        }} />

        {/* Fade right */}
        <Box sx={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: { xs: 40, md: 80 },
        background: "linear-gradient(to left, white 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
        }} />

        {/* Track — duplikasi 2x untuk loop seamless */}
        <Box sx={{
        display: "flex",
        gap: 2.5,
        width: "max-content",
        animation: "marquee 45s linear infinite",
        "&:hover": { animationPlayState: "paused" },
        "@keyframes marquee": {
            "0%":   { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
        },
        py: 1,   /* sedikit ruang atas-bawah agar shadow card tidak terpotong */
        px: 2,
        }}>
        {/* render 2x array untuk loop mulus */}
        {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={i} sx={{
            borderRadius: 3,
            border: "1px solid #fce4ec",
            bgcolor: "#fff8fb",
            width: { xs: 280, sm: 320 },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
                boxShadow: "0 16px 36px rgba(233,30,140,0.12)",
            },
            }}>
            <CardContent sx={{
                p: 3, flex: 1,
                display: "flex", flexDirection: "column",
                "&:last-child": { pb: 3 },
            }}>
                {/* Quote icon */}
                <FormatQuoteIcon sx={{ fontSize: 30, color: "#f48fb1", mb: 1.5, flexShrink: 0 }} />

                {/* Teks review */}
                <Typography
                fontSize="0.875rem"
                color="#4a5568"
                lineHeight={1.8}
                fontStyle="italic"
                sx={{ flex: 1, mb: 2.5 }}
                >
                "{t.text}"
                </Typography>

                <Divider sx={{ borderColor: "#fce4ec", mb: 2 }} />

                {/* Footer: nama + bintang */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                <Stack direction="row" alignItems="center" gap={1.25} sx={{ minWidth: 0 }}>
                    <Avatar sx={{
                    width: 36, height: 36,
                    fontSize: "0.875rem", fontWeight: 700, flexShrink: 0,
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    boxShadow: "0 4px 10px rgba(233,30,140,0.25)",
                    }}>
                    {t.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700} fontSize="0.875rem" color="#2d3748" noWrap>
                        {t.name}
                    </Typography>
                    <Typography fontSize="0.74rem" color="#a0aec0" noWrap>
                        {t.role}
                    </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" gap={0.25} flexShrink={0}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 14, color: "#fbbf24" }} />
                    ))}
                </Stack>
                </Stack>
            </CardContent>
            </Card>
        ))}
        </Box>
    </Box>
    </Box>

      {/* ── 7. FAQ ── */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader
          label="FAQ"
          title="Pertanyaan yang sering ditanya"
          subtitle="Tidak menemukan jawaban? Hubungi support kami kapan saja."
        />
        <Stack spacing={2}>
          {faqs.map((f, i) => (
            <Card key={i} sx={{
              borderRadius: 3, border: "1px solid #fce4ec", bgcolor: "white",
              transition: "all 0.2s ease",
              "&:hover": { borderColor: "#f48fb1", boxShadow: "0 4px 16px rgba(233,30,140,0.08)" },
            }}>
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Stack direction="row" gap={2} alignItems="flex-start">
                  <Box sx={{
                    width: 28, height: 28, borderRadius: 1.5, flexShrink: 0,
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 3px 8px rgba(233,30,140,0.25)",
                    mt: 0.25,
                  }}>
                    <Typography color="white" fontWeight={900} fontSize="0.75rem">Q</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={700} fontSize="0.95rem" color="#2d3748" mb={0.75}>{f.q}</Typography>
                    <Typography fontSize="0.875rem" color="#718096" lineHeight={1.7}>{f.a}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* ── 8. CTA BANNER ── */}
      <Box sx={{ pb: { xs: 6, md: 10 }, px: 2 }}>
        <Container maxWidth="md">
          <Card sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
            boxShadow: "0 24px 60px rgba(233,30,140,0.35)",
            overflow: "hidden", position: "relative",
          }}>
            <Box sx={{
              position: "absolute", top: -50, right: -50,
              width: 200, height: 200, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", filter: "blur(40px)",
            }} />
            <CardContent sx={{ py: { xs: 5, md: 7 }, px: { xs: 3, md: 6 }, textAlign: "center", position: "relative" }}>
              <Typography fontWeight={900} fontSize={{ xs: "1.6rem", md: "2.2rem" }} color="white" lineHeight={1.2} mb={1.5}>
                Siap mulai hemat dengan Kuotify?
              </Typography>
              <Typography color="rgba(255,255,255,0.85)" fontSize="1rem" mb={4} lineHeight={1.7}>
                Bergabung dengan 50.000+ pengguna yang sudah merasakan kemudahan beli paket data setiap hari.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button
                  component={RouterLink} to="/daftar"
                  variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.6, px: 5, borderRadius: 3,
                    bgcolor: "white", color: "#e91e8c",
                    fontWeight: 800, fontSize: "1rem", textTransform: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    "&:hover": { bgcolor: "#fff0f7", transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" },
                    transition: "all 0.25s ease",
                  }}
                >
                  Daftar Gratis
                </Button>
                <Button
                  component={RouterLink} to="/daftar-harga"
                  variant="outlined" size="large"
                  sx={{
                    py: 1.6, px: 5, borderRadius: 3,
                    color: "white", borderColor: "rgba(255,255,255,0.5)",
                    fontWeight: 600, fontSize: "1rem", textTransform: "none",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)", transform: "translateY(-2px)" },
                    transition: "all 0.25s ease",
                  }}
                >
                  Lihat Paket
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* ── 9. FOOTER ── */}
      <Box sx={{ bgcolor: "white", borderTop: "1px solid #fce4ec", py: 4 }}>
        <Container maxWidth="lg">
          <Stack alignItems="center" gap={1.5}>
            <Stack direction="row" alignItems="center" gap={1.25}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5,
                background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 10px rgba(233,30,140,0.3)",
              }}>
                <SignalCellularAltIcon sx={{ color: "white", fontSize: 18 }} />
              </Box>
              <Box>
                <Typography fontWeight={900} fontSize="1rem" sx={{
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Kuotify
                </Typography>
                <Typography fontSize="0.7rem" color="#a0aec0">Beli paket data cepat</Typography>
              </Box>
            </Stack>
            <Typography fontSize="0.78rem" color="#a0aec0" textAlign="center">
              © 2025 Kuotify. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
