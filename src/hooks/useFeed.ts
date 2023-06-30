import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "wss://ws-feed.exchange.coinbase.com";

const subscribeMsg = {
	type: "subscribe",
	product_ids: ["ETH-USD"],
	channels: ["matches"],
};

type MatchData = {
	type: string;
	trade_id: number;
	maker_order_id: string;
	taker_order_id: string;
	side: string;
	size: string;
	price: string;
	product_id: string;
	sequence: number;
	time: string;
};

export const useFeed = () => {
	const [isEnabled, setIsEnabled] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<MatchData[]>([]);

	const { sendJsonMessage } = useWebSocket(isEnabled ? WS_URL : null, {
		onOpen: () => setIsOpen(true),
		onClose: () => setIsOpen(false),
		onMessage: (event: WebSocketEventMap["message"]) => {
			const newData = JSON.parse(event.data);
			if (newData.type !== "match") return;
			setData((oldData) => [...oldData, newData]);
		},
	});

	useEffect(() => {
		isOpen && sendJsonMessage(subscribeMsg);
	}, [isOpen, sendJsonMessage]);

	const isStatusChanging = isEnabled !== isOpen;

	const toggleFeed = () => setIsEnabled(!isEnabled);

	return {
		isEnabled,
		isOpen,
		isStatusChanging,
		data,
		toggleFeed,
	};
};

export type FeedProps = ReturnType<typeof useFeed>;
