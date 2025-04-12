import { Typography } from "@mui/material";
import React from "react";

export function FuturisticTechHeading({ children, page } : { children: React.ReactNode, page?: string }) {
    return (
        <Typography 
            variant={page == "dashboard" ?  "h3" : "h2"}
            component="h1"
            gutterBottom
            sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'primary.main',
                textShadow: '0 0 5px rgba(25, 118, 210, 0.3)',
                mb: 4,
                position: 'relative',
                // marginLeft: page == "dashboard" ? "30px" : "0px",
                display: 'inline-block',
                '&:before': {
                content: page === "dashboard" ? undefined : '"> "',
                position: 'absolute',
                left: -30,
                color: 'primary.light',
                }
            }}
            >
            {children}
        </Typography>
    )
}


export function ModernhHeading({ children } : { children: React.ReactNode }) {
    return (
        <Typography 
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
                fontWeight: 300,
                letterSpacing: 6,
                textTransform: 'uppercase',
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                mb: 4,
                '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #1976d2, transparent)',
                mt: 1,
                mx: 'auto'
                }
            }}
            >
            {children}
        </Typography>
    )
}


export function GradientHeading({ children } : { children: React.ReactNode }) {
    return (
        <Typography 
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #4dabf5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          mb: 4
        }}
      >
        {children}
      </Typography>
    )
}