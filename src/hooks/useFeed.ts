import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "wss://ws-feed.exchange.coinbase.com";

const subscribeMsg = {
	type: "subscribe",
	product_ids: ["ETH-USD"],
	channels: ["heartbeat"],
};

export const useFeed = () => {
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
