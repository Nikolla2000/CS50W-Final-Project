import { Link } from "react-router-dom";
import "./addNewButton.css";

export default function AddNewButton({ children, link } : { children: string, link: string }) {
    return (
        <Link to={link} className="add-new-button">
            {children}
        </Link>
    )
}