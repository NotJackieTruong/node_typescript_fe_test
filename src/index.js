import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import reducers from "./redux/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";
import {THEME_CONFIG} from "./configs/AppConfig";

const store = createStore(reducers)

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

const Main = ()=>{
  return(
    <Provider store={store}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme}
                             insertionPoint="styles-insertion-point">
        <App/>
      </ThemeSwitcherProvider>
    </Provider>
  )
}

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
