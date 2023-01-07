import * as React from "react";

const langContext = React.createContext(undefined);

function useLang() {
    const [lang, setLang] = React.useState('en')

    return {
        lang,
        translate(code) {
            return new Promise((res) => {
                setLang(code)
                res();
            });
        }
    };
}

export function LangProvider({ children }) {
    const lang = useLang();

    return (
        <langContext.Provider value={lang}>
            {children}
        </langContext.Provider>
    );
}

export default function LangConsumer() {
    return React.useContext(langContext);
}
