import axios from "axios";

const PRODUCTS_URL = "https://api.exchange.coinbase.com/products";

export type PairData = Record<string, unknown> & {
	id: string;
	base_currency: string;
	quote_currency: string;
};

export const getTradingPairs = () =>
	axios
		.get(PRODUCTS_URL, {
			headers: { "Content-Type": "application/json" },
		})
		.then<PairData[]>((res) => res.data)
		.catch(console.error);
