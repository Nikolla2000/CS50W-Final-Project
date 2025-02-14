import { Link } from "react-router-dom";
import RegisterForm from "../components/Authentication/RegisterForm";
import "../components/Authentication/auth.css";

export default function RegisterPage() {
    return (
        <div className="register-page-wrapper">
            <div className="logo-login">
                <img src="/src/assets/logo-only-bg-clear.png" alt="logo" />
                <span>FocusFlow</span>
            </div>
            <div className="register-page-content">
                <h2>Create an account and become unstoppable!</h2>
                <RegisterForm/>
                <div className="register-link">
                    <Link to="/login">Already have an account? Click here to Sign In!</Link>
                </div>
            </div>
        </div>
    )
}