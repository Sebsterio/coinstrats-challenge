import { useCurrencies } from "./hooks/useCurrencies.ts";
import { Controls } from "./Controls.tsx";

function App() {
	const currenciesState = useCurrencies();

	return <Controls {...currenciesState} />;
}

export default App;
