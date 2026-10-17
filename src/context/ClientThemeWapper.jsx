'use client';

// The theme is applied on <html> (see ThemeContext) so that everything,
// including toasts and the page background, picks it up.
const ClientThemeWrapper = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-1 flex-col">
            {children}
        </div>
    );
}

export default ClientThemeWrapper;
