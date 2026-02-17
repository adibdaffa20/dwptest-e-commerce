import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "../hooks/useSession";
import { customersApi } from "../api/customers";
import {
  Box, Button, Card, CardContent, Stack, TextField,
  Typography, Snackbar, Alert, Avatar, Divider,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SaveIcon from "@mui/icons-material/Save";

function InfoPill({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" gap={1.25}
      sx={{
        bgcolor: "rgba(233,30,140,0.06)",
        border: "1px solid rgba(233,30,140,0.15)",
        borderRadius: 2, px: 2, py: 1.25,
        flex: 1, minWidth: 0,
      }}
    >
      <Box sx={{
        width: 32, height: 32, borderRadius: 1.5, flexShrink: 0,
        background: "linear-gradient(135deg, #e91e8c, #c2185b)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 3px 8px rgba(233,30,140,0.25)",
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography fontSize="0.7rem" color="#a0aec0" fontWeight={600} textTransform="uppercase" letterSpacing="0.5px">
          {label}
        </Typography>
        <Typography fontSize="0.875rem" fontWeight={800} color="#2d3748" noWrap>
          {value || "-"}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function ProfilePage() {
  const qc = useQueryClient();
  const session = getSession();
  const customerId = session?.user?.customerId;

  const { data: customer } = useQuery({
    queryKey: ["customerMe", customerId],
    queryFn: () => customersApi.get(customerId),
    enabled: !!customerId,
  });

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const mut = useMutation({
    mutationFn: ({ id, payload }) => customersApi.update(id, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["customerMe", customerId] });
      setToast({ open: true, msg: "Profil berhasil disimpan!", type: "success" });
    },
    onError: (e) => setToast({ open: true, msg: e?.message || "Gagal simpan profil", type: "error" }),
  });

  if (customer && form.email === "") {
    setForm({ name: customer.name || "", phone: customer.phone || "", email: customer.email || "" });
  }

  const initials = form.name
    ? form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <Stack spacing={3}>

      {/* ── Header banner ── */}
      <Card sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
        boxShadow: "0 8px 32px rgba(233,30,140,0.25)",
        overflow: "hidden",
        position: "relative",
      }}>
        <Box sx={{
          position: "absolute", top: -50, right: -50,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", filter: "blur(40px)", pointerEvents: "none",
        }} />
        <CardContent sx={{ p: 3, position: "relative" }}>
          <Stack direction="row" alignItems="center" gap={2.5}>
            <Avatar sx={{
              width: 64, height: 64,
              fontSize: "1.4rem", fontWeight: 900,
              bgcolor: "rgba(255,255,255,0.25)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}>
              {initials}
            </Avatar>
            <Box>
              <Typography fontWeight={900} fontSize="1.2rem" color="white" lineHeight={1.2}>
                {form.name || "Pengguna Kuotify"}
              </Typography>
              <Typography fontSize="0.82rem" color="rgba(255,255,255,0.75)" mt={0.25}>
                {form.email || "—"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Info pills ── */}
      <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
        <InfoPill
          icon={<BadgeIcon sx={{ color: "white", fontSize: 16 }} />}
          label="Customer ID"
          value={`#${customerId}`}
        />
        <InfoPill
          icon={<EmojiEventsIcon sx={{ color: "white", fontSize: 16 }} />}
          label="Tier"
          value={customer?.tier}
        />
      </Stack>

      {/* ── Edit form ── */}
      <Card sx={{
        borderRadius: 3,
        border: "1px solid #fce4ec",
        boxShadow: "none",
        bgcolor: "white",
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography fontWeight={800} fontSize="0.95rem" color="#2d3748" mb={0.5}>
            Edit Profil
          </Typography>
          <Typography fontSize="0.8rem" color="#a0aec0" mb={2.5}>
            Perbarui informasi akun kamu di bawah ini.
          </Typography>

          <Divider sx={{ borderColor: "#fce4ec", mb: 2.5 }} />

          <Stack spacing={2}>
            <TextField
              label="Nama Lengkap"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
            <TextField
              label="No. HP / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />

            <Button
              variant="contained"
              disabled={mut.isPending}
              startIcon={<SaveIcon />}
              onClick={() => mut.mutate({ id: customerId, payload: { ...form } })}
              sx={{
                mt: 0.5,
                py: 1.4, borderRadius: 2.5,
                fontWeight: 700, fontSize: "0.95rem", textTransform: "none",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                boxShadow: "0 6px 18px rgba(233,30,140,0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #d81b60, #ad1457)",
                  boxShadow: "0 8px 24px rgba(233,30,140,0.45)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": { opacity: 0.6 },
                transition: "all 0.2s ease",
              }}
            >
              {mut.isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f48fb1" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#e91e8c" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
};