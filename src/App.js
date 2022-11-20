//Methods

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneralStyle from "./Assets/Styles/GeneralStyle.js";

//Styles

import GlobalStyle from "./Assets/Styles/GlobalStyle.js";

//Pages

import SignInPage from "./Pages/SigninPage.js"
import SignUpPage from "./Pages/SignUpPage.js"
import WalletPage from "./Pages/WalletPage.js"

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <GeneralStyle/>

      <Routes>
        <Route element={<SignInPage/>} path="/"></Route>
        <Route element={<SignUpPage/>} path="/sign-up"></Route>
        <Route element={<WalletPage/>} path="/:name/wallet"></Route>
      </Routes>

    </BrowserRouter>
  );
}

