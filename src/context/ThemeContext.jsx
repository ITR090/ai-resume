'use client';
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: "",
    toggleTheme: () => {},
});


const ThemeProvider = ({ children }) => {

    // Empty means "follow the system preference" (daisyUI light/dark).
    const [theme, setTheme] = useState("");

    // Pick up the theme the inline script in layout.js applied before hydration.
    useEffect(() => {
        setTheme(document.documentElement.getAttribute("data-theme") || "");
    }, []);

    const toggleTheme = (theme) => {
        setTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme);
        } catch {}
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeContext, ThemeProvider };
