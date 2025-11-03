// page d'accueil / homepage

import { Link } from "react-router";

export default function Homepage() {
  return (
    <div>
      <h1>Bienvenue sur Axone</h1>
      <p>
        Partagez et découvrez des extraits de code utiles pour vos projets.
      </p>

      {/* Lien vers la liste des snippets (à créer ensuite) */}
      <Link to="/snippets">
        Voir les snippets →
      </Link>

      {/* Section "Derniers snippets" (mockée pour l'instant) */}
      <div>
        <h2>Derniers snippets ajoutés</h2>
        <div>
          <pre>
            {`// Exemple de snippet
function greet(name) {
  return \`Hello, \${name}!\`;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}