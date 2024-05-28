import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";
import { actionType } from "../context/reducer";
import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(firebaseAuth, provider);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        const user = userCred.user;
        const token = await user.getIdToken();

        const data = await validateUser(token);
        dispatch({
          type: actionType.SET_USER,
          user: data,
        });

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setAuth(false);
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative w-screen h-screen">
      <img
        src={LoginBg}
        type="img/png"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md 
        flex flex-col items-center justify-center"
        >
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md 
          bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FcGoogle />
            Sign in Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
