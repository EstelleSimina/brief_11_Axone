import "./header.css";
import { Logo } from "./logo/Logo";
import { Navbar } from "./navbar/Navbar";


export function Header() {
    return (
        <header className="main-header">
            <div className="header-content">
                <Logo />
                <Navbar />
            </div>
        </header>
    );
}

