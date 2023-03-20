import { useState, useEffect } from "react";

function ItemCard(data) {    

    function addToCart() {
        let rawLS = localStorage.getItem("cart");

        if(!rawLS){
            localStorage.setItem("cart", JSON.stringify([data]))
            return
        }

        let arr = JSON.parse(rawLS);

        if (arr.find((el) => el.id === data.id))
            return

        arr.push(data);
        localStorage.setItem("cart", JSON.stringify(arr));
    }

    function deleteFromCart() {
        let cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.filter((el) => el.id != data.id);

        data.setState && data.setState(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    // console.log(data.isCart);
			
    return (
			<div>
				Price: {data.price}
				<br />
				Name: {data.name}
				<br />
				{/* Description: {data.description}
					<br /> */}
				Brand: {data.brand}
				<br />
				<img src={data.photos[0]} width="80" height="160" />
				{!data.isCart ? (
					<button onClick={addToCart}>ADD TO CART</button>
				) : (
					<button onClick={deleteFromCart}>❌</button>
				)}
			</div>
		);
		
};

export default ItemCard