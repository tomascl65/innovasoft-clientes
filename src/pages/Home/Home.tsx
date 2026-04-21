import { Box, Container, Paper, Typography } from '@mui/material';
import MainLayout from '../../components/layout/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Paper
          elevation={2}
          sx={{
            padding: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginBottom: 2,
            }}
          >
            ¡Bienvenido!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Sistema de Gestión de Clientes
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" paragraph>
              Utilice el menú lateral para navegar entre las diferentes secciones del sistema.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seleccione "Consulta Clientes" para gestionar la información de los clientes.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default Home;
