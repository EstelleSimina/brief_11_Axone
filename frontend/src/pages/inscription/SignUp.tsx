// page d'inscription
import { useNavigate } from "react-router";
import { useApiFetch } from "../../hooks/useApiFetch";
import type { Users } from "../../types/Types";
import { SignUpForm } from "../../ui/forms/signUpForm/SignUpForm";
// import logo_title from "../../assets/logo_title.png";
import "./signUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { fetchApi, isLoading, isError, errorMsg } = useApiFetch<Users>();

  const sendToApi = async (formData: SignUpForm) => {
    const { passwordVerify, ...userData } = formData; 

    const response = await fetchApi({
      method: "POST",
      path: "/auth/signup",
      body: userData,
      credentials: "include",
      delai: 2000
    });

    if (response) {
      navigate("/connexion"); 
    }
  };

  return (
    <main className="signup-page">
      <h1>
        Créez votre compte
      </h1>
      {/* <img src={logo_title} alt="logo Axone" className="logo-signup" /> */}
      <p>Rejoignez la communauté pour partager vos snippets de code</p>

      {isLoading && <p className="loading">Création du compte en cours...</p>}
      {isError && (
        <div className="error-message">
          <strong>Erreur :</strong> {errorMsg}
        </div>
      )}

      {!isLoading && <SignUpForm sendToApi={sendToApi} />}
    </main>
  );
};
