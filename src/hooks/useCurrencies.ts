import { useState, useEffect, useMemo } from "react";

import type { PairData } from "../../src/api/coinbase.ts";
import { getTradingPairs } from "../../src/api/coinbase.ts";

const DEFAULT_BASE_CURRENCY = "ETH";
const DEFAULT_QUOTE_CURRENCY = "USD";

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

export const useCurrencies = () => {
	const [currencies, setCurrencies] = useState<Currencies>();

	const [baseCurrencies, setBaseCurrencies] = useState([DEFAULT_BASE_CURRENCY]);
	const [quoteCurrencies, setQuoteCurrencies] = useState([DEFAULT_QUOTE_CURRENCY]); // prettier-ignore

	const [baseCurrencySelected, setBaseCurrencySelected] = useState(DEFAULT_BASE_CURRENCY); // prettier-ignore
	const [quoteCurrencySelected, setQuoteCurrencySelected] = useState(DEFAULT_QUOTE_CURRENCY); // prettier-ignore

	const currencyPairId = useMemo(
		() => `${baseCurrencySelected}-${quoteCurrencySelected}`,
		[baseCurrencySelected, quoteCurrencySelected]
	);

	useEffect(() => {
		getTradingPairs().then(
			(data) => data && setCurrencies(getCurrenciesFromData(data))
		);
	}, []);

	useEffect(() => {
		if (!currencies) return;

		const newBaseCurrencies = Object.keys(currencies);
		const newBaseCurrency = newBaseCurrencies.includes(DEFAULT_BASE_CURRENCY)
			? DEFAULT_BASE_CURRENCY
			: newBaseCurrencies[0];

		setBaseCurrencies(newBaseCurrencies);
		setBaseCurrencySelected(newBaseCurrency);
	}, [currencies]);

	useEffect(() => {
		if (!currencies) return;

		const newQuoteCurrencies = currencies[baseCurrencySelected];
		const isOldQuoteCurrencyAvailable = newQuoteCurrencies.includes(quoteCurrencySelected); // prettier-ignore
		const isDefaultQuoteCurrencyAvailable = newQuoteCurrencies.includes(DEFAULT_QUOTE_CURRENCY); // prettier-ignore
		const newQuoteCurrency = isOldQuoteCurrencyAvailable
			? null
			: isDefaultQuoteCurrencyAvailable
			? DEFAULT_QUOTE_CURRENCY
			: newQuoteCurrencies[0];

		setQuoteCurrencies(newQuoteCurrencies);
		newQuoteCurrency && setQuoteCurrencySelected(newQuoteCurrency);
	}, [currencies, baseCurrencySelected, quoteCurrencySelected]);

	return {
		currencyPairId,
		baseCurrencies,
		quoteCurrencies,
		baseCurrencySelected,
		quoteCurrencySelected,
		setBaseCurrencySelected,
		setQuoteCurrencySelected,
	};
};

export type CurrenciesProps = ReturnType<typeof useCurrencies>;
