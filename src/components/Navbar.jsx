import { Link } from "react-router-dom";
import Favorites from "./Favorites";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-black">
            <div className="container">
                <Link to="/" className="navbar-brand text-warning">
                    Star Wars Databank
                </Link>
                <Favorites />
            </div>
        </nav>
    );
};

export default Navbar;
