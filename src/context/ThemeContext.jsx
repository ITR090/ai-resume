'use client';
import { createContext, useState } from "react";

const ThemeContext = createContext({
    theme: "",
    toggleTheme: () => {},
});


const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("light");

    const toggleTheme = (theme) => {
        setTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeContext, ThemeProvider };