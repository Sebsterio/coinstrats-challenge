import { useRef } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUI_Select, { SelectChangeEvent } from "@mui/material/Select";

export type SelectOnChangeProp = (e: SelectChangeEvent<string>) => void;

type Props = {
	name: string;
	value: string;
	options: string[];
	onChange: SelectOnChangeProp;
	label?: string;
};

export const Select: React.FC<Props> = ({
	name,
	value,
	label = name,
	options,
	onChange,
}) => {
	const idRef = useRef(String(Math.random()));
	const id = idRef.current;

	return (
		<FormControl size="small" sx={{ minWidth: 120 }}>
			<InputLabel
				id={id}
				style={{ background: "white", textTransform: "capitalize" }}
			>
				{label}
			</InputLabel>

			<MUI_Select labelId={id} {...{ name, value, onChange }}>
				{options.map((item) => (
					<MenuItem key={item} value={item}>
						{item}
					</MenuItem>
				))}
			</MUI_Select>
		</FormControl>
	);
};
