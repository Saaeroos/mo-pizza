import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/Header";
import AppContext, {
    AppState,
    defaultContext,
    IAppContext,
} from "../context/index";
import { useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<AppState>({ base: "", topping: [] });

    const handleChangeState = (state: AppState) => {
        setState(state);
    };

    return (
        <AppContext.Provider value={{ state, handleChangeState }}>
            <Header />
            <Component {...pageProps} />
        </AppContext.Provider>
    );
}

