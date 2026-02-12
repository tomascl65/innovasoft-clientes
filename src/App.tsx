import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ConfirmDialog from './components/common/ConfirmDialog';
import GlobalSnackbar from './components/common/GlobalSnackbar';
import PrivateRoute from './components/common/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import ConsultaClientes from './pages/ConsultaClientes/ConsultaClientes';
import Error404 from './pages/Error404/Error404';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MantenimientoClientes from './pages/MantenimientoClientes/MantenimientoClientes';
import Register from './pages/Register/Register';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <UIProvider>
          <Router>
            <Switch>
              {/* Rutas públicas */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {/* Rutas protegidas */}
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/clientes/consulta" component={ConsultaClientes} />
              <PrivateRoute
                exact
                path="/clientes/mantenimiento"
                component={MantenimientoClientes}
              />

              {/* Redirección inicial */}
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>

              {/* Página de error 404 */}
              <Route component={Error404} />
            </Switch>

            {/* Componentes globales de UI */}
            <GlobalSnackbar />
            <ConfirmDialog />
          </Router>
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
