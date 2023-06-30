import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import type { TradeSide } from "../hooks/useFilters.ts";

const WS_URL = "wss://ws-feed.exchange.coinbase.com";

const DATA_MAX_COUNT = 50;

const getMessage = (
	type: "subscribe" | "unsubscribe",
	currencyPairId: string
) => (
	console.log(type, currencyPairId),
	{
		type,
		product_ids: [currencyPairId],
		channels: ["matches"],
	}
);

export type MatchData = {
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

type Props = {
	currencyPairId: string;
	tradeSide: TradeSide;
};

export const useFeed = ({ currencyPairId, tradeSide }: Props) => {
	const [prevCurrencyPairId, setPrevCurrencyPairId] = useState<string>();
	const [isEnabled, setIsEnabled] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<MatchData[]>([]);

	const { sendJsonMessage } = useWebSocket(isEnabled ? WS_URL : null, {
		onOpen: () => setIsOpen(true),
		onClose: () => setIsOpen(false),
		onMessage: (event: WebSocketEventMap["message"]) => {
			const newData = JSON.parse(event.data);
			if (newData.type !== "match") return;
			if (newData.side !== tradeSide && tradeSide !== "all") return;
			setData((oldData) => {
				const data = [newData, ...oldData];
				data.length = Math.min(data.length, DATA_MAX_COUNT);
				return data;
			});
		},
	});

	useEffect(() => {
		setData([]);
		setIsEnabled(true);
	}, [tradeSide]);

	useEffect(() => {
		if (prevCurrencyPairId === currencyPairId) return;
		if (prevCurrencyPairId) sendJsonMessage(getMessage("unsubscribe", prevCurrencyPairId)); // prettier-ignore
		setPrevCurrencyPairId(currencyPairId);
		setData([]);
		setIsEnabled(true);
	}, [setData, sendJsonMessage, isOpen, currencyPairId, prevCurrencyPairId]);

	useEffect(() => {
		isOpen && sendJsonMessage(getMessage("subscribe", currencyPairId));
	}, [sendJsonMessage, isOpen, currencyPairId]);

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
