import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import type { CurrenciesProps } from "./hooks/useCurrencies.ts";

const WS_URL = "wss://ws-feed.exchange.coinbase.com";

const subscribeMsg = {
	type: "subscribe",
	product_ids: ["ETH-USD"],
	channels: ["heartbeat"],
};

type Props = Pick<
	CurrenciesProps,
	"baseCurrencySelected" | "quoteCurrencySelected"
>;

export const LatestTradesPanel: React.FC<Props> = ({
	baseCurrencySelected,
	quoteCurrencySelected,
}) => {
	const [data, setData] = useState({});

	const { sendJsonMessage } = useWebSocket(WS_URL, {
		onOpen: () => console.log("WS opened."),
		onClose: () => console.log("WS closed."),
		onMessage: (event: WebSocketEventMap["message"]) => {
			const data = JSON.parse(event.data);
			if (data.type !== "heartbeat") return;
			setData(data);
		},
	});

	useEffect(() => {
		sendJsonMessage(subscribeMsg);
	}, [sendJsonMessage]);

	return (
		<div>
			<h2>Panel</h2>
			<p>
				{baseCurrencySelected}-{quoteCurrencySelected}
			</p>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
