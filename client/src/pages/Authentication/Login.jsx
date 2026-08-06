import { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Divider,
  Link,
} from "@mui/material";

import {
  EmailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
  ArrowForwardRounded,
  SecurityRounded,
} from "@mui/icons-material";

import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

  };

  return (

    <AuthLayout>

      <Paper
        elevation={0}
        className="auth-card"
      >

        <div className="auth-badge">

          <SecurityRounded />

          Enterprise Secure Login

        </div>

        <Typography className="auth-card-title">

          Welcome Back 👋

        </Typography>

        <Typography className="auth-card-subtitle">

          Sign in to access your AI SOP Management Portal.

        </Typography>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-form-group">

            <label className="auth-label">

              Email Address

            </label>

            <TextField

              fullWidth

              name="email"

              placeholder="name@company.com"

              value={formData.email}

              onChange={handleChange}

              InputProps={{

                startAdornment: (

                  <InputAdornment position="start">

                    <EmailRounded />

                  </InputAdornment>

                ),

              }}

            />

          </div>

          <div className="auth-form-group">

            <label className="auth-label">

              Password

            </label>

            <TextField

              fullWidth

              name="password"

              placeholder="Enter password"

              type={showPassword ? "text" : "password"}

              value={formData.password}

              onChange={handleChange}

              InputProps={{

                startAdornment: (

                  <InputAdornment position="start">

                    <LockRounded />

                  </InputAdornment>

                ),

                endAdornment: (

                  <InputAdornment position="end">

                    <IconButton

                      className="auth-password-btn"

                      onClick={() =>

                        setShowPassword(!showPassword)

                      }

                    >

                      {showPassword ? (

                        <VisibilityOff />

                      ) : (

                        <Visibility />

                      )}

                    </IconButton>

                  </InputAdornment>

                ),

              }}

            />

          </div>
                    <div className="auth-options">

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />
              }
              label="Remember Me"
            />

            <Link
              href="/forgot-password"
              underline="none"
              className="auth-forgot"
            >
              Forgot Password?
            </Link>

          </div>

          <Button
            type="submit"
            className="auth-btn auth-btn-primary"
            endIcon={<ArrowForwardRounded />}
          >
            Sign In
          </Button>

          <div className="auth-divider">

            OR CONTINUE WITH

          </div>

          <div className="social-buttons">

            <Button
              className="social-btn"
              fullWidth
            >
              <img
                src="https://www.svgrepo.com/show/355037/microsoft.svg"
                alt="Microsoft"
                width="22"
              />

              Microsoft

            </Button>

            <Button
              className="social-btn"
              fullWidth
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width="22"
              />

              Google

            </Button>

          </div>

          <div className="security-box">

            <div className="security-icon">

              <SecurityRounded />

            </div>

            <div className="security-content">

              <h4>

                Enterprise Security

              </h4>

              <p>

                Your account is protected with
                Multi-Factor Authentication,
                Role Based Access Control,
                encrypted communication
                and complete audit logging.

              </p>

            </div>

          </div>

          <div className="auth-register">

            <span>

              Don't have an account?

            </span>

            <Link
              href="/register"
              underline="none"
            >

              Register Now

            </Link>

          </div>

          <div className="auth-footer">

            © 2026 AI SOP Management Portal

          </div>

        </form>

      </Paper>

    </AuthLayout>


  );

}