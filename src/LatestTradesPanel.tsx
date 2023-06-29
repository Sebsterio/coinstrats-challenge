import type { CurrenciesProps } from "./hooks/useCurrencies.ts";

type Props = Pick<
	CurrenciesProps,
	"baseCurrencySelected" | "quoteCurrencySelected"
>;

export const LatestTradesPanel: React.FC<Props> = ({
	baseCurrencySelected,
	quoteCurrencySelected,
}) => {
	return (
		<div>
			<h2>Panel</h2>
			<p>{baseCurrencySelected}</p>
			<p>{quoteCurrencySelected}</p>
		</div>
	);
};
