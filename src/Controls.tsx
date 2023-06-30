import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import type { CurrenciesProps } from "./hooks/useCurrencies.ts";
import type { FeedProps } from "./hooks/useFeed.ts";
import type { FiltersProps } from "./hooks/useFilters.ts";
import { tradeSideFilterOptions } from "./hooks/useFilters.ts";
import { Select, SelectOnChangeProp } from "./Select.tsx";

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
	const handleSelectBaseCurrency: SelectOnChangeProp = (e) =>
		setBaseCurrencySelected(e.target.value);

	const handleSelectQuoteCurrency: SelectOnChangeProp = (e) =>
		setQuoteCurrencySelected(e.target.value);

	const handleSelectTradeSide: SelectOnChangeProp = (e) =>
		setTradeSide(e.target.value);

	return (
		<Box sx={{ display: "flex", gap: 1 }}>
			<Select
				name="base currency"
				value={baseCurrencySelected}
				options={baseCurrencies}
				onChange={handleSelectBaseCurrency}
			/>

			<Select
				name="quote currency"
				value={quoteCurrencySelected}
				options={quoteCurrencies}
				onChange={handleSelectQuoteCurrency}
			/>

			<Select
				name="trade side"
				value={tradeSide}
				options={tradeSideFilterOptions}
				onChange={handleSelectTradeSide}
			/>

			<Box style={{ flex: 1, textAlign: "right" }}>
				<Button
					variant="outlined"
					onClick={toggleFeed}
					disabled={isStatusChanging}
				>
					{isEnabled ? "stop" : "start"}
				</Button>
			</Box>
		</Box>
	);
};
