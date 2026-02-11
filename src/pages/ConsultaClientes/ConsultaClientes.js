import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import MainLayout from '../../components/layout/MainLayout';
import { AuthContext } from '../../contexts/AuthContext';
import { UIContext } from '../../contexts/UIContext';
import axiosInstance from '../../services/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  filterSection: {
    marginBottom: theme.spacing(3),
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  actionButtons: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

const ConsultaClientes = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useContext(AuthContext);
  const { showSnackbar, showDialog } = useContext(UIContext);

  const [filters, setFilters] = useState({
    identificacion: '',
    nombre: '',
  });
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('api/Cliente/Listado', {
        identificacion: filters.identificacion,
        nombre: filters.nombre,
        usuarioId: userId,
      });

      setClientes(response.data || []);
      if (response.data.length === 0) {
        showSnackbar('No se encontraron clientes', 'info');
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      showSnackbar('Hubo un inconveniente con la transacción', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    history.push('/clientes/mantenimiento');
  };

  const handleEdit = (clienteId) => {
    history.push(`/clientes/mantenimiento?id=${clienteId}`);
  };

  const handleDelete = (clienteId) => {
    showDialog(
      'Confirmar eliminación',
      '¿Está seguro que desea eliminar este cliente?',
      async () => {
        try {
          await axiosInstance.delete(`api/Cliente/Eliminar/${clienteId}`);
          showSnackbar('Proceso realizado correctamente', 'success');
          handleSearch(); // Recargar listado
        } catch (error) {
          console.error('Error al eliminar cliente:', error);
          showSnackbar('Hubo un inconveniente con la transacción', 'error');
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
        <Paper className={classes.paper}>
          <Box className={classes.header}>
            <Typography variant="h4" color="primary">
              Consulta de clientes
            </Typography>
          </Box>

          <Box className={classes.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAdd}
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

          <Box className={classes.filterSection}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
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
              <Grid item xs={12} sm={5}>
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
              <Grid item xs={12} sm={2}>
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

          <TableContainer>
            <Table className={classes.table}>
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
                        <div className={classes.actionButtons}>
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
                        </div>
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
