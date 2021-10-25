import React from "react";

const LoginScreen = ({ history }) => {
    //history es una props que viene con react router
    const handleLogin = () => {
        console.log("login");
        // history.push("/"); //redirige con push a la home
        history.replace("/"); //reemplaza con replace con la home evitando la última página visitada al reemplazarla.
        //así al volver atrás, en caso, no volvera al login
    };
    return (
        <div className="container mt-5">
            <h1>Login</h1>

            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginScreen;