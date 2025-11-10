// page de connexion
import { useNavigate } from "react-router";
import { useApiFetch } from "../../hooks/useApiFetch";
import type { Users } from "../../types/Types";
import { SignInForm } from "../../ui/forms/signInForm/SignInForm";
import "./signIn.css";


export default function SignIn() {
  const navigate = useNavigate();
  const { fetchApi, isLoading, isError, errorMsg } = useApiFetch<Users>();

  const sendToApi = async (formData: SignInForm) => {
    const response = await fetchApi({
      method: "POST",
      path: "/auth/signin",
      body: formData,
      credentials: "include",
      delai: 2000
    });

    if (response) {
      navigate("/dashboard"); 
    }
  };

  return (
    <main className="signin-page">
      <h1>
        Connectez-vous à votre compte      
      </h1>
      
      <p>Accédez à vos snippets et partagez vos connaissances !</p>

      {isLoading && <p className="loading">Connexion en cours...</p>}
      {isError && (
        <div className="error-message">
          <strong>Erreur de connexion :</strong> {errorMsg || "Email ou mot de passe incorrect."}
        </div>
      )}


      {!isLoading && <SignInForm sendToApi={sendToApi} />}
    </main>
  );
};

