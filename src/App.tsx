import { getTradingPairs } from "../src/api/coinbase.ts";
import { useState, useEffect } from "react";

function App() {
	const [pairsData, setPairsData] = useState("");

	useEffect(() => {
		getTradingPairs().then(setPairsData);
	}, []);

	return <pre>{JSON.stringify(pairsData, null, 2)}</pre>;
}

export default App;
