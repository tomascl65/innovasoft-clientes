import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorOutline } from '@material-ui/icons';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    fontSize: 100,
    color: theme.palette.primary.main,
  },
  errorCode: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    margin: theme.spacing(2, 0),
  },
}));

const Error404 = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);

  const handleGoBack = () => {
    if (isAuthenticated) {
      history.push('/home');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <ErrorOutline className={classes.icon} />
          <Typography className={classes.errorCode}>404</Typography>
          <Typography variant="h5" gutterBottom>
            Oops... Page Not Found!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            La página que está buscando no existe o ha sido movida.
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGoBack}
            >
              {isAuthenticated ? 'Volver a Inicio' : 'Ir al Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Error404;
