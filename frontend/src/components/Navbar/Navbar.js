import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { Sparkles } from "lucide-react";


const Navbar = () => {

    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout");
        localStorage.removeItem('username');
        navigate("/home");
        window.location.reload();
    };

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    <i className="fas fa-book-open"></i>
                    <span>Ancient Library</span>
                </div>
                <div className="nav-buttons">
                    <Link className="btn ancient active" aria-pressed="true" to="/ai">
                        <Sparkles />
                        <span>Suggestion</span>
                    </Link>
                    <Link className="btn ancient active" aria-pressed="true" to="/scripture">
                        <i className="fas fa-scroll"></i>
                        <span>Scripture</span>
                    </Link>
                    {!username && (
                        <>
                            <Link className="btn login" to="/login">
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Login</span>
                            </Link>
                            <Link className="btn register" to="/login"
                                state={{ isRegister: true }}>
                                <i className="fas fa-user-plus"></i>
                                <span>Register</span>
                            </Link>
                        </>
                    )}
                    {username && (
                        <>
                            <Link className="btn login" to="/home" onClick={handleLogout}>
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Logout</span>
                            </Link>
                        </>
                    )}

                </div>
            </nav>
        </>
    );
};

export default Navbar;
