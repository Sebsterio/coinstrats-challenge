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
	const [isEnabled, setIsEnabled] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState({});

	const { sendJsonMessage } = useWebSocket(isEnabled ? WS_URL : null, {
		onOpen: () => setIsOpen(true),
		onClose: () => setIsOpen(false),
		onMessage: (event: WebSocketEventMap["message"]) => {
			const data = JSON.parse(event.data);
			data.type === "heartbeat" && setData(data);
		},
	});

	useEffect(() => {
		isOpen && sendJsonMessage(subscribeMsg);
	}, [isOpen, sendJsonMessage]);

	return (
		<div>
			<h2>Panel</h2>

			<p>
				{baseCurrencySelected}-{quoteCurrencySelected}
			</p>

			<button
				onClick={() => setIsEnabled(!isEnabled)}
				disabled={isEnabled !== isOpen}
			>
				{isEnabled ? "stop" : "start"}
			</button>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
