type Props = { data: Record<string, unknown> };

export const LatestTradesPanel: React.FC<Props> = ({ data }) => {
	return (
		<div>
			<h2>Panel</h2>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
