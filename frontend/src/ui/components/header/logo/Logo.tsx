import { NavLink } from "react-router"
import logo_title from "../../../../assets/logo_title.png";
import './logo.css';

export const Logo = () => {
    return (
        <NavLink to="/" className="logo-container">
            <img src={logo_title} alt="Logo du site Axone" className="logo-image"/>
        </NavLink>
    )
}