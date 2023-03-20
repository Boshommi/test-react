import { useState, useEffect } from "react";

const Form = ({ setLoggedIn }) => {
	const [hideOrShow, setHideOrShow] = useState("show");
	const [passwordType, setPasswordType] = useState("password");
	const [inputValue, setInputValue] = useState({ email: "", password: "" });
	const [isLogged, setIsLogged] = useState(false);

	const togglePasswordType = () => {
		if (hideOrShow === "show") {
			setHideOrShow("hide");
			setPasswordType("text");
		} else {
			setHideOrShow("show");
			setPasswordType("password");
		}
	};
	const handleInputValue = (text, type) => {
		setInputValue({ ...inputValue, [type]: text });
	};

	const sendLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const sendFormData = Object.fromEntries(formData.entries());
		// console.log();
		let a = await fetch("http://localhost:3000/user/login", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(sendFormData),
		});
		let jwt = await a.text();
		console.log(jwt);
		setLoggedIn(true);
		localStorage.setItem("jwt", jwt);
	};

	return (
		<form
			onSubmit={(e) => {
				sendLogin(e);
			}}
		>
			<div>
				<label htmlFor="email"></label>
				<input
					type="text"
					onChange={(e) => {
						handleInputValue(e.target.value, "email");
					}}
					name="email"
					value={inputValue.email}
				/>
			</div>
			<div>
				<label htmlFor="password"></label>
				<input
					type={passwordType}
					onChange={(e) => {
						handleInputValue(e.target.value, "password");
					}}
					name="password"
					value={inputValue.password}
				/>
			</div>
			<input type="submit" value="Send" />
			<button type="button" onClick={togglePasswordType}>
				{hideOrShow} password
			</button>
		</form>
	);
};

export default Form;
