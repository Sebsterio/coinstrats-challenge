import type { MatchData } from "./hooks/useFeed";

import "./table.css";

type Props = { data: MatchData[] };

export const LatestTradesPanel: React.FC<Props> = ({ data }) => {
	return (
		<div className="LatestTradesPanel">
			<table>
				<tr>
					<th>Trade ID</th>
					<th>Side</th>
					<th>Price</th>
					<th>Size</th>
					<th>Time</th>
				</tr>
				{data.map(({ trade_id, side, price, size, time }) => (
					<tr key={trade_id} className={["new-row", side].join(" ")}>
						<td>{trade_id}</td>
						<td>{side}</td>
						<td>{price}</td>
						<td>{size}</td>
						<td>{time}</td>
					</tr>
				))}
			</table>
		</div>
	);
};
