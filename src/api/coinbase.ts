import axios from "axios";

const PRODUCTS_URL = "https://api.exchange.coinbase.com/products";

export const getTradingPairs = () =>
	axios
		.get(PRODUCTS_URL, {
			headers: { "Content-Type": "application/json" },
		})
		.then((res) => res.data)
		.catch(console.error);
