import { useState } from "react";
// import Button from "@mui/material/Button";
import { Link, Outlet, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<header className="flex flex-row justify-between w-full px-10 py-5 mx-auto items-center by-5 bg-zinc-300">
				<Link to="/">
					<img
						src="https://www.tsum.ru/static/media/logo.047b4fb0.svg"
						alt=""
						srcset=""
					/>
				</Link>
				<div className="flex flex-row gap-8 text-xl">
					<div>
						<Link to="/catalog">Catalog</Link>
					</div>
					<div>
						<Link to="/account">Account</Link>
					</div>
					<div>
						<Link to="/cart">Cart</Link>
					</div>
				</div>
			</header>
			<Outlet />
			<footer className="bg-zinc-300 flex flex-row justify-between align-center py-5 px-3">
				<div>© ООО «Меркури Мода», 2023</div>
				<div>Политика конфиденциальности Наше приложение</div>
			</footer>
		</>
	);
}

export default App;
