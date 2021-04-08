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

	function addNewLayer(setNewData, newSelected, newData, setOldData, oldData, d) {
		setNewData(newData)
		setSelected(newSelected)
		remove(setOldData, d.name, oldData)
	}

	return (
		<PieChart width={450} height={450}>
			<Pie
				data={Data01}
				startAngle={selected[1].endAngle ? selected[1].endAngle : 0}
				endAngle={selected[1].startAngle ? 360 + selected[1].startAngle : 360}
				outerRadius={100}
				label
				onClick={(d) => addNewLayer(setData02, [{}, d, selected[2]], data.secondLayer[d.name].data, setData01, Data01, d)}
				onMouseOver={() => console.log(Object.entries(selected[1]).length === 0)}
			>
				{Data01.map((entry, index) => (
					Object.entries(selected[1]).length === 0 ? <Cell key={`cell-${index}`} fill={data.firstLayer.color[index]} /> :
					<Cell key={`cell-${index}`} strokeWidth={0} fill={data.firstLayer.color[index + 1]} />
        		))}
			</Pie>
			<Pie
				data={Data02}
				startAngle={selected[1].startAngle}
				endAngle={selected[1].endAngle}
				outerRadius={130}
				label
				onClick={(d) => addNewLayer(setData03, [{}, selected[1], d], data.thirdLayer[d.name].data, setData02, Data02, d)}
			>
				{Data02.map((entry, index) => (
					Object.entries(selected[2]).length === 0 ? <Cell key={`cell-${index}`} fill={data.secondLayer[selected[1].name].color[index]} /> :
					<Cell key={`cell-${index}`} strokeWidth={0} fill={data.secondLayer[selected[1].name].color[index + 1]} />
        		))}
			</Pie>
			<Pie
				data={Data03}
				startAngle={selected[2].startAngle}
				endAngle={selected[2].endAngle}
				outerRadius={160}
				label
			>
				{Data03.map((entry, index) => (
          			<Cell key={`cell-${index}`} fill={data.thirdLayer[selected[2].name].color[index]} />
        		))}
			</Pie>
		</PieChart>
	)
}

export default Camembert;