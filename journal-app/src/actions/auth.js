import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "@firebase/auth";
import { updateProfile } from "firebase/auth";
import { types } from "../types/types";
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

//al hacer login se llama a esta función con un disparador, que también dispara la función de login a los 3.5 segundos
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((error) => {
                console.error(error.message);
                dispatch(finishLoading());
                Swal.fire({
                    title: "Error!",
                    text: "No hay usuario que coincida con ese identificador",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };
};

export const startRegistrerWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await updateProfile(auth.currentUser, { displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
        });
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});
//Logout
export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await auth.signOut();
        dispatch(logout());
    };
};

export const logout = () => ({
    type: types.logout,
    //no neceitamos payload ya que en el authreducer ya devuelve un objeto vacio
});
