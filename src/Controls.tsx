import type { CurrenciesProps } from "./hooks/useCurrencies.ts";

export const Controls: React.FC<CurrenciesProps> = ({
	baseCurrencies,
	quoteCurrencies,
	baseCurrencySelected,
	quoteCurrencySelected,
	setBaseCurrencySelected,
	setQuoteCurrencySelected,
}) => {
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
};
