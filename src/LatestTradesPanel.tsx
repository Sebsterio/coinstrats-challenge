import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import type { MatchData } from "./hooks/useFeed";

import "./table.css";

const pad = (num: number) => String(num).padStart(2, "0");

const formatTime = (time: string) => {
	const date = new Date(time);
	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();

	return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const formatNumber = (input: number | string, padding: number) =>
	Number(input).toFixed(padding);

type Props = { data: MatchData[] };

export const LatestTradesPanel: React.FC<Props> = ({ data }) => {
	return (
		<div className="LatestTradesPanel">
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 450, maxWidth: 600 }} size="small">
					<TableHead>
						<TableRow>
							<TableCell> Trade ID </TableCell>
							<TableCell align="center"> Side </TableCell>
							<TableCell align="center"> Price </TableCell>
							<TableCell align="center"> Size </TableCell>
							<TableCell align="center"> Time </TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{data.map(({ trade_id, side, price, size, time }) => (
							<TableRow key={trade_id} className={["new-row", side].join(" ")}>
								<TableCell>{trade_id}</TableCell>
								<TableCell align="right">{side}</TableCell>
								<TableCell align="right">{formatNumber(price, 2)}</TableCell>
								<TableCell align="right">{formatNumber(size, 8)}</TableCell>
								<TableCell align="right">{formatTime(time)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
