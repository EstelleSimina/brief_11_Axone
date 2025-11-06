import { Button } from "../components/button/Button";
import { useState, type ChangeEvent, type FormEvent } from "react";

export interface SignUpForm {
  email: string;
  username: string;
  password: string;
  passwordVerify: string;
}

interface SignInFormProps {
  sendToApi: (formData: SignUpForm) => void;
}

const defaultValues: SignUpForm = {
  email: "",
  username: "",
  password: "",
  passwordVerify: "",
};

export const SignUpForm = ({ sendToApi }: SignInFormProps) => {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>(defaultValues);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignUpForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    sendToApi(signUpForm);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange} 
        />
      </div>
      <div>
        <label htmlFor="pseudo">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password_verify">Confirmez le mot de passe</label>
        <input
          id="password-verify"
          name="passwordVerify"
          type="password"
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit">Inscription</Button>
    </form>
  );
};
