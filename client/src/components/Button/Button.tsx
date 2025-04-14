import React from "react";
import './button.css';

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
  }
  

export function GreenButton({ children, type  = "button", fullWidth = false} : ButtonProps) {
    return <button className={`btn-green-grad ${fullWidth ? 'full-width' : ''}`} type={type}>{children}</button>
}

export function WhiteButton({ children, type  = "button", fullWidth = false} : ButtonProps) {
    return <button className={`btn-white-grad ${fullWidth ? 'full-width' : ''}`} type={type}>{children}</button>
}

export function LightBlueButton({ children, type  = "button", fullWidth = false} : ButtonProps) {
    return <button className={`btn-lightblue-grad ${fullWidth ? 'full-width' : ''}`} type={type}>{children}</button>
}

export function LightBlueCenteredButton({ children, type  = "button", fullWidth = false} : ButtonProps) {
    return <button className={`btn-lightblue-grad centered ${fullWidth ? 'full-width' : ''}`} type={type}>{children}</button>
}

export function BlueCenteredButton({ children, type  = "button", fullWidth = false} : ButtonProps) {
    return <button className={`btn-blue-grad centered-no-margin ${fullWidth ? 'full-width' : ''}`} type={type}>{children}</button>
}