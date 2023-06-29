import { useState, useEffect } from "react";

import type { PairData } from "../src/api/coinbase.ts";
import { getTradingPairs } from "../src/api/coinbase.ts";

type Currencies = Record<string, string[]>;

const getCurrenciesFromData = (pairsData: PairData[]): Currencies => {
	const currencies: Currencies = {};

	pairsData.forEach((pairData) => {
		const { base_currency, quote_currency } = pairData;
		currencies[base_currency] = [
			...(currencies[base_currency] ?? []),
			quote_currency,
		];
	});

	return currencies;
};

// ----------------------------------------------------------------------------

function App() {
	const [currencies, setCurrencies] = useState<Currencies>();

	const [baseCurrencies, setBaseCurrencies] = useState([""]);
	const [quoteCurrencies, setQuoteCurrencies] = useState([""]);

	const [baseCurrencySelected, setBaseCurrencySelected] = useState("");
	const [quoteCurrencySelected, setQuoteCurrencySelected] = useState("");

	useEffect(() => {
		getTradingPairs().then(
			(data) => data && setCurrencies(getCurrenciesFromData(data))
		);
	}, []);

	useEffect(() => {
		if (!currencies) return;
		const newBaseCurrencies = Object.keys(currencies);
		setBaseCurrencies(newBaseCurrencies);
		setBaseCurrencySelected(newBaseCurrencies[0]);
	}, [currencies]);

	useEffect(() => {
		if (!currencies) return;
		const newQuoteCurrencies = currencies[baseCurrencySelected] ?? [""];
		setQuoteCurrencies(newQuoteCurrencies);
	}, [currencies, baseCurrencySelected]);

	useEffect(() => {
		if (!quoteCurrencies.includes(quoteCurrencySelected)) {
			setQuoteCurrencySelected(quoteCurrencies[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quoteCurrencies, baseCurrencySelected]);

	const handleSelectBaseCurrency = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setBaseCurrencySelected(e.target.value);

	const handleSelectQuoteCurrency = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setQuoteCurrencySelected(e.target.value);

	return (
		<>
			<select
				name="base currency"
				value={baseCurrencySelected}
				onChange={handleSelectBaseCurrency}
			>
				{baseCurrencies.map((currency) => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
			<select
				name="quote currency"
				value={quoteCurrencySelected}
				onChange={handleSelectQuoteCurrency}
			>
				{quoteCurrencies.map((currency) => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
		</>
	);
}

export default App;
