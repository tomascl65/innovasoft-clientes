import { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  Avatar,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  PhotoCamera,
  PersonOutline,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MainLayout from "../../components/layout/MainLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { UIContext } from "../../contexts/UIContext";
import axiosInstance from "../../services/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(2),
  },
  imageUpload: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    display: "flex",
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  required: {
    color: theme.palette.error.main,
  },
}));

const MantenimientoClientes = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { userId } = useContext(AuthContext);
  const { showSnackbar } = useContext(UIContext);

  const [loading, setLoading] = useState(false);
  const [intereses, setIntereses] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Obtener ID del cliente desde URL (si es edición)
  const searchParams = new URLSearchParams(location.search);
  const clienteId = searchParams.get("id");
  const isEdit = Boolean(clienteId);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    identificacion: "",
    telefonoCelular: "",
    otroTelefono: "",
    direccion: "",
    fNacimiento: "",
    fAfiliacion: "",
    sexo: "",
    resenaPersonal: "",
    imagen: "",
    interesesId: "",
  });

  // Cargar intereses
  useEffect(() => {
    const loadIntereses = async () => {
      try {
        const response = await axiosInstance.get("api/Intereses/Listado");
        const interesesData = Array.isArray(response.data) ? response.data : [];
        setIntereses(interesesData);
      } catch (error) {
        console.error("Error al cargar intereses:", error);
        showSnackbar("Error al cargar los intereses", "error");
      }
    };
    loadIntereses();
  }, [showSnackbar]);

  // Cargar datos del cliente si es edición
  useEffect(() => {
    if (isEdit && clienteId) {
      const loadCliente = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `api/Cliente/Obtener/${clienteId}`,
          );
          const cliente = response.data;

          setFormData({
            nombre: cliente.nombre || "",
            apellidos: cliente.apellidos || "",
            identificacion: cliente.identificacion || "",
            telefonoCelular: cliente.telefonoCelular || "",
            otroTelefono: cliente.otroTelefono || "",
            direccion: cliente.direccion || "",
            fNacimiento: cliente.fNacimiento
              ? cliente.fNacimiento.split("T")[0]
              : "",
            fAfiliacion: cliente.fAfiliacion
              ? cliente.fAfiliacion.split("T")[0]
              : "",
            sexo: cliente.sexo || "",
            resenaPersonal: cliente.resenaPersonal || "",
            imagen: cliente.imagen || "",
            interesesId: cliente.interesesId || "",
          });

          if (cliente.imagen) {
            setImagePreview(`data:image/jpeg;base64,${cliente.imagen}`);
          }
        } catch (error) {
          console.error("Error al cargar cliente:", error);
          showSnackbar("Error al cargar los datos del cliente", "error");
        } finally {
          setLoading(false);
        }
      };
      loadCliente();
    }
  }, [isEdit, clienteId, showSnackbar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        showSnackbar("Por favor seleccione un archivo de imagen", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setFormData((prev) => ({
          ...prev,
          imagen: base64String,
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = "El nombre no debe exceder 50 caracteres";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son requeridos";
    } else if (formData.apellidos.length > 100) {
      newErrors.apellidos = "Los apellidos no deben exceder 100 caracteres";
    }

    if (!formData.identificacion.trim()) {
      newErrors.identificacion = "La identificación es requerida";
    } else if (formData.identificacion.length > 20) {
      newErrors.identificacion =
        "La identificación no debe exceder 20 caracteres";
    }

    if (!formData.telefonoCelular.trim()) {
      newErrors.telefonoCelular = "El teléfono celular es requerido";
    } else if (formData.telefonoCelular.length > 20) {
      newErrors.telefonoCelular =
        "El teléfono celular no debe exceder 20 caracteres";
    }

    if (!formData.otroTelefono.trim()) {
      newErrors.otroTelefono = "El otro teléfono es requerido";
    } else if (formData.otroTelefono.length > 20) {
      newErrors.otroTelefono = "El otro teléfono no debe exceder 20 caracteres";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    } else if (formData.direccion.length > 200) {
      newErrors.direccion = "La dirección no debe exceder 200 caracteres";
    }

    if (!formData.fNacimiento) {
      newErrors.fNacimiento = "La fecha de nacimiento es requerida";
    }

    if (!formData.fAfiliacion) {
      newErrors.fAfiliacion = "La fecha de afiliación es requerida";
    }

    if (!formData.sexo || formData.sexo.trim() === "") {
      newErrors.sexo = "El sexo es requerido";
    }

    if (!formData.resenaPersonal.trim()) {
      newErrors.resenaPersonal = "La reseña personal es requerida";
    } else if (formData.resenaPersonal.length > 200) {
      newErrors.resenaPersonal =
        "La reseña personal no debe exceder 200 caracteres";
    }

    if (!formData.interesesId) {
      newErrors.interesesId = "Los intereses son requeridos";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showSnackbar("Por favor corrija los errores en el formulario", "error");
      return;
    }

    setLoading(true);

    try {
      if (isEdit) {
        // Actualizar cliente
        const updateData = {
          id: clienteId,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          identificacion: formData.identificacion,
          celular: formData.telefonoCelular,
          otroTelefono: formData.otroTelefono,
          direccion: formData.direccion,
          fNacimiento: formData.fNacimiento
            ? formData.fNacimiento + "T00:00:00"
            : null,
          fAfiliacion: formData.fAfiliacion
            ? formData.fAfiliacion + "T00:00:00"
            : null,
          sexo: formData.sexo,
          resennaPersonal: formData.resenaPersonal,
          imagen: formData.imagen || "",
          interesFK: formData.interesesId,
          usuarioId: userId,
        };
        console.log("Enviando datos de actualización:", updateData);
        await axiosInstance.post("api/Cliente/Actualizar", updateData);
      } else {
        // Crear cliente
        await axiosInstance.post("api/Cliente/Crear", {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          identificacion: formData.identificacion,
          celular: formData.telefonoCelular,
          otroTelefono: formData.otroTelefono,
          direccion: formData.direccion,
          fNacimiento: formData.fNacimiento
            ? formData.fNacimiento + "T00:00:00"
            : null,
          fAfiliacion: formData.fAfiliacion
            ? formData.fAfiliacion + "T00:00:00"
            : null,
          sexo: formData.sexo,
          resennaPersonal: formData.resenaPersonal,
          imagen: formData.imagen || "",
          interesFK: formData.interesesId,
          usuarioId: userId,
        });
      }

      showSnackbar("Proceso realizado correctamente", "success");
      history.push("/clientes/consulta");
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      showSnackbar("Hubo un inconveniente con la transacción", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.push("/clientes/consulta");
  };

  if (loading && isEdit) {
    return (
      <MainLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Box className={classes.header}>
            <Avatar className={classes.avatar} src={imagePreview}>
              {!imagePreview && <PersonOutline style={{ fontSize: 60 }} />}
            </Avatar>
            <Box>
              <Typography variant="h4" color="primary">
                Mantenimiento de clientes
              </Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  Cargar imagen (Opcional)
                </Typography>
              </label>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Identificación */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Identificación <span className={classes.required}>*</span>
                    </span>
                  }
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}
                  error={Boolean(errors.identificacion)}
                  helperText={errors.identificacion}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>

              {/* Nombre */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Nombre <span className={classes.required}>*</span>
                    </span>
                  }
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              {/* Apellidos */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Apellidos <span className={classes.required}>*</span>
                    </span>
                  }
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  error={Boolean(errors.apellidos)}
                  helperText={errors.apellidos}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>

              {/* Fecha de Nacimiento */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label={
                    <span>
                      Fecha de nacimiento{" "}
                      <span className={classes.required}>*</span>
                    </span>
                  }
                  name="fNacimiento"
                  value={formData.fNacimiento}
                  onChange={handleChange}
                  error={Boolean(errors.fNacimiento)}
                  helperText={errors.fNacimiento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Fecha de Afiliación */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label={
                    <span>
                      Fecha de afiliación{" "}
                      <span className={classes.required}>*</span>
                    </span>
                  }
                  name="fAfiliacion"
                  value={formData.fAfiliacion}
                  onChange={handleChange}
                  error={Boolean(errors.fAfiliacion)}
                  helperText={errors.fAfiliacion}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Género */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label={
                    <span>
                      Género <span className={classes.required}>*</span>
                    </span>
                  }
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  error={Boolean(errors.sexo)}
                  helperText={errors.sexo}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Femenino</MenuItem>
                </TextField>
              </Grid>

              {/* Intereses */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label={
                    <span>
                      Interés <span className={classes.required}>*</span>
                    </span>
                  }
                  name="interesesId"
                  value={formData.interesesId}
                  onChange={handleChange}
                  error={Boolean(errors.interesesId)}
                  helperText={errors.interesesId}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  {Array.isArray(intereses) &&
                    intereses.map((interes) => (
                      <MenuItem key={interes.id} value={interes.id}>
                        {interes.descripcion}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              {/* Teléfono Celular */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Teléfono Celular{" "}
                      <span className={classes.required}>*</span>
                    </span>
                  }
                  name="telefonoCelular"
                  value={formData.telefonoCelular}
                  onChange={handleChange}
                  error={Boolean(errors.telefonoCelular)}
                  helperText={errors.telefonoCelular}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>

              {/* Teléfono Otro */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Teléfono Otro <span className={classes.required}>*</span>
                    </span>
                  }
                  name="otroTelefono"
                  value={formData.otroTelefono}
                  onChange={handleChange}
                  error={Boolean(errors.otroTelefono)}
                  helperText={errors.otroTelefono}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>

              {/* Dirección */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={
                    <span>
                      Dirección <span className={classes.required}>*</span>
                    </span>
                  }
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  error={Boolean(errors.direccion)}
                  helperText={errors.direccion}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>

              {/* Reseña */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label={
                    <span>
                      Reseña <span className={classes.required}>*</span>
                    </span>
                  }
                  name="resenaPersonal"
                  value={formData.resenaPersonal}
                  onChange={handleChange}
                  error={Boolean(errors.resenaPersonal)}
                  helperText={errors.resenaPersonal}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
            </Grid>

            <Box className={classes.buttonGroup}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Guardar"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                disabled={loading}
              >
                Regresar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default MantenimientoClientes;
