import { NavLink } from "react-router";
import "./navbar.css";

export function Navbar () {
    return (
    <nav className="navbar">
        <ul>
            {/* <li><NavLink to="/">Accueil</NavLink></li> */}
            <li><NavLink to="/inscription">Inscription</NavLink></li>
            <li><NavLink to="/connexion">Connexion</NavLink></li>
            <li><NavLink to="/exploration">Explorer</NavLink></li>
            {/* A implémenter + tard avec la logique du useContext
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/profile">Profil</NavLink></li>
             */}
        </ul>
    </nav>
    );
}