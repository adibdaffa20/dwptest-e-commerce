import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "../api/packages";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Container,
  Skeleton,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import LandingNavbar from "../components/LandingNavbar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WifiIcon from "@mui/icons-material/Wifi";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BoltIcon from "@mui/icons-material/Bolt";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RefreshIcon from "@mui/icons-material/Refresh";

function money(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

const tagConfig = {
  Hemat: { color: "#10b981", bg: "#ecfdf5", icon: <LocalOfferIcon sx={{ fontSize: 13 }} /> },
  Populer: { color: "#e91e8c", bg: "#fff0f7", icon: <WhatshotIcon sx={{ fontSize: 13 }} /> },
  Cepat: { color: "#3b82f6", bg: "#eff6ff", icon: <BoltIcon sx={{ fontSize: 13 }} /> },
  Premium: { color: "#f59e0b", bg: "#fffbeb", icon: <StarIcon sx={{ fontSize: 13 }} /> },
};

const providers = [
  { label: "Telkomsel", value: "Telkomsel", logo: "/assets/telkomsel.png", accent: "#ef1414" },
  { label: "by.U", value: "by.U", logo: "/assets/byU.png", accent: "#0bcaff" },
  { label: "Indosat", value: "Indosat", logo: "/assets/indosat.png", accent: "#ffbf35" },
  { label: "Smartfren", value: "Smartfren", logo: "/assets/smartfren.png", accent: "#c2185b" },
  { label: "Tri", value: "Tri", logo: "/assets/tri.png", accent: "#e91e8c" },
  { label: "XL", value: "XL", logo: "/assets/xl.png", accent: "#0050a0" },
  { label: "Axis", value: "Axis", logo: "/assets/axis.png", accent: "#8b5cf6" },
];

// ── Mock packages per provider (dipakai jika API kosong / tidak bisa dimapping provider) ──
const mockPackages = [
  { id: "tsel-1", name: "SIMPATI 5GB", provider: "Telkomsel", quota: "5GB", validityDays: 7, price: 25000, tag: "Hemat" },
  { id: "tsel-2", name: "SIMPATI 15GB", provider: "Telkomsel", quota: "15GB", validityDays: 30, price: 60000, tag: "Populer" },
  { id: "tsel-3", name: "SIMPATI 30GB", provider: "Telkomsel", quota: "30GB", validityDays: 30, price: 100000, tag: "Cepat" },
  { id: "tsel-4", name: "SIMPATI 50GB", provider: "Telkomsel", quota: "50GB", validityDays: 30, price: 150000, tag: "Premium" },
  { id: "tsel-5", name: "SIMPATI 100GB", provider: "Telkomsel", quota: "100GB", validityDays: 60, price: 250000, tag: "Premium" },

  { id: "byu-1", name: "by.U 5GB", provider: "by.U", quota: "5GB", validityDays: 30, price: 18000, tag: "Hemat" },
  { id: "byu-2", name: "by.U 10GB", provider: "by.U", quota: "10GB", validityDays: 30, price: 30000, tag: "Hemat" },
  { id: "byu-3", name: "by.U 20GB", provider: "by.U", quota: "20GB", validityDays: 30, price: 55000, tag: "Populer" },
  { id: "byu-4", name: "by.U 40GB", provider: "by.U", quota: "40GB", validityDays: 30, price: 90000, tag: "Cepat" },
  { id: "byu-5", name: "by.U 80GB", provider: "by.U", quota: "80GB", validityDays: 60, price: 160000, tag: "Premium" },

  { id: "isat-1", name: "Freedom 6GB", provider: "Indosat", quota: "6GB", validityDays: 7, price: 22000, tag: "Hemat" },
  { id: "isat-2", name: "Freedom 15GB", provider: "Indosat", quota: "15GB", validityDays: 30, price: 55000, tag: "Populer" },
  { id: "isat-3", name: "Freedom 25GB", provider: "Indosat", quota: "25GB", validityDays: 30, price: 85000, tag: "Cepat" },
  { id: "isat-4", name: "Freedom 50GB", provider: "Indosat", quota: "50GB", validityDays: 30, price: 140000, tag: "Premium" },
  { id: "isat-5", name: "Freedom U", provider: "Indosat", quota: "Unlimited", validityDays: 30, price: 200000, tag: "Premium" },

  { id: "sfren-1", name: "Unlimited 7H", provider: "Smartfren", quota: "Unlimited", validityDays: 7, price: 15000, tag: "Hemat" },
  { id: "sfren-2", name: "Unlimited 14H", provider: "Smartfren", quota: "Unlimited", validityDays: 14, price: 25000, tag: "Hemat" },
  { id: "sfren-3", name: "Unlimited 30H", provider: "Smartfren", quota: "Unlimited", validityDays: 30, price: 45000, tag: "Populer" },
  { id: "sfren-4", name: "Super 4G 30GB", provider: "Smartfren", quota: "30GB", validityDays: 30, price: 80000, tag: "Cepat" },
  { id: "sfren-5", name: "Super 4G 60GB", provider: "Smartfren", quota: "60GB", validityDays: 60, price: 140000, tag: "Premium" },

  { id: "tri-1", name: "AlwaysOn 4GB", provider: "Tri", quota: "4GB", validityDays: 7, price: 17000, tag: "Hemat" },
  { id: "tri-2", name: "AlwaysOn 12GB", provider: "Tri", quota: "12GB", validityDays: 30, price: 45000, tag: "Hemat" },
  { id: "tri-3", name: "AlwaysOn 25GB", provider: "Tri", quota: "25GB", validityDays: 30, price: 80000, tag: "Populer" },
  { id: "tri-4", name: "AlwaysOn 50GB", provider: "Tri", quota: "50GB", validityDays: 30, price: 130000, tag: "Cepat" },
  { id: "tri-5", name: "AlwaysOn 100GB", provider: "Tri", quota: "100GB", validityDays: 60, price: 220000, tag: "Premium" },

  { id: "xl-1", name: "Xtra 5GB", provider: "XL", quota: "5GB", validityDays: 7, price: 20000, tag: "Hemat" },
  { id: "xl-2", name: "Xtra 15GB", provider: "XL", quota: "15GB", validityDays: 30, price: 58000, tag: "Populer" },
  { id: "xl-3", name: "Xtra 30GB", provider: "XL", quota: "30GB", validityDays: 30, price: 95000, tag: "Cepat" },
  { id: "xl-4", name: "Xtra 50GB", provider: "XL", quota: "50GB", validityDays: 30, price: 145000, tag: "Premium" },
  { id: "xl-5", name: "Xtra 100GB", provider: "XL", quota: "100GB", validityDays: 60, price: 245000, tag: "Premium" },

  { id: "axis-1", name: "Bronet 5GB", provider: "Axis", quota: "5GB", validityDays: 7, price: 15000, tag: "Hemat" },
  { id: "axis-2", name: "Bronet 12GB", provider: "Axis", quota: "12GB", validityDays: 30, price: 40000, tag: "Hemat" },
  { id: "axis-3", name: "Bronet 25GB", provider: "Axis", quota: "25GB", validityDays: 30, price: 75000, tag: "Populer" },
  { id: "axis-4", name: "Bronet 50GB", provider: "Axis", quota: "50GB", validityDays: 30, price: 120000, tag: "Cepat" },
  { id: "axis-5", name: "Bronet 100GB", provider: "Axis", quota: "100GB", validityDays: 60, price: 210000, tag: "Premium" },
];

function TagChip({ tag }) {
  const label = tag || "Paket";
  const cfg =
    tagConfig[label] ||
    { color: "#e91e8c", bg: "#fff0f7", icon: <LocalOfferIcon sx={{ fontSize: 13 }} /> };

  return (
    <Chip
      size="small"
      icon={cfg.icon}
      label={label}
      sx={{
        bgcolor: cfg.bg,
        color: cfg.color,
        fontWeight: 700,
        fontSize: "0.72rem",
        border: `1px solid ${cfg.color}33`,
        "& .MuiChip-icon": { color: cfg.color },
      }}
    />
  );
}

function PackageCard({ p }) {
  const isPopular = p.tag === "Populer";
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: isPopular ? "2px solid #e91e8c" : "1px solid #fce4ec",
        bgcolor: "white",
        position: "relative",
        overflow: "visible",
        boxShadow: "none",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isPopular
            ? "0 12px 32px rgba(233,30,140,0.2)"
            : "0 8px 24px rgba(233,30,140,0.1)",
        },
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: -12,
            left: 20,
            background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
            color: "white",
            fontSize: "0.7rem",
            fontWeight: 800,
            px: 1.5,
            py: 0.4,
            borderRadius: 99,
            boxShadow: "0 4px 12px rgba(233,30,140,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <WhatshotIcon sx={{ fontSize: 12 }} /> TERLARIS
        </Box>
      )}

      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" gap={1} mb={0.75}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: isPopular
                    ? "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)"
                    : "rgba(233,30,140,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isPopular ? "0 4px 12px rgba(233,30,140,0.3)" : "none",
                  flexShrink: 0,
                }}
              >
                <WifiIcon sx={{ fontSize: 18, color: isPopular ? "white" : "#e91e8c" }} />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={800} fontSize="0.95rem" color="#2d3748" noWrap>
                  {p.name}
                </Typography>
                {p.provider ? (
                  <Typography fontSize="0.7rem" color="#a0aec0" fontWeight={600}>
                    {p.provider}
                  </Typography>
                ) : null}
              </Box>
            </Stack>

            <Divider sx={{ borderColor: "#fce4ec", mb: 1.25 }} />

            <Stack direction="row" gap={2}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <WifiIcon sx={{ fontSize: 14, color: "#e91e8c" }} />
                <Typography fontSize="0.82rem" color="#4a5568" fontWeight={600}>
                  {p.quota}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={0.5}>
                <CalendarTodayIcon sx={{ fontSize: 13, color: "#a0aec0" }} />
                <Typography fontSize="0.82rem" color="#718096">
                  {p.validityDays} hari
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
            <TagChip tag={p.tag} />
            <Typography
              fontWeight={900}
              fontSize="1.1rem"
              mt={1.25}
              sx={{
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {money(p.price)}
            </Typography>
            <Typography fontSize="0.7rem" color="#a0aec0" mt={0.25}>
              per paket
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Box sx={{ display: "grid", gap: 2.5, width: "100%", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" } }}>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} sx={{ borderRadius: 3, border: "1px solid #fce4ec", boxShadow: "none" }}>
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" gap={1} mb={0.75}>
                  <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 2 }} />
                  <Skeleton width={120} height={22} sx={{ alignSelf: "center" }} />
                </Stack>
                <Skeleton height={1} sx={{ mb: 1.25 }} />
                <Stack direction="row" gap={2}>
                  <Skeleton width={60} height={16} />
                  <Skeleton width={50} height={16} />
                </Stack>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Skeleton variant="rounded" width={64} height={22} sx={{ borderRadius: 99, ml: "auto" }} />
                <Skeleton width={90} height={26} sx={{ mt: 1.25, ml: "auto" }} />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function ProviderLogo({ prov, size = 52 }) {
  const [imgError, setImgError] = useState(false);

  if (prov.logo && !imgError) {
    return (
      <Box
        component="img"
        src={prov.logo}
        alt={prov.label}
        onError={() => setImgError(true)}
        sx={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${prov.accent}, ${prov.accent}bb)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="white" fontWeight={900} fontSize={size * 0.3}>
        {prov.label.slice(0, 2).toUpperCase()}
      </Typography>
    </Box>
  );
}

function normProvider(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\./g, "");
}

function readProvider(p) {
  // dukung berbagai nama field dari API
  return p.provider ?? p.operator ?? p.telco ?? p.carrier ?? p.providerName ?? "";
}

export default function PriceListPage() {
  const [activeProvider, setActiveProvider] = useState(null);

  const {
    data: apiPkgs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["publicPackages"],
    queryFn: packagesApi.listActive,
  });

  const allPackages = apiPkgs.length > 0 ? apiPkgs : mockPackages;

  // debug ringan (hanya dev)
  if (import.meta?.env?.DEV) {
    // eslint-disable-next-line no-console
    console.log("apiPkgs sample:", apiPkgs?.[0]);
    // eslint-disable-next-line no-console
    console.log("activeProvider:", activeProvider);
  }

  const filtered = useMemo(() => {
    if (!activeProvider) return [];
    return allPackages.filter((p) => normProvider(readProvider(p)) === normProvider(activeProvider));
  }, [activeProvider, allPackages]);

  // fallback kalau API ada tapi provider field-nya nggak cocok / kosong
  const finalFiltered = useMemo(() => {
    if (!activeProvider) return [];
    if (filtered.length > 0) return filtered;

    return mockPackages.filter((p) => normProvider(p.provider) === normProvider(activeProvider));
  }, [activeProvider, filtered]);

  const activeProv = providers.find((p) => p.value === activeProvider);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fdf2f7" }}>
      <LandingNavbar />

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={4}>
          {/* ── Page Header ── */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 16px rgba(233,30,140,0.3)",
                }}
              >
                <LocalOfferIcon sx={{ color: "white", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography fontWeight={900} fontSize="1.6rem" color="#2d3748" lineHeight={1.1}>
                  Daftar Harga
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0">
                  Harga transparan, masa aktif jelas, pilih sesuai kebutuhanmu
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* error state */}
          {isError ? (
            <Alert
              severity="error"
              sx={{ borderRadius: 3, border: "1px solid #fce4ec", bgcolor: "white" }}
            >
              Gagal memuat data paket dari API.{" "}
              <Box component="span" sx={{ color: "#64748b" }}>
                {String(error?.message || "")}
              </Box>
              <Box sx={{ mt: 1.5 }}>
                <Button
                  variant="contained"
                  onClick={() => refetch()}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                  }}
                >
                  Coba lagi
                </Button>
              </Box>
            </Alert>
          ) : null}

          {/* ── Provider Selector ── */}
          <Box>
            <Typography
              fontSize="0.75rem"
              fontWeight={700}
              color="#a0aec0"
              textTransform="uppercase"
              letterSpacing="0.8px"
              mb={1.5}
            >
              Pilih Operator
            </Typography>

            <Stack direction="row" gap={2} flexWrap="wrap">
              {providers.map((prov) => {
                const isActive = activeProvider === prov.value;
                return (
                  <Box
                    key={prov.value}
                    onClick={() => setActiveProvider(prov.value)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      px: 2.5,
                      py: 2,
                      minWidth: 90,
                      borderRadius: 3,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: isActive ? `2px solid ${prov.accent}` : "1.5px solid #fce4ec",
                      bgcolor: isActive ? `${prov.accent}0f` : "white",
                      boxShadow: isActive ? `0 4px 14px ${prov.accent}30` : "none",
                      "&:hover": {
                        borderColor: prov.accent,
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 14px ${prov.accent}25`,
                      },
                    }}
                  >
                    <ProviderLogo prov={prov} size={52} />
                    <Typography
                      fontSize="0.78rem"
                      fontWeight={isActive ? 800 : 600}
                      color={isActive ? prov.accent : "#718096"}
                      textAlign="center"
                      lineHeight={1.2}
                    >
                      {prov.label}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* ── Content Area ── */}
          {!activeProvider ? (
            <Card
              sx={{
                borderRadius: 3,
                border: "1.5px dashed #fce4ec",
                bgcolor: "white",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ py: 7, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(233,30,140,0.1), rgba(194,24,91,0.08))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  <TouchAppIcon sx={{ fontSize: 32, color: "#e91e8c" }} />
                </Box>
                <Typography fontWeight={900} fontSize="1.05rem" color="#2d3748" mb={0.75}>
                  Silahkan pilih operator terlebih dahulu
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0" sx={{ maxWidth: 320, mx: "auto" }}>
                  Pilih salah satu operator di atas untuk melihat daftar paket yang tersedia.
                </Typography>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <LoadingSkeleton />
          ) : finalFiltered.length === 0 ? (
            <Card
              sx={{
                borderRadius: 3,
                border: "1px dashed #f48fb1",
                bgcolor: "#fff5f9",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ py: 6, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 4,
                    bgcolor: "rgba(233,30,140,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <WifiIcon sx={{ fontSize: 32, color: "#e91e8c" }} />
                </Box>
                <Typography fontWeight={700} color="#4a5568" mb={0.5}>
                  Belum ada paket {activeProv?.label}
                </Typography>
                <Typography fontSize="0.85rem" color="#a0aec0">
                  Paket akan segera hadir, pantau terus!
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: activeProv?.accent }} />
                <Typography fontSize="0.85rem" color="#718096">
                  Paket{" "}
                  <Box component="span" sx={{ fontWeight: 800, color: activeProv?.accent }}>
                    {activeProv?.label}
                  </Box>
                  <Box component="span" sx={{ color: "#a0aec0" }}>
                    {" "}
                    · {finalFiltered.length} paket tersedia
                  </Box>
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: 2.5,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                }}
              >
                {finalFiltered.map((p) => (
                  <PackageCard key={p.id} p={p} />
                ))}
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
