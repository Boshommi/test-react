import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function Catalog() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/product/get`)
					.then((res) => res.json())
					.then((json) => setData(json));
    })

    return data.map((el) => <ItemCard isCart={false} {...el} key={el.id}/>);
}

export default Catalog