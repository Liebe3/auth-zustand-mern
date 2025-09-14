import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const INITIALFORM = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(INITIALFORM);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(formData);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "user") {
      navigate("/profile");
    }
    // if (user) {
    //   console.log(user.role);
    // }
  }, [user, navigate]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Login
                </Typography>
              </motion.div>

              <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ width: "100%" }}
              >
                <motion.div variants={itemVariants}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key="login"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <FaSignInAlt />
                          Sign In
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 2 }}
                  >
                    Don’t have an account?{" "}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      style={{ cursor: "pointer", fontWeight: 600 }}
                      onClick={() => navigate("/register")}
                    >
                      Create Account
                    </motion.span>
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
