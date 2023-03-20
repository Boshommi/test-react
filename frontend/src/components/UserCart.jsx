import ItemCard from "./ItemCard";
import { useState } from "react";

function UserCart() {
	const rawLS = localStorage.getItem("cart");
	if (!rawLS)
		return (
			<div>
				<h1>Begin shoping in our abhorrent shop</h1>
			</div>
		);

	const [cart, setCart] = useState(JSON.parse(rawLS));

	async function oformit() {
		const rawLocaStorageItems = JSON.parse(rawLS);
		const orderArrayId = [];
		for (const obj of rawLocaStorageItems) {
			orderArrayId.push(obj.id);
		}
		console.log(`[${orderArrayId}]`);

		const orderResponse = await fetch(`http://localhost:3000/user/addorder`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				"Content-Type": `application/json`,
			},
			body: JSON.stringify({ items: orderArrayId }),
		});

		localStorage.removeItem("cart");

		if (orderResponse.ok) {
			return <OrderSuccess />;
		}
	}

	return (
		<>
			<div>
				{cart.map((el) => (
					<ItemCard {...el} isCart={true} setState={setCart} key={el.id} />
				))}
			</div>
			<button onClick={oformit}>ОФОРМЕТ</button>
		</>
	);
}

export default UserCart;
