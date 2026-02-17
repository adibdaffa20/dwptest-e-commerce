import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { clearSession, getSession } from "../hooks/useSession";
import { useCart } from "../hooks/useCart";

export default function CustomerLayout() {
  const nav = useNavigate();
  const loc = useLocation();
  const session = getSession();
  const { count } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // scroll behavior like LandingNavbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- ROUTE BASE (sesuai router baru: /app/..)
  // kalau kamu tidak pakai /app, ubah base jadi ""
  const base = "/app";

  const value = useMemo(() => {
    const p = loc.pathname;

    if (p === base || p === `${base}/`) return base;
    if (p.startsWith(`${base}/shop`)) return `${base}/shop`;
    if (p.startsWith(`${base}/checkout`)) return `${base}/checkout`;
    if (p.startsWith(`${base}/transactions`)) return `${base}/transactions`;
    return `${base}/profile`;
  }, [loc.pathname]);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    clearSession();
    nav("/", { replace: true }); // balik ke login publik (sesuai landing flow)
    handleCloseMenu();
  };

  const initials = (session?.user?.name || "A").trim().charAt(0).toUpperCase();

  return (
    <Box sx={{ minHeight: "100vh", pb: 8, bgcolor: "#fdf2f7" }}>
      {/* Navbar (match LandingNavbar) */}
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
          {/* Brand (same style as footer/landing logo) */}
          <Box
            component={RouterLink}
            to={base}
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              textDecoration: "none",
            }}
          >
            <Stack direction="row" alignItems="center" gap={1.25}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(233,30,140,0.3)",
                }}
              >
                <SignalCellularAltIcon sx={{ color: "white", fontSize: 18 }} />
              </Box>

              <Box>
                <Typography
                  fontWeight={900}
                  fontSize="1rem"
                  sx={{
                    lineHeight: 1.1,
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Kuotify
                </Typography>
                <Typography fontSize="0.7rem" color="#a0aec0" sx={{ lineHeight: 1.2 }}>
                  Beli paket data cepat
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* User Chip */}
          <Box
            onClick={handleOpenMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              cursor: "pointer",
              px: 1.5,
              py: 0.9,
              borderRadius: 3,
              border: "1px solid #fce4ec",
              bgcolor: "#fff5f9",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(233,30,140,0.08)",
                borderColor: "rgba(233,30,140,0.25)",
              },
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                fontSize: "0.85rem",
                fontWeight: 800,
                boxShadow: "0 2px 8px rgba(233,30,140,0.25)",
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" }, minWidth: 0 }}>
              <Typography
                noWrap
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "#2d3748",
                  lineHeight: 1.2,
                  maxWidth: 180,
                }}
              >
                {session?.user?.name || "Customer"}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#e91e8c", fontWeight: 600, lineHeight: 1.2 }}>
                Customer
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                fontSize: 18,
                color: "#e91e8c",
                transition: "transform 0.2s ease",
                transform: Boolean(anchorEl) ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>

          {/* Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 230,
                borderRadius: 3,
                border: "1px solid #fce4ec",
                boxShadow: "0 8px 32px rgba(233,30,140,0.12)",
                "& .MuiList-root": { py: 1 },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2.5, py: 1.5 }}>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, color: "#2d3748" }}>
                {session?.user?.name || "Customer"}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                {session?.user?.email || "customer@kuotify.com"}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#fce4ec" }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.4,
                px: 2.5,
                mt: 0.5,
                mx: 1,
                borderRadius: 2,
                color: "#e91e8c",
                "&:hover": { bgcolor: "#fff5f9" },
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: 18, color: "#e91e8c" }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700 }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
        <Outlet />
      </Box>

      {/* Bottom Nav */}
      <Paper
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          borderTop: "1px solid #fce4ec",
          bgcolor: "white",
        }}
        elevation={0}
      >
        <BottomNavigation
          value={value}
          onChange={(_, v) => nav(v)}
          showLabels
          sx={{
            height: 72,
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 1, sm: 2 },
            bgcolor: "white",
            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
              color: "#b0bec5",
              transition: "all 0.2s ease",
              borderRadius: 2,
              mx: 0.5,
              "&.Mui-selected": {
                color: "#e91e8c",
                bgcolor: "rgba(233,30,140,0.08)",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.72rem",
                  fontWeight: 800,
                },
              },
              "&:hover": { bgcolor: "rgba(233,30,140,0.06)" },
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.68rem",
                fontWeight: 600,
                mt: 0.5,
              },
            },
          }}
        >
          <BottomNavigationAction label="Home" value={base} icon={<HomeIcon />} />
          <BottomNavigationAction label="Shop" value={`${base}/shop`} icon={<StorefrontIcon />} />
          <BottomNavigationAction
            label="Cart"
            value={`${base}/checkout`}
            icon={
              <Badge
                badgeContent={count}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    color: "white",
                    fontSize: "0.62rem",
                    height: 17,
                    minWidth: 17,
                    fontWeight: 800,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            }
          />
          <BottomNavigationAction label="Transaksi" value={`${base}/transactions`} icon={<ReceiptLongIcon />} />
          <BottomNavigationAction label="Profil" value={`${base}/profile`} icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
