import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth";
import LandingNavbar from "../components/LandingNavbar";
import { setSession } from "../hooks/useSession";
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, Stack, InputAdornment, Divider, Chip
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f48fb1" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e91e8c",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
};

const dummyAccounts = [
  { email: "alya@mail.com",  password: "1234" },
  { email: "bima@mail.com",  password: "1234" },
];

export default function LoginPage() {
  const nav = useNavigate();
  const [email,    setEmail]    = useState("alya@mail.com");
  const [password, setPassword] = useState("1234");
  const [err,      setErr]      = useState("");

  const mut = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => { setSession(res); nav("/app", { replace: true }); },
    onError:   (e)   => setErr(e?.message || "Gagal login."),
  });

  const handleLogin = () => { setErr(""); mut.mutate({ email, password }); };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fdf2f7" }}>
      <LandingNavbar />

      <Box sx={{
        maxWidth: 460,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
      }}>
        <Stack spacing={3}>

          {/* Header */}
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: 3,
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 2,
              boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
            }}>
              <LoginIcon sx={{ color: "white", fontSize: 30 }} />
            </Box>
            <Typography fontWeight={900} fontSize="1.75rem" color="#2d3748" lineHeight={1.15} mb={0.75}>
              Selamat Datang!
            </Typography>
            <Typography fontSize="0.9rem" color="#a0aec0">
              Masuk untuk mulai beli paket data dengan mudah
            </Typography>
          </Box>

          {/* Form Card */}
          <Card sx={{
            borderRadius: 4,
            border: "1px solid #fce4ec",
            bgcolor: "white",
            boxShadow: "0 8px 32px rgba(233,30,140,0.08)",
          }}>
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Stack spacing={2.5}>

                {/* Error Alert */}
                {err && (
                  <Alert
                    icon={<ErrorOutlineIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      borderRadius: 2.5,
                      bgcolor: "#fff5f5",
                      border: "1px solid rgba(239,68,68,0.25)",
                      color: "#dc2626",
                      fontSize: "0.85rem",
                      "& .MuiAlert-icon": { color: "#dc2626", alignItems: "center" },
                    }}
                  >
                    {err}
                  </Alert>
                )}

                {/* Email */}
                <TextField
                  label="Email"
                  placeholder="nama@email.com"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "#e91e8c", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />

                {/* Password */}
                <TextField
                  label="Password"
                  placeholder="Masukkan password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#e91e8c", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />

                {/* Login Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={!mut.isPending && <ArrowForwardIcon />}
                  disabled={mut.isPending}
                  onClick={handleLogin}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    background: mut.isPending
                      ? "#f48fb1"
                      : "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                    boxShadow: mut.isPending ? "none" : "0 6px 20px rgba(233,30,140,0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
                      boxShadow: "0 10px 28px rgba(233,30,140,0.5)",
                      transform: "translateY(-1px)",
                    },
                    "&.Mui-disabled": {
                      background: "#f8bbd9",
                      color: "white",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  {mut.isPending ? "Memproses..." : "Masuk Sekarang"}
                </Button>

                {/* Dummy Accounts */}
                <Box sx={{
                  borderRadius: 2.5,
                  bgcolor: "#fff0f7",
                  border: "1px solid rgba(233,30,140,0.15)",
                  p: 2,
                }}>
                  <Stack direction="row" alignItems="center" gap={0.75} mb={1.25}>
                    <InfoOutlinedIcon sx={{ fontSize: 16, color: "#e91e8c" }} />
                    <Typography fontSize="0.8rem" fontWeight={700} color="#c2185b">
                      Akun Demo
                    </Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {dummyAccounts.map((acc) => (
                      <Box
                        key={acc.email}
                        onClick={() => { setEmail(acc.email); setPassword(acc.password); }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 1.5, py: 1,
                          borderRadius: 2,
                          border: "1px solid rgba(233,30,140,0.15)",
                          bgcolor: email === acc.email ? "rgba(233,30,140,0.08)" : "white",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": { bgcolor: "rgba(233,30,140,0.08)", borderColor: "#f48fb1" },
                        }}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          <PersonOutlineIcon sx={{ fontSize: 16, color: "#e91e8c" }} />
                          <Typography fontSize="0.8rem" fontWeight={600} color="#4a5568">
                            {acc.email}
                          </Typography>
                        </Stack>
                        <Chip
                          label="Klik pakai"
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            bgcolor: email === acc.email ? "rgba(233,30,140,0.15)" : "transparent",
                            color: "#e91e8c",
                            border: "1px solid rgba(233,30,140,0.3)",
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>

              </Stack>
            </CardContent>
          </Card>

          {/* Divider + Register Link */}
          <Stack direction="row" alignItems="center" gap={2}>
            <Divider sx={{ flex: 1, borderColor: "#fce4ec" }} />
            <Typography fontSize="0.8rem" color="#a0aec0">atau</Typography>
            <Divider sx={{ flex: 1, borderColor: "#fce4ec" }} />
          </Stack>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => nav("/daftar")}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              color: "#e91e8c",
              borderColor: "#f48fb1",
              "&:hover": {
                borderColor: "#e91e8c",
                bgcolor: "#fff0f7",
                transform: "translateY(-1px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Belum punya akun? Daftar
          </Button>

          {/* Footer brand */}
          <Stack direction="row" alignItems="center" justifyContent="center" gap={0.75}>
            <Box sx={{
              width: 24, height: 24, borderRadius: 1,
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <SignalCellularAltIcon sx={{ color: "white", fontSize: 14 }} />
            </Box>
            <Typography fontSize="0.8rem" color="#a0aec0">
              © 2025 <strong style={{ color: "#e91e8c" }}>Kuotify</strong> — Beli paket data cepat
            </Typography>
          </Stack>

        </Stack>
      </Box>
    </Box>
  );
}