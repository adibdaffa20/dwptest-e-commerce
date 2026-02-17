import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "../api/packages";
import { useCart } from "../hooks/useCart";
import {
  Alert, Box, Button, Card, CardContent, Chip,
  Divider, MenuItem, Snackbar, Stack, TextField, Typography, Skeleton,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BoltIcon from "@mui/icons-material/Bolt";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WifiIcon from "@mui/icons-material/Wifi";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TuneIcon from "@mui/icons-material/Tune";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function money(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(n || 0);
}

function parseGB(quota) {
  const s = String(quota || "").toUpperCase().trim();
  const m = s.match(/(\d+(\.\d+)?)/);
  if (!m) return null;
  const val = Number(m[1]);
  return Number.isNaN(val) ? null : val;
}

const providers = [
  { label: "Semua",     value: "all",       logo: null,                              accent: "#e91e8c" },
  { label: "Telkomsel", value: "Telkomsel", logo: "/assets/telkomsel.png", accent: "#ef1414" },
  { label: "by.U", value: "by.U", logo: "/assets/byU.png", accent: "#0bcaff" },
  { label: "Indosat", value: "Indosat", logo: "/assets/indosat.png", accent: "#ffbf35" },
  { label: "Smartfren", value: "Smartfren", logo: "/assets/smartfren.png", accent: "#c2185b" },
  { label: "Tri", value: "Tri", logo: "/assets/tri.jpg", accent: "#e91e8c" },
  { label: "XL", value: "XL", logo: "/assets/xl.png", accent: "#0050a0" },
  { label: "Axis", value: "Axis", logo: "/assets/axis.png", accent: "#8b5cf6" },
];

function ProviderLogo({ prov, size = 36 }) {
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
    <Box sx={{
      width: size, height: size, borderRadius: 1.5,
      background: `linear-gradient(135deg, ${prov.accent}, ${prov.accent}bb)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Typography color="white" fontWeight={900} fontSize={size * 0.28}>
        {prov.label === "Semua" ? "✦" : prov.label.slice(0, 2).toUpperCase()}
      </Typography>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5, fontSize: "0.9rem", bgcolor: "white",
    transition: "all 0.2s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f48fb1" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e91e8c", borderWidth: 2 },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
};

function SkeletonCard() {
  return (
    <Card sx={{ borderRadius: 3, border: "1px solid #fce4ec" }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" mb={1.5}>
          <Stack direction="row" gap={1}>
            <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
            <Box>
              <Skeleton width={110} height={18} />
              <Skeleton width={80} height={14} sx={{ mt: 0.5 }} />
            </Box>
          </Stack>
          <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 99 }} />
        </Stack>
        <Skeleton height={1} sx={{ mb: 1.5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton width={90} height={26} />
          <Skeleton variant="rounded" width={120} height={36} sx={{ borderRadius: 2 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

const norm = (v) =>
  String(v || "").toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

const providerMetaMap = providers.reduce((acc, p) => {
  acc[norm(p.value)] = { label: p.label, accent: p.accent };
  return acc;
}, {});

function getProviderMeta(providerName) {
  const key = norm(providerName);
  return providerMetaMap[key] || { label: providerName || "-", accent: "#a0aec0" };
}

function PkgCard({ p, qty, onQty, onAdd, isTopPick }) {
  return (
    <Card sx={{
      borderRadius: 3,
      border: isTopPick ? "2px solid #e91e8c" : "1px solid #fce4ec",
      bgcolor: "white", position: "relative", overflow: "visible",
      transition: "all 0.25s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: isTopPick ? "0 12px 32px rgba(233,30,140,0.2)" : "0 8px 24px rgba(233,30,140,0.1)",
      },
    }}>
      {isTopPick && (
        <Box sx={{
          position: "absolute", top: -12, left: 16,
          background: "linear-gradient(135deg, #e91e8c, #c2185b)",
          color: "white", fontSize: "0.68rem", fontWeight: 800,
          px: 1.5, py: 0.4, borderRadius: 99,
          boxShadow: "0 4px 10px rgba(233,30,140,0.4)",
          display: "flex", alignItems: "center", gap: 0.5,
        }}>
          <StarIcon sx={{ fontSize: 11 }} /> TOP PICK
        </Box>
      )}
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1.5}>
          <Stack direction="row" gap={1.25} alignItems="center">
            <Box sx={{
              width: 40, height: 40, borderRadius: 2, flexShrink: 0,
              background: isTopPick ? "linear-gradient(135deg, #e91e8c, #c2185b)" : "rgba(233,30,140,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isTopPick ? "0 4px 10px rgba(233,30,140,0.3)" : "none",
            }}>
              <WifiIcon sx={{ fontSize: 20, color: isTopPick ? "white" : "#e91e8c" }} />
            </Box>
            <Box>
        <Typography fontWeight={800} fontSize="0.95rem" color="#2d3748">
            {p.name}
        </Typography>

        {/* ✅ Provider label: • Indosat (warna sesuai) */}
        {p.provider && (() => {
            const meta = getProviderMeta(p.provider);
            return (
            <Stack direction="row" alignItems="center" gap={0.75} mt={0.25}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: meta.accent }} />
                <Typography fontSize="0.75rem" fontWeight={800} sx={{ color: meta.accent }}>
                {meta.label}
                </Typography>
            </Stack>
            );
        })()}

        <Stack direction="row" gap={1.5} mt={0.5}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <WifiIcon sx={{ fontSize: 12, color: "#e91e8c" }} />
                  <Typography fontSize="0.75rem" color="#4a5568" fontWeight={600}>{p.quota}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <CalendarTodayIcon sx={{ fontSize: 11, color: "#a0aec0" }} />
                  <Typography fontSize="0.75rem" color="#718096">{p.validityDays} hari</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          {p.tag && (
            <Chip size="small" label={p.tag} sx={{
              bgcolor: "rgba(233,30,140,0.08)", color: "#e91e8c", fontWeight: 700,
              fontSize: "0.68rem", border: "1px solid rgba(233,30,140,0.2)", flexShrink: 0,
            }} />
          )}
        </Stack>
        <Divider sx={{ borderColor: "#fce4ec", mb: 1.5 }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Box>
            <Typography fontWeight={900} fontSize="1.05rem" sx={{
              background: "linear-gradient(135deg, #e91e8c, #c2185b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {money(p.price)}
            </Typography>
            {p._ppg && (
              <Typography fontSize="0.68rem" color="#a0aec0" mt={0.1}>
                ~{money(Math.round(p._ppg))}/GB
              </Typography>
            )}
          </Box>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Box sx={{
              display: "flex", alignItems: "center",
              border: "1px solid #fce4ec", borderRadius: 2,
              overflow: "hidden", bgcolor: "#fff5f9",
            }}>
              <Box component="button" onClick={() => onQty(qty - 1)} sx={{
                width: 30, height: 34, border: "none", cursor: "pointer",
                bgcolor: "transparent", color: "#e91e8c",
                display: "flex", alignItems: "center", justifyContent: "center",
                "&:hover": { bgcolor: "rgba(233,30,140,0.08)" }, transition: "background 0.2s",
              }}>
                <RemoveIcon sx={{ fontSize: 14 }} />
              </Box>
              <Typography sx={{ px: 1.25, minWidth: 28, textAlign: "center", fontWeight: 700, fontSize: "0.875rem", color: "#2d3748" }}>
                {qty}
              </Typography>
              <Box component="button" onClick={() => onQty(qty + 1)} sx={{
                width: 30, height: 34, border: "none", cursor: "pointer",
                bgcolor: "transparent", color: "#e91e8c",
                display: "flex", alignItems: "center", justifyContent: "center",
                "&:hover": { bgcolor: "rgba(233,30,140,0.08)" }, transition: "background 0.2s",
              }}>
                <AddIcon sx={{ fontSize: 14 }} />
              </Box>
            </Box>
            <Button
              variant="contained" size="small"
              startIcon={<AddShoppingCartIcon sx={{ fontSize: "16px !important" }} />}
              onClick={onAdd}
              sx={{
                borderRadius: 2, py: 0.9, px: 1.5,
                fontWeight: 700, fontSize: "0.8rem", textTransform: "none",
                background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                boxShadow: "0 4px 12px rgba(233,30,140,0.35)",
                whiteSpace: "nowrap",
                "&:hover": { background: "linear-gradient(135deg, #d81b60, #ad1457)", transform: "translateY(-1px)" },
                transition: "all 0.2s ease",
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ShopPage() {
  const { add } = useCart();

  const { data: pkgs = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["packagesActiveV2"],
    queryFn: packagesApi.listActive,
  });

  const [activeProvider, setActiveProvider] = useState("all");
  const [q,           setQ]           = useState("");
  const [tag,         setTag]         = useState("all");
  const [validity,    setValidity]    = useState("all");
  const [sortBy,      setSortBy]      = useState("best");
  const [maxPrice,    setMaxPrice]    = useState("");
  const [qtyMap,      setQtyMap]      = useState({});
  const [toast,       setToast]       = useState({ open: false, msg: "", type: "success" });
  const [showFilter,  setShowFilter]  = useState(false);

  const tags = useMemo(() => {
    const uniq = new Set(pkgs.map((p) => (p.tag || "").trim()).filter(Boolean));
    return ["all", ...Array.from(uniq)];
  }, [pkgs]);

  const normalize = (v) =>
  String(v || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\./g, "");

const filtered = useMemo(() => {
  const s = q.trim().toLowerCase();
  const mp = maxPrice ? Number(maxPrice) : null;

  let data = [...pkgs];

  // ✅ SEARCH
  if (s) {
    data = data.filter((p) =>
      [p.name, p.quota, p.tag, p.provider]
        .some((x) => String(x || "").toLowerCase().includes(s))
    );
  }

  // ✅ TAG
  if (tag !== "all") {
    data = data.filter((p) => String(p.tag || "").trim() === tag);
  }

  // ✅ VALIDITY
  if (validity !== "all") {
    data = data.filter((p) => Number(p.validityDays) === Number(validity));
  }

  // ✅ MAX PRICE
  if (mp && !Number.isNaN(mp)) {
    data = data.filter((p) => Number(p.price || 0) <= mp);
  }

  // ✅ PROVIDER FILTER (normalisasi)
  if (activeProvider !== "all") {
    data = data.filter(
      (p) => normalize(p.provider) === normalize(activeProvider)
    );
  }

  // ✅ HITUNG VALUE
  const withValue = data.map((p) => {
    const gb = parseGB(p.quota);
    const price = Number(p.price || 0);
    return {
      ...p,
      _gb: gb,
      _ppg: gb ? price / gb : null,
    };
  });

  // ✅ SORT
  switch (sortBy) {
    case "low":
      withValue.sort((a, b) => a.price - b.price);
      break;
    case "high":
      withValue.sort((a, b) => b.price - a.price);
      break;
    case "validity":
      withValue.sort((a, b) => a.validityDays - b.validityDays);
      break;
    default:
      // best value
      withValue.sort((a, b) => {
        const ap = a._ppg ?? Infinity;
        const bp = b._ppg ?? Infinity;
        return ap !== bp ? ap - bp : a.price - b.price;
      });
  }

  // 🔥 CASE: SEMUA PROVIDER → ambil 1 terbaik per provider
  // 🔥 CASE: SEMUA PROVIDER → ambil 2 terbaik per provider (total 14)
if (activeProvider === "all") {
  const grouped = new Map(); // key -> array

  for (const pkg of withValue) {
    const key = normalize(pkg.provider);
    if (!key) continue;

    const arr = grouped.get(key) || [];
    if (arr.length < 2) {
      arr.push(pkg);          // ambil 2 pertama (karena sudah tersortir)
      grouped.set(key, arr);
    }
  }

  // flatten
  return Array.from(grouped.values()).flat();
}

  return withValue;

}, [pkgs, activeProvider, q, tag, validity, sortBy, maxPrice]);

  const topPickIds = useMemo(() => {
  // mode all: semua yang tampil adalah top pick (harusnya 14)
  if (activeProvider === "all") return new Set(filtered.map((p) => p.id));

  // mode provider: top 2 dari list yang sudah tersortir
  return new Set(filtered.slice(0, 2).map((p) => p.id));
}, [filtered, activeProvider]);

  const activeProv = providers.find((p) => p.value === activeProvider);
  const hasFilter = q || tag !== "all" || validity !== "all" || sortBy !== "best" || maxPrice;

  function getQty(id) { return Math.max(1, Number(qtyMap[id] || 1)); }
  function setQty(id, v) { setQtyMap((prev) => ({ ...prev, [id]: Math.max(1, Number(v || 1)) })); }
  function handleAdd(p) {
    add(p, getQty(p.id));
    setToast({ open: true, msg: `${getQty(p.id)}× ${p.name} ditambahkan ke cart!`, type: "success" });
  }
  function resetFilter() {
    setQ(""); setTag("all"); setValidity("all"); setSortBy("best"); setMaxPrice("");
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
        }} />
        <CardContent sx={{ py: 3, px: 3, position: "relative" }}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" gap={2}>
            <Box>
              <Stack direction="row" spacing={1} mb={1.25}>
                <Chip size="small" icon={<BoltIcon sx={{ color: "white !important", fontSize: "14px !important" }} />} label="Checkout cepat"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 600, fontSize: "0.72rem", border: "1px solid rgba(255,255,255,0.3)" }} />
                <Chip size="small" icon={<LocalOfferIcon sx={{ color: "white !important", fontSize: "14px !important" }} />} label="Harga hemat"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 600, fontSize: "0.72rem", border: "1px solid rgba(255,255,255,0.3)" }} />
              </Stack>
              <Typography fontWeight={900} fontSize={{ xs: "1.4rem", sm: "1.6rem" }} color="white" lineHeight={1.2}>
                Shop Paket Data
              </Typography>
              <Typography fontSize="0.875rem" sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5 }}>
                Pilih operator, cari paket, lalu tambah ke cart.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* ── PROVIDER TABS ── */}
      <Card sx={{ borderRadius: 3, border: "1px solid #fce4ec", bgcolor: "white", boxShadow: "none" }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Typography fontSize="0.72rem" fontWeight={700} color="#a0aec0"
            textTransform="uppercase" letterSpacing="0.8px" mb={1.5}>
            Pilih Operator
          </Typography>
          <Stack direction="row" gap={1.25} flexWrap="wrap">
            {providers.map((prov) => {
              const isActive = activeProvider === prov.value;
              return (
                <Box
                  key={prov.value}
                  onClick={() => setActiveProvider(prov.value)}
                  sx={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75,
                    px: 1.75, py: 1.25, minWidth: 64,
                    borderRadius: 2.5, cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isActive ? `2px solid ${prov.accent}` : "1.5px solid #fce4ec",
                    bgcolor: isActive ? `${prov.accent}0f` : "white",
                    boxShadow: isActive ? `0 4px 14px ${prov.accent}30` : "none",
                    "&:hover": { borderColor: prov.accent, transform: "translateY(-2px)", boxShadow: `0 4px 14px ${prov.accent}25` },
                  }}
                >
                  <ProviderLogo prov={prov} size={40} />
                  <Typography
                    fontSize="0.7rem" fontWeight={isActive ? 800 : 600}
                    color={isActive ? prov.accent : "#718096"}
                    textAlign="center" lineHeight={1.2}
                  >
                    {prov.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {/* ── FILTER (collapsible) ── */}
      <Card sx={{ borderRadius: 3, border: "1px solid #fce4ec", bgcolor: "white", boxShadow: "0 4px 16px rgba(233,30,140,0.06)" }}>
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={showFilter ? 2 : 0}>
            <Stack direction="row" alignItems="center" gap={1}>
              <TuneIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
              <Typography fontWeight={700} fontSize="0.9rem" color="#2d3748">Filter & Urutkan</Typography>
              {hasFilter && (
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#e91e8c" }} />
              )}
            </Stack>
            <Button
              size="small" onClick={() => setShowFilter((v) => !v)}
              sx={{ color: "#e91e8c", fontWeight: 600, textTransform: "none", fontSize: "0.8rem" }}
            >
              {showFilter ? "Sembunyikan" : "Tampilkan"}
            </Button>
          </Stack>

          {showFilter && (
            <Stack spacing={1.75}>
              <TextField
                placeholder="Cari nama paket, quota, tag..."
                value={q} onChange={(e) => setQ(e.target.value)} fullWidth
                InputProps={{ startAdornment: <SearchIcon sx={{ color: q ? "#e91e8c" : "#a0aec0", fontSize: 20, mr: 1 }} /> }}
                sx={inputSx}
              />
              <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" } }}>
                <TextField select label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} sx={inputSx}>
                  {tags.map((t) => <MenuItem key={t} value={t}>{t === "all" ? "Semua Tag" : t}</MenuItem>)}
                </TextField>
                <TextField select label="Masa Aktif" value={validity} onChange={(e) => setValidity(e.target.value)} sx={inputSx}>
                  <MenuItem value="all">Semua</MenuItem>
                  <MenuItem value="1">1 hari</MenuItem>
                  <MenuItem value="7">7 hari</MenuItem>
                  <MenuItem value="30">30 hari</MenuItem>
                </TextField>
                <TextField select label="Urutkan" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={inputSx}>
                  <MenuItem value="best">Best Value</MenuItem>
                  <MenuItem value="low">Termurah</MenuItem>
                  <MenuItem value="high">Termahal</MenuItem>
                  <MenuItem value="validity">Masa Aktif</MenuItem>
                </TextField>
                <TextField label="Maks. Harga" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="cth: 50000" sx={inputSx} />
              </Box>
              {hasFilter && (
                <Button size="small" onClick={resetFilter} sx={{ color: "#e91e8c", fontWeight: 600, textTransform: "none", fontSize: "0.8rem", p: 0, alignSelf: "flex-start", "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}>
                  × Reset semua filter
                </Button>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* ── CONTENT ── */}
      {isLoading ? (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          {[1,2,3,4].map((i) => <SkeletonCard key={i} />)}
        </Box>
      ) : isError ? (
        <Card sx={{ borderRadius: 3, border: "1px solid #fce4ec" }}>
          <CardContent sx={{ py: 4, textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: 3, mx: "auto", mb: 2, bgcolor: "rgba(233,30,140,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <WifiIcon sx={{ fontSize: 28, color: "#e91e8c" }} />
            </Box>
            <Typography fontWeight={700} color="#2d3748" mb={0.5}>Gagal memuat paket</Typography>
            <Typography fontSize="0.85rem" color="#a0aec0" mb={2}>Pastikan json-server berjalan di <b>localhost:3001</b></Typography>
            <Button variant="contained" onClick={() => refetch()} startIcon={<RefreshIcon />}
              sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700, background: "linear-gradient(135deg, #e91e8c, #c2185b)", boxShadow: "0 4px 14px rgba(233,30,140,0.35)" }}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card sx={{ borderRadius: 3, border: "1px dashed #f48fb1", bgcolor: "#fff5f9" }}>
          <CardContent sx={{ py: 5, textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: 3, mx: "auto", mb: 2, bgcolor: "rgba(233,30,140,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SearchIcon sx={{ fontSize: 28, color: "#e91e8c" }} />
            </Box>
            <Typography fontWeight={700} color="#2d3748" mb={0.5}>
              {activeProvider !== "all" ? `Belum ada paket ${activeProv?.label}` : "Paket tidak ditemukan"}
            </Typography>
            <Typography fontSize="0.85rem" color="#a0aec0" mb={2}>
              {activeProvider !== "all" ? "Coba pilih operator lain" : "Coba ubah filter atau kata kunci pencarian"}
            </Typography>
            <Button onClick={() => { setActiveProvider("all"); resetFilter(); }}
              sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600, color: "#e91e8c", border: "1px solid #f48fb1", "&:hover": { bgcolor: "#fff0f7" } }}>
              Reset Filter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2.5}>
          {/* result info */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              {activeProvider !== "all" && activeProv && (
                <>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: activeProv.accent }} />
                  <Typography fontSize="0.85rem" color="#718096">
                    <Box component="span" sx={{ fontWeight: 800, color: activeProv.accent }}>{activeProv.label}</Box>
                    {" · "}
                  </Typography>
                </>
              )}
              <Typography fontSize="0.85rem" color="#718096">
                <strong style={{ color: "#e91e8c" }}>{filtered.length}</strong> paket
                {topPickIds.size > 0 && <> · <strong style={{ color: "#e91e8c" }}>{topPickIds.size}</strong> top pick</>}
              </Typography>
            </Stack>
          </Stack>

          {/* grid */}
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            {filtered.map((p) => (
              <PkgCard key={p.id} p={p} qty={getQty(p.id)} onQty={(v) => setQty(p.id, v)} onAdd={() => handleAdd(p)} isTopPick={topPickIds.has(p.id)} />
            ))}
          </Box>
        </Stack>
      )}

      {/* ── TOAST ── */}
      <Snackbar open={toast.open} autoHideDuration={1800} onClose={() => setToast((t) => ({ ...t, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={toast.type} onClose={() => setToast((t) => ({ ...t, open: false }))}
          sx={{ borderRadius: 3, fontWeight: 600, bgcolor: "#fff0f7", color: "#c2185b", border: "1px solid rgba(233,30,140,0.2)", "& .MuiAlert-icon": { color: "#e91e8c" } }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}