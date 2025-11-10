import { Button } from "../../components/button/Button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import './signUpform.css'

export interface SignUpForm {
  email: string;
  username: string;
  password: string;
  passwordVerify: string;
}

interface SignUpFormProps {
  sendToApi: (formData: SignUpForm) => void;
}

const defaultValues: SignUpForm = {
  email: "",
  username: "",
  password: "",
  passwordVerify: "",
};

export const SignUpForm = ({ sendToApi }: SignUpFormProps) => {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>(defaultValues);

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignUpForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

  if (signUpForm.password !== signUpForm.passwordVerify) {
    setError("Les mots de passe ne correspondent pas.");
    return; 
    }

    setError(null);
    sendToApi(signUpForm);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={signUpForm.email}
          onChange={handleInputChange}
          placeholder="toto@exemple.fr"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pseudo">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={signUpForm.username}
          onChange={handleInputChange}
           placeholder="Toto"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={signUpForm.password} 
          onChange={handleInputChange}
          placeholder="••••••••••••"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password_verify">Confirmez le mot de passe</label>
        <input
          id="password-verify"
          name="passwordVerify"
          type="password"
          value={signUpForm.passwordVerify} 
          onChange={handleInputChange}
           placeholder="••••••••••••"
          required
        />
      </div>

      {error && <p className="form-client-error">{error}</p>}

      <Button type="submit">S'inscrire</Button>
    </form>
  );
};
