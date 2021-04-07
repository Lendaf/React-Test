/* Pie.js */
import React, { useState } from 'react'
import { PieChart, Pie, Cell } from "recharts";
import data from "../data/test.json"

const Camembert = () => {
	const [Data01] = useState(data.firstLayer.data)
	const [Data02, setData02] = useState([])
	const [Data03, setData03] = useState([])
	const [Label, setLabel] = useState([true, false, false])
	const [selected, setSelected] = useState(["", "", ""])

	function addNewLayer(setState, newSelected, newData, newLabel) {
		setState(newData)
		setLabel(newLabel)
		setSelected(newSelected)
	}

	return (
		<PieChart width={400} height={400}>
			<Pie
				data={Data01}
				outerRadius={70}
				label={Label[0]}
				onClick={(d) => addNewLayer(setData02, ["", d.name, selected[2]], data.secondLayer[d.name].data, [false, true, false])}
			>
				{Data01.map((entry, index) => (
          			<Cell key={`cell-${index}`} fill={data.firstLayer.color[index]} />
        		))}
			</Pie>
			<Pie
				data={Data02}
				outerRadius={100}
				label={Label[1]}
				onClick={(d) => addNewLayer(setData03, ["", selected[1], d.name], data.thirdLayer[d.name].data, [false, false, true])}
			>
				{Data02.map((entry, index) => (
          			<Cell key={`cell-${index}`} fill={data.secondLayer[selected[1]].color[index]} />
        		))}

			</Pie>
			<Pie
				data={Data03}
				innerRadius={110}
				outerRadius={130}
				label={Label[2]}
			>
				{Data03.map((entry, index) => (
          			<Cell key={`cell-${index}`} fill={data.thirdLayer[selected[2]].color[index]} />
        		))}
			</Pie>
		</PieChart>
	)
}

export default Camembert;