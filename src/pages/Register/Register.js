import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UIContext } from "../../contexts/UIContext";
import axiosInstance from "../../services/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const { showSnackbar } = useContext(UIContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Mínimo 10 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,20}$/;
    return passwordRegex.test(password);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "La contraseña debe tener 10-20 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("api/Authenticate/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === "Success") {
        showSnackbar("Usuario creado correctamente", "success");
        history.push("/login");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      if (error.response && error.response.data) {
        const rawMessage = error.response.data.message || "";
        // Traducir errores del backend a español
        let message;
        if (rawMessage.includes("PasswordTooShort")) {
          message =
            "La contraseña es muy corta. Debe tener al menos 10 caracteres";
        } else if (rawMessage.includes("DuplicateUserName")) {
          message = "El nombre de usuario ya existe";
        } else if (rawMessage.includes("DuplicateEmail")) {
          message = "El correo electrónico ya está registrado";
        } else if (rawMessage.includes("PasswordRequiresUpper")) {
          message = "La contraseña debe contener al menos una letra mayúscula";
        } else if (rawMessage.includes("PasswordRequiresLower")) {
          message = "La contraseña debe contener al menos una letra minúscula";
        } else if (rawMessage.includes("PasswordRequiresDigit")) {
          message = "La contraseña debe contener al menos un número";
        } else if (rawMessage.includes("PasswordRequiresNonAlphanumeric")) {
          message = "La contraseña debe contener al menos un carácter especial";
        } else {
          message = rawMessage || "El usuario ya existe";
        }
        showSnackbar(message, "error");
      } else {
        showSnackbar("Hubo un inconveniente con la transacción", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Dirección de correo"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "REGISTRARME"}
            </Button>
            <Box textAlign="center">
              <Link to="/login" className={classes.link}>
                ¿Ya tiene una cuenta? Inicie sesión
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
