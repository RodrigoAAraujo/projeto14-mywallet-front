//Methods

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneralStyle from "./Assets/Styles/GeneralStyle.js";

//Styles

import GlobalStyle from "./Assets/Styles/GlobalStyle.js";

//Pages

import SignInPage from "./Pages/SigninPage.js"
import SignUpPage from "./Pages/SignUpPage.js"
import WalletPage from "./Pages/WalletPage.js"
import InputPage from "./Pages/InputPage.js";
import OutputPage from "./Pages/OutputPage.js";
import EditPage from "./Pages/EditPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <GeneralStyle/>

      <Routes>
        <Route element={<SignInPage/>} path="/"></Route>
        <Route element={<SignUpPage/>} path="/sign-up"></Route>
        <Route element={<WalletPage/>} path="/:name/wallet"></Route>
        <Route element={<InputPage/>} path="/:name/wallet/input"></Route>
        <Route element={<OutputPage/>} path="/:name/wallet/output"></Route>
        <Route element={<EditPage/>} path="/:name/wallet/edit/:type/:id"></Route>
      </Routes>

    </BrowserRouter>
  );
}

