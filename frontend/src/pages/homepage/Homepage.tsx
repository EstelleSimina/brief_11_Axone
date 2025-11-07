import { useNavigate } from "react-router";
import logo from "../../assets/logo.png"
import './homepage.css'


export default function Homepage() {
  const navigate = useNavigate();

  return (
     <main className="main-content homepage-container">
        <section className="hero-section">
          <h1>Bienvenue sur </h1>
          <img src={logo} alt="Bannière Axone" /> 
        </section>

        <section className="presentation-section">
        <h2>Présentation</h2>
          <p>
            Partagez et découvrez des extraits de code utiles pour vos projets.
          </p>
        </section> 

        <section className="cta-section">
        <p>Pour continuer, veuillez vous inscrire ou vous identifier.</p>
        <div className="cta-buttons">
          <button 
            className="btn btn--primary" 
            onClick={() => navigate('/inscription')}
          >
            Inscription
          </button> 
          <button 
            className="btn btn--secondary" 
            onClick={() => navigate('/connexion')}
          >
            Connexion
          </button>
        </div>
      </section>
    </main>
  );
}