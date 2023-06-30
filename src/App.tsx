import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useFilters } from "./hooks/useFilters.ts";
import { useCurrencies } from "./hooks/useCurrencies.ts";
import { useFeed } from "./hooks/useFeed.ts";
import { Controls } from "./Controls.tsx";
import { LatestTradesPanel } from "./LatestTradesPanel.tsx";

import "./main.css";

function App() {
	const { tradeSide, ...filtersState } = useFilters();
	const { currencyPairId, ...currenciesState } = useCurrencies();
	const feedState = useFeed({ currencyPairId, tradeSide });

	return (
		<Container
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
				padding: 16,
			}}
		>
			<Paper sx={{ minWidth: 500, maxWidth: 600, padding: 3 }}>
				<Stack spacing={3}>
					<Controls
						{...{ ...filtersState, tradeSide }}
						{...{ ...currenciesState, currencyPairId }}
						{...feedState}
					/>
					<LatestTradesPanel {...feedState} />
				</Stack>
			</Paper>
		</Container>
	);
}

export default App;
