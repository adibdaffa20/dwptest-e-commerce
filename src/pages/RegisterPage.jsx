import {
  Box, Card, CardContent, Stack, TextField,
  Typography, Button, Alert, InputAdornment, Divider
} from "@mui/material";
import LandingNavbar from "../components/LandingNavbar";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

const inputSx = {
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
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#e91e8c",
  },
};

export default function RegisterPage() {
  const nav = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fdf2f7" }}>
      <LandingNavbar />

      <Box sx={{
        maxWidth: 480,
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
              <AppRegistrationIcon sx={{ color: "white", fontSize: 30 }} />
            </Box>
            <Typography fontWeight={900} fontSize="1.75rem" color="#2d3748" lineHeight={1.15} mb={0.75}>
              Buat Akun Baru
            </Typography>
            <Typography fontSize="0.9rem" color="#a0aec0">
              Daftar sekarang dan mulai beli paket data dengan mudah
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

                {/* Nama */}
                <TextField
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#e91e8c", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />

                {/* No HP */}
                <TextField
                  label="No. HP / WhatsApp"
                  placeholder="Contoh: 081234567890"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon sx={{ color: "#e91e8c", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />

                {/* Email */}
                <TextField
                  label="Email"
                  placeholder="nama@email.com"
                  type="email"
                  fullWidth
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
                  placeholder="Minimal 8 karakter"
                  type="password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#e91e8c", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />

                {/* Info Alert */}
                <Alert
                  icon={<InfoOutlinedIcon sx={{ fontSize: 18, color: "#e91e8c" }} />}
                  sx={{
                    borderRadius: 2.5,
                    bgcolor: "#fff0f7",
                    border: "1px solid rgba(233,30,140,0.2)",
                    color: "#c2185b",
                    fontSize: "0.82rem",
                    py: 1,
                    "& .MuiAlert-icon": { alignItems: "center" },
                  }}
                >
                  Untuk demo, gunakan akun dummy di menu <strong>Masuk</strong>.
                </Alert>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => nav("/masuk")}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                    boxShadow: "0 6px 20px rgba(233,30,140,0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
                      boxShadow: "0 10px 28px rgba(233,30,140,0.5)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Daftar Sekarang
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Divider + Login Link */}
          <Stack direction="row" alignItems="center" gap={2}>
            <Divider sx={{ flex: 1, borderColor: "#fce4ec" }} />
            <Typography fontSize="0.8rem" color="#a0aec0">atau</Typography>
            <Divider sx={{ flex: 1, borderColor: "#fce4ec" }} />
          </Stack>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => nav("/masuk")}
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
            Sudah punya akun? Masuk
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