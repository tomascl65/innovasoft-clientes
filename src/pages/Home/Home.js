import { Box, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MainLayout from '../../components/layout/MainLayout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="h3" className={classes.title} color="primary">
            Bienvenido
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Sistema de Gestión de Clientes
          </Typography>
          <Box mt={3}>
            <Typography variant="body1" paragraph>
              Utilice el menú lateral para navegar entre las diferentes secciones del sistema.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Seleccione "Consulta Clientes" para gestionar la información de los clientes.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default Home;
