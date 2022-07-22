import React from 'react';

export interface AppState {
    base: string;
    topping: string[];

}
export interface IAppContext {
    state: AppState,
    handleChangeState: (state: AppState) => void
}

export const defaultContext = {
    state:{
        base: "",
        topping: []
    },
    handleChangeState: () => {}
}

const AppContext = React.createContext<IAppContext>(defaultContext);

export default AppContext;