import { Link } from "react-router-dom";
import { WhiteButton } from "../components/Button/Button";
import LoginForm from "../components/Login/LoginForm";
import "../components/Login/login.css";

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
                </div>
            </div>
            <div className="login-right-side">
                <div className="right-side-content">
                    <h2>New Here?</h2>
                    <p>Sign up and destroy procrastination!</p>
                    <Link to="/">
                        <WhiteButton type="button">Sign up</WhiteButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
//FocusFlow