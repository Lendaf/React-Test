/* Pie.js */
import React, { useState } from 'react'
import { PieChart, Pie, Cell } from "recharts";
import data from "../data/test.json"

const Camembert = () => {
	const [Data01, setData01] = useState(data.firstLayer.data)
	const [Data02, setData02] = useState([])
	const [Data03, setData03] = useState([])
	const [Label, setLabel] = useState([true, false, false])
	const [selected, setSelected] = useState([{}, {}, {}])

	function remove(setOldData, name, oldData) {
		var newData = []

		oldData.map(item => item.name === name ? newData : newData = [...newData, item])
		setOldData(newData)
	}

	function addNewLayer(setNewData, newSelected, newData, newLabel, setOldData, oldData, d) {
		setNewData(newData)
		setLabel(newLabel)
		setSelected(newSelected)
		remove(setOldData, d.name, oldData)
	}

	return (
		<PieChart width={450} height={450}>
			<Pie
				data={Data01}
				startAngle={selected[1].endAngle ? selected[1].endAngle : 0}
				endAngle={selected[1].startAngle ? selected[1].startAngle : 360}
				outerRadius={100}
				label={Label[0]}
				cx={200}
				cy={200}
				onClick={(d) => addNewLayer(setData02, [{}, d, selected[2]], data.secondLayer[d.name].data, [false, true, false], setData01, Data01, d)}
				onMouseOver={() => console.log(selected)}
			>
				{Data01.map((entry, index) => (
					<Cell key={`cell-${index}`} strokeWidth={0} fill={data.firstLayer.color[index + (Label[0] ? 0 : 1)]} />
        		))}
			</Pie>
			<Pie
				data={Data02}
				startAngle={selected[1].startAngle + 5}
				endAngle={selected[1].endAngle - 5}
				outerRadius={130}
				label={Label[1]}
				cx={205}
				cy={195}
				onClick={(d) => addNewLayer(setData03, [{}, selected[1], d], data.thirdLayer[d.name].data, [false, false, true], setData02, Data02, d)}
			>
				{Data02.map((entry, index) => (
					<Cell key={`cell-${index}`} strokeWidth={0} fill={data.secondLayer[selected[1].name].color[index + (Label[1] ? 0 : 1)]} />
        		))}
			</Pie>
			<Pie
				data={Data03}
				startAngle={selected[2].startAngle}
				endAngle={selected[2].endAngle}
				outerRadius={160}
				cx={210}
				cy={196}
				label={Label[2]}
			>
				{Data03.map((entry, index) => (
          			<Cell key={`cell-${index}`} strokeWidth={0} fill={data.thirdLayer[selected[2].name].color[index]} />
        		))}
			</Pie>
		</PieChart>
	)
}

export default Camembert;