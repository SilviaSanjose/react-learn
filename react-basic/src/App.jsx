import React from "react"; // no es necesario desde la versión 17
import logo from "./logo.svg";
//import "./App.css";
import "./sass/main.scss";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import ComponentF from "./pages/Component";
import Propiedades from "./pages/Propiedades";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Rutas from "./pages/Rutas";
import Api from "./pages/Api";
import MyPage from "./context/MyPage";
import Songs from "./pages/Songs";

function App() {
  const idRoute = Math.round(Math.random() * 10);

  return (
    <>
      <div className="App">
        <Router>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
              <Link exact to="/componentes">
                Componentes
              </Link>
              <Link exact to="/propiedades">
                Propiedades
              </Link>
              <Link exact to={`/rutas/${idRoute}/${idRoute + 5}`}>
                Rutas Dinámicas
              </Link>
              {/* <Link exact to={`/rutas?start=${idRoute}&end=${idRoute + 5}`}>
                Rutas Dinámicas
              </Link> */}{" "}
              {/*ruta con useLocation() */}
              <Link exact to="/api">
                Api
              </Link>
              <Link exact to="/context">
                Context
              </Link>
              <Link exact to="/canciones">
                Canciones
              </Link>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/componentes" component={ComponentF} />
              <Route
                exact
                path="/propiedades"
                children={
                  <Propiedades msg="Mensaje creado desde la app principal como propiedad." />
                }
              />
              <Route path="/rutas/:routeename/:id" component={Rutas} />
              {/*ruta con useParams() */}
              <Route path="/rutas" component={Rutas} />
              {/*ruta con useLocation() */}

              <Route exact path="/api" component={Api} />

              <Route exact path="/context" component={MyPage} />
              <Route exact path="/canciones" component={Songs}></Route>

              <Route path="*" component={Error404} />
            </Switch>
          </main>
        </Router>
        <footer className="footer">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
