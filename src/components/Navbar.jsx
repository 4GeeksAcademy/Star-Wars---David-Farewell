import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Star Wars Databank</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
