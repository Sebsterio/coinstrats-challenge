import { useCurrencies } from "./hooks/useCurrencies.ts";
import { Controls } from "./Controls.tsx";
import { LatestTradesPanel } from "./LatestTradesPanel.tsx";

function App() {
	const currenciesState = useCurrencies();

	return (
		<>
			<Controls {...currenciesState} />
			<LatestTradesPanel {...currenciesState} />
		</>
	);
}

export default App;
