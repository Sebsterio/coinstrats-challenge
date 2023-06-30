import { useFilters } from "./hooks/useFilters.ts";
import { useCurrencies } from "./hooks/useCurrencies.ts";
import { useFeed } from "./hooks/useFeed.ts";
import { Controls } from "./Controls.tsx";
import { LatestTradesPanel } from "./LatestTradesPanel.tsx";

function App() {
	const { tradeSide, ...filtersState } = useFilters();
	const { currencyPairId, ...currenciesState } = useCurrencies();
	const feedState = useFeed({ currencyPairId, tradeSide });

	return (
		<>
			<Controls
				{...{ ...filtersState, tradeSide }}
				{...{ ...currenciesState, currencyPairId }}
				{...feedState}
			/>
			<LatestTradesPanel {...feedState} />
		</>
	);
}

export default App;
