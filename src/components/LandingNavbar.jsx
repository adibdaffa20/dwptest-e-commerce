import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";

const links = [
  { label: "Riwayat", to: "/riwayat" },
  { label: "Daftar Harga", to: "/daftar-harga" },
  { label: "Daftar", to: "/daftar" },
  { label: "Masuk", to: "/masuk" },
];

export default function LandingNavbar() {
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // auto close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  const cta = links.find((x) => x.label === "Masuk");
  const nonCta = links.filter((x) => x.label !== "Masuk");

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: scrolled ? "#fce4ec" : "transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(233,30,140,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 4 },
            minHeight: { xs: 64, sm: 70 },
            gap: 1,
          }}
        >
          {/* Left: Hamburger (mobile) */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              mr: 0.5,
              borderRadius: 2,
              bgcolor: scrolled ? "rgba(233,30,140,0.06)" : "transparent",
              "&:hover": { bgcolor: "rgba(233,30,140,0.10)" },
            }}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
        <Box
        component={RouterLink}
        to="/"
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            textDecoration: "none",
            minWidth: 0,
        }}
        >
        {/* Icon */}
        <Box
            sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(233,30,140,0.35)",
            flexShrink: 0,
            }}
        >
            <SignalCellularAltIcon sx={{ color: "white", fontSize: 20 }} />
        </Box>

        {/* Text */}
        <Stack
            spacing={0}
            justifyContent="center"
            sx={{
            lineHeight: 1,
            }}
        >
            <Typography
            sx={{
                fontWeight: 900,
                fontSize: { xs: "1.15rem", sm: "1.25rem" },
                letterSpacing: "-0.3px",
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
            >
            Kuotify
            </Typography>

            <Typography
            sx={{
                fontSize: "0.68rem",
                color: "#a0aec0",
                lineHeight: 1.6,
            }}
            >
            Beli paket data cepat
            </Typography>
        </Stack>
        </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {links.map((x) => {
              const isActive = loc.pathname === x.to;
              const isCTA = x.label === "Masuk";

              return isCTA ? (
                <Button
                  key={x.to}
                  component={RouterLink}
                  to={x.to}
                  variant="contained"
                  sx={{
                    ml: 1,
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                    boxShadow: "0 4px 14px rgba(233,30,140,0.4)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
                      boxShadow: "0 6px 20px rgba(233,30,140,0.5)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Masuk
                </Button>
              ) : (
                <Button
                  key={x.to}
                  component={RouterLink}
                  to={x.to}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2.5,
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    color: isActive ? "#e91e8c" : "#4a5568",
                    bgcolor: isActive ? "rgba(233,30,140,0.08)" : "transparent",
                    position: "relative",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(233,30,140,0.12)" : "rgba(233,30,140,0.06)",
                      color: "#e91e8c",
                    },
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 20,
                          height: 3,
                          borderRadius: 99,
                          bgcolor: "#e91e8c",
                        }
                      : {},
                    transition: "all 0.2s ease",
                  }}
                >
                  {x.label}
                </Button>
              );
            })}
          </Box>

          {/* Mobile CTA (Masuk) */}
          <Button
            component={RouterLink}
            to={cta?.to || "/masuk"}
            startIcon={<LoginIcon />}
            variant="contained"
            sx={{
              display: { xs: "inline-flex", md: "none" },
              px: 2,
              py: 1,
              borderRadius: 3,
              fontWeight: 800,
              fontSize: "0.82rem",
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              boxShadow: "0 4px 14px rgba(233,30,140,0.35)",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #d81b60 0%, #ad1457 100%)",
              },
            }}
          >
            Masuk
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(233,30,140,0.35)",
                }}
              >
                <SignalCellularAltIcon sx={{ color: "white", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography fontWeight={900} lineHeight={1.1}>Kuotify</Typography>
                <Typography variant="caption" color="#94a3b8" lineHeight={1}>
                  Beli paket data cepat
                </Typography>
              </Box>
            </Stack>

            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2, borderColor: "#fce4ec" }} />

          <List sx={{ p: 0 }}>
            {nonCta.map((x) => {
              const active = loc.pathname === x.to;
              return (
                <ListItemButton
                  key={x.to}
                  component={RouterLink}
                  to={x.to}
                  sx={{
                    borderRadius: 2.5,
                    mb: 0.75,
                    bgcolor: active ? "rgba(233,30,140,0.08)" : "transparent",
                    "&:hover": { bgcolor: "rgba(233,30,140,0.08)" },
                  }}
                >
                  <ListItemText
                    primary={x.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 800 : 600,
                      color: active ? "#e91e8c" : "#334155",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ my: 2, borderColor: "#fce4ec" }} />

          <Button
            component={RouterLink}
            to={cta?.to || "/masuk"}
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            sx={{
              py: 1.25,
              borderRadius: 3,
              fontWeight: 800,
              textTransform: "none",
              background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
              boxShadow: "0 6px 18px rgba(233,30,140,0.35)",
              "&:hover": { background: "linear-gradient(135deg, #d81b60, #ad1457)" },
            }}
          >
            Masuk
          </Button>

          <Button
            component={RouterLink}
            to="/daftar"
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              py: 1.15,
              borderRadius: 3,
              fontWeight: 700,
              textTransform: "none",
              color: "#e91e8c",
              borderColor: "#f48fb1",
              "&:hover": { borderColor: "#e91e8c", bgcolor: "#fff0f7" },
            }}
          >
            Daftar
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
