import { Link } from "react-router-dom";
import { WhiteButton } from "../components/Button/Button";
import LoginForm from "../components/Authentication/LoginForm";
import "../components/Authentication/auth.css";

export default function LoginPage() {
    return (
        <div className="login-page-wrapper">
            <div className="login-left-side">
                <div className="left-side-content">
                <div className="logo-login">
                    <img src="/src/assets/logo-only-bg-clear.png" alt="logo" />
                    <span>FocusFlow</span>
                </div>
                    <h2>Login to Your Account</h2>
                    <LoginForm/>
                    <div className="left-side-register-link">
                        <Link to="/register">New Here? Click here to create an account!</Link>
                    </div>
                </div>
            </div>
            <div className="login-right-side">
                <div className="right-side-content">
                    <h2>New Here?</h2>
                    <p>Sign up and destroy procrastination!</p>
                    <Link to="/register">
                        <WhiteButton type="button">Sign up</WhiteButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
//FocusFlow