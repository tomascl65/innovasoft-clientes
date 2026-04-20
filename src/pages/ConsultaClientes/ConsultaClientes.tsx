import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { AuthContext } from '../../contexts/AuthContext';
import { UIContext } from '../../contexts/UIContext';
import axiosInstance from '../../services/axios';
import { Cliente } from '../../types';

interface Filters {
  identificacion: string;
  nombre: string;
}

const ConsultaClientes: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);

  if (!authContext || !uiContext) {
    throw new Error('ConsultaClientes must be used within AuthProvider and UIProvider');
  }

  const { userId } = authContext;
  const { showSnackbar, showDialog } = uiContext;

  const [filters, setFilters] = useState<Filters>({
    identificacion: '',
    nombre: '',
  });
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  // Flag para evitar actualizaciones de estado en componente desmontado
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<Cliente[]>('api/Cliente/Listado', {
        identificacion: filters.identificacion,
        nombre: filters.nombre,
        usuarioId: userId,
      });

      if (mountedRef.current) {
        setClientes(response.data || []);
        if (response.data.length === 0) {
          showSnackbar('No se encontraron clientes', 'info');
        }
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      showSnackbar('Hubo un inconveniente con la transacción', 'error');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleAdd = () => {
    history.push('/clientes/mantenimiento');
  };

  const handleEdit = (clienteId: number) => {
    history.push(`/clientes/mantenimiento?id=${clienteId}`);
  };

  const handleDelete = (clienteId: number) => {
    showDialog(
      'Confirmar eliminación',
      '¿Está seguro que desea eliminar este cliente?',
      async () => {
        try {
          await axiosInstance.delete(`api/Cliente/Eliminar/${clienteId}`);
          showSnackbar('Proceso realizado correctamente', 'success');
          handleSearch(); // Recargar listado
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error('Error al eliminar cliente:', axiosError);
          if (axiosError.response && axiosError.response.status === 405) {
            showSnackbar('Error de configuración del servidor (405): Método no permitido', 'error');
          } else {
            showSnackbar('Hubo un inconveniente con la transacción', 'error');
          }
        }
      }
    );
  };

  const handleBack = () => {
    history.push('/home');
  };

  // Cargar listado inicial
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Paper
          sx={{
            padding: { xs: 2, sm: 3 },
            marginBottom: 2,
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
            >
              Consulta de clientes
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              fullWidth={window.innerWidth < 600}
            >
              Agregar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Regresar
            </Button>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  variant="outlined"
                  size="small"
                  value={filters.nombre}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  fullWidth
                  label="Identificación"
                  name="identificacion"
                  variant="outlined"
                  size="small"
                  value={filters.identificacion}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Buscar'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Identificación</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nombre completo</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Acciones</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No hay clientes para mostrar
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>{cliente.identificacion}</TableCell>
                      <TableCell>
                        {cliente.nombre} {cliente.apellidos}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(cliente.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleDelete(cliente.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default ConsultaClientes;
