import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Form from "./components/Form";
import ItemCard from "./components/ItemCard";
import Catalog from "./components/Catalog";
import UserAccount from "./components/UserAccount";
import UserCart from "./components/UserCart";
import Main from "./components/Main";

const Router = (
	<Routes>
		<Route element={<App />}>
			<Route path="*" element={<Main />} />
			<Route path="catalog" element={<Catalog />} />
			<Route path="account" element={<UserAccount />} />
			<Route path="cart" element={<UserCart />} />
		</Route>
	</Routes>
);

export default Router;
