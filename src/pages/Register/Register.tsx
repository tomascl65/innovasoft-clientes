import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import axiosInstance from '../../services/axios';
import { AxiosError } from 'axios';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

interface RegisterResponse {
  status: string;
  message?: string;
}

interface ErrorResponse {
  message?: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const uiContext = useContext(UIContext);

  if (!uiContext) {
    throw new Error('Register must be used within a UIProvider');
  }

  const { showSnackbar } = uiContext;

  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Flag para evitar actualizaciones de estado en componente desmontado
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Mínimo 10 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,20}$/;
    return passwordRegex.test(password);
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'La contraseña debe tener 10-20 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número';
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
      const response = await axiosInstance.post<RegisterResponse>('api/Authenticate/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 'Success') {
        showSnackbar('Usuario creado correctamente', 'success');
        history.push('/login');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error en registro:', axiosError);
      if (axiosError.response && axiosError.response.data) {
        const rawMessage = axiosError.response.data.message || '';
        // Traducir errores del backend a español
        let message: string;
        if (rawMessage.includes('PasswordTooShort')) {
          message = 'La contraseña es muy corta. Debe tener al menos 10 caracteres';
        } else if (rawMessage.includes('DuplicateUserName')) {
          message = 'El nombre de usuario ya existe';
        } else if (rawMessage.includes('DuplicateEmail')) {
          message = 'El correo electrónico ya está registrado';
        } else if (rawMessage.includes('PasswordRequiresUpper')) {
          message = 'La contraseña debe contener al menos una letra mayúscula';
        } else if (rawMessage.includes('PasswordRequiresLower')) {
          message = 'La contraseña debe contener al menos una letra minúscula';
        } else if (rawMessage.includes('PasswordRequiresDigit')) {
          message = 'La contraseña debe contener al menos un número';
        } else if (rawMessage.includes('PasswordRequiresNonAlphanumeric')) {
          message = 'La contraseña debe contener al menos un carácter especial';
        } else {
          message = rawMessage || 'El usuario ya existe';
        }
        showSnackbar(message, 'error');
      } else {
        showSnackbar('Hubo un inconveniente con la transacción', 'error');
      }
    } finally {
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
            Registro
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
              disabled={loading}
              sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
            >
              {loading ? <CircularProgress size={24} /> : 'REGISTRARME'}
            </Button>
            <Box textAlign="center">
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Box sx={{ color: 'primary.main' }}>¿Ya tiene una cuenta? Inicie sesión</Box>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
