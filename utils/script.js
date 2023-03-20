let list = [...document.querySelectorAll(".style__list___WnjEh > *")].map(
	(e) => e.querySelector(".style__link___vsiWz").href,
);

let jsons = [];

function findJSON(text) {
	let lastPos = 0;
	while (true) {
		let index = text.indexOf(`<script type="application/ld+json">`, lastPos);
		if (index == -1) {
			break;
		}
		let endIndex = text.indexOf(`</script>`, index);
		lastPos = endIndex;
		let json = JSON.parse(text.slice(index + 35, endIndex));
		if (json["@type"] == "Product") {
			console.log(`Done: ${Date.now()}`);
			return json;
		}
	}
}
