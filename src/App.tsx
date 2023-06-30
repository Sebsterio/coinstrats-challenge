import { useCurrencies } from "./hooks/useCurrencies.ts";
import { useFeed } from "./hooks/useFeed.ts";
import { Controls } from "./Controls.tsx";
import { LatestTradesPanel } from "./LatestTradesPanel.tsx";

function App() {
	const currenciesState = useCurrencies();
	const feedState = useFeed();

	return (
		<>
			<Controls {...currenciesState} {...feedState} />
			<LatestTradesPanel {...feedState} />
		</>
	);
}

export default App;
