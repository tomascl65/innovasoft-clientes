import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Error404: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Error404 must be used within an AuthProvider');
  }

  const { isAuthenticated } = authContext;

  const handleGoBack = () => {
    if (isAuthenticated) {
      history.push('/home');
    } else {
      history.push('/login');
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
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: 'center',
          }}
        >
          <ErrorOutline
            sx={{
              fontSize: 100,
              color: 'primary.main',
            }}
          />
          <Typography
            sx={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: 'primary.main',
              margin: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            Oops... Page Not Found!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            La página que está buscando no existe o ha sido movida.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleGoBack}>
              {isAuthenticated ? 'Volver a Inicio' : 'Ir al Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Error404;
