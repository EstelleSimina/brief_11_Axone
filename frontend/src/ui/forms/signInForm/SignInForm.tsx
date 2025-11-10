import { Button } from "../../components/button/Button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import './signInForm.css'

export interface SignInForm {
  email: string;
  password: string;
}

interface SignInFormProps {
  sendToApi: (formData: SignInForm) => void;
}

const defaultValues: SignInForm = {
  email: "",
  password: "",
};

export const SignInForm = ({ sendToApi }: SignInFormProps) => {
  const [signInForm, setSignInForm] = useState<SignInForm>(defaultValues);

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignInForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page
    
    if (!signInForm.email || !signInForm.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError(null);
    sendToApi(signInForm);
  };

  return (
    <form onSubmit={handleFormSubmit} className="signin-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={signInForm.email}
          onChange={(event) => handleInputChange(event)}
          placeholder="toto@exemple.fr"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={signInForm.password}
          onChange={(event) => handleInputChange(event)}
          placeholder="••••••••••••"
          required
        />
      </div>

      {error && <p className="form-client-error">{error}</p>}

      <Button type="submit">Se connecter</Button>
    </form>
  );
};
