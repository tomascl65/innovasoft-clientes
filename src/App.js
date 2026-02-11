import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import PrivateRoute from './components/common/PrivateRoute';
import GlobalSnackbar from './components/common/GlobalSnackbar';
import ConfirmDialog from './components/common/ConfirmDialog';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';
import ConsultaClientes from './pages/ConsultaClientes/ConsultaClientes';
import MantenimientoClientes from './pages/MantenimientoClientes/MantenimientoClientes';

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
              <PrivateRoute exact path="/clientes/mantenimiento" component={MantenimientoClientes} />

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
