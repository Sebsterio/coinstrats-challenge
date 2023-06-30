import type { CurrenciesProps } from "./hooks/useCurrencies.ts";
import type { FeedProps } from "./hooks/useFeed.ts";
import type { FiltersProps } from "./hooks/useFilters.ts";
import { tradeSideFilterOptions } from "./hooks/useFilters.ts";

export const Controls: React.FC<CurrenciesProps & FeedProps & FiltersProps> = ({
	baseCurrencies,
	quoteCurrencies,
	baseCurrencySelected,
	quoteCurrencySelected,
	setBaseCurrencySelected,
	setQuoteCurrencySelected,
	// feed props:
	isEnabled,
	isStatusChanging,
	toggleFeed,
	// filters:
	tradeSide,
	setTradeSide,
}) => {
	const handleSelectBaseCurrency = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setBaseCurrencySelected(e.target.value);

	const handleSelectQuoteCurrency = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setQuoteCurrencySelected(e.target.value);

	const handleSelectTradeSide = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setTradeSide(e.target.value);

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

			<select
				name="trade side"
				value={tradeSide}
				onChange={handleSelectTradeSide}
			>
				{tradeSideFilterOptions.map((tradeSide) => (
					<option key={tradeSide} value={tradeSide}>
						{tradeSide}
					</option>
				))}
			</select>

			<button onClick={toggleFeed} disabled={isStatusChanging}>
				{isEnabled ? "stop" : "start"}
			</button>
		</>
	);
};
