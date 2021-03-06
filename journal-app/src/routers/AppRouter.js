import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/note";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setCheking] = useState(true); //para comprobar si está cargada la autenticación(si ha acabado de llamar a firebase y devolver el login)
    const [isLoggedIn, setisLoggedIn] = useState(false); //cambia si esta logueado o no

    useEffect(() => {
        const auth = getAuth();
        //comprueba si hay cambios en el usuario
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                //si user tiene algo y existe uid, guarda nuevamente los datos. Asi puedo hacer una comprobación de si el usuario esta logueado o no y mantener los datos al
                //recargar la página
                dispatch(login(user.uid, user.displayName));
                setisLoggedIn(true); //esta logueado
                dispatch(startLoadingNotes(user.uid)); //llamar a función carga las notas del usuario
            } else {
                setisLoggedIn(false); //no esta logueado
            }

            setCheking(false); //si hay cambios en el usuario, es que ha ya devuelto el login, por lo que ya no esta cargando
        });
    }, [dispatch, setCheking]);

    //si cheking=true, está esperando respuesta de firebase y se muestra pantalla de Loading.redirige a la pantalla de login
    if (checking) {
        return <div> Loading... </div>;
    }

    //una vez checking=false, se muestra la pantalla de JournalScreen
    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route
                        path="/auth"
                        component={AuthRouter}
                        isLoggedIn={isLoggedIn}
                    /> */}
                    <PublicRoutes
                        path="/auth"
                        component={AuthRouter}
                        isLoggedIn={isLoggedIn}
                    />

                    {/* <Route
                        exact
                        path="/"
                        component={JournalScreen}
                        isLoggedIn={isLoggedIn}
                    /> */}
                    <PrivateRoutes
                        exact
                        path="/"
                        component={JournalScreen}
                        isLoggedIn={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
