"use client";
import {
  ArrowBack,
  GitHub,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthSignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    setIsErrorPassword(false);
    setIsErrorUsername(false);
    setErrorPassword("");
    setErrorUsername("");

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username is not empty");
      return;
    }

    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty");
      return;
    }

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false, // khi login fail no se ko redirect ve trang login fail mac dinh cua next auth
    });
    if (!res?.error) {
      router.push("/");
    } else {
      setOpenMessage(true);
      setResMessage(res?.error);
    }
  };

  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            background: "#fff",
            padding: "16px",
          }}
        >
          <div style={{ margin: "20px", width: "100%" }}>
            <Link href="/">
              <ArrowBack />
            </Link>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar>
                <Lock />
              </Avatar>

              <Typography component="h1">Sign in</Typography>
            </Box>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              autoFocus
              error={isErrorUsername}
              helperText={errorUsername}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              error={isErrorPassword}
              helperText={errorPassword}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <Button
              sx={{ my: 3 }}
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleSubmit}
            >
              SIGN IN
            </Button>

            <Divider>Or using</Divider>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <Avatar
                sx={{ cursor: "pointer", bgcolor: "orange" }}
                onClick={() => signIn("github")}
              >
                <GitHub titleAccess="Login with Github" />
              </Avatar>

              <Avatar
                sx={{ cursor: "pointer", bgcolor: "orange" }}
                onClick={() => signIn("google")}
              >
                <Google titleAccess="Login with Google" />
              </Avatar>
            </Box>
          </div>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMessage}
        // autoHideDuration={5000}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert onClose={() => setOpenMessage(false)} severity="error">
          {resMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthSignIn;
