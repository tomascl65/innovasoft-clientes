import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Container,
  IconButton,
  Paper,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { UIContext } from '../../contexts/UIContext';
import axiosInstance from '../../services/axios';
import { LoginResponse } from '../../types';

interface LoginFormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);

  if (!authContext || !uiContext) {
    throw new Error('Login must be used within AuthProvider and UIProvider');
  }

  const { login } = authContext;
  const { showSnackbar } = uiContext;

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Flag para evitar actualizaciones de estado en componente desmontado
  const mountedRef = useRef(true);

  useEffect(() => {
    // Cleanup: marcar como desmontado
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Cargar username guardado si existe
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setFormData((prev) => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post<LoginResponse>('api/Authenticate/login', {
        username: formData.username,
        password: formData.password,
      });

      const { token, userid, username, expiration } = response.data;

      // Guardar username si "Recuérdame" está marcado
      if (rememberMe) {
        localStorage.setItem('savedUsername', username);
      } else {
        localStorage.removeItem('savedUsername');
      }

      // Login
      login(token, userid, username, expiration, rememberMe);

      showSnackbar('Inicio de sesión exitoso', 'success');
      history.push('/home');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error en login:', axiosError);
      if (axiosError.response && axiosError.response.data) {
        showSnackbar('Credenciales incorrectas', 'error');
      } else {
        showSnackbar('Hubo un inconveniente con la transacción', 'error');
      }
    } finally {
      // Solo actualizar estado si el componente sigue montado
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              marginTop: 1,
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
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
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={handleRememberMeChange} color="primary" />
              }
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
            >
              {loading ? <CircularProgress size={24} /> : 'INICIAR SESIÓN'}
            </Button>
            <Box textAlign="center">
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Box sx={{ color: 'primary.main' }}>¿No tiene una cuenta? Regístrese</Box>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
