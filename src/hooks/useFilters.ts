import { useState } from "react";

export const tradeSideFilterOptions = ["buy", "sell", "all"];

export type TradeSide = (typeof tradeSideFilterOptions)[number];

export const useFilters = () => {
	const [tradeSide, setTradeSide] = useState<TradeSide>("all");

	return {
		tradeSide,
		setTradeSide,
	};
};

export type FiltersProps = ReturnType<typeof useFilters>;
