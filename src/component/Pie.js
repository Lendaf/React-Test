/* Pie.js */
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend } from "recharts";
import data from "../data/test.json"

const Camembert = () => {
	const [Data01, setData01] = useState(data.firstLayer.data)
	const [Data02, setData02] = useState([])
	const [Data03, setData03] = useState([])
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

	function getCX(d) {
		const RADIAN = Math.PI / 180;
		const cos = Math.cos(-RADIAN * d.midAngle);
		const sx = d.cx + (d.outerRadius - 40) * cos;
		return sx
	};

	function getCY(d) {
		const RADIAN = Math.PI / 180;
		const sin = Math.sin(-RADIAN * d.midAngle);
		const sy = d.cy + (d.outerRadius - 40) * sin;
		return sy
	};

	return (
		<PieChart width={1200} height={884}>
			<Pie
				data={Data01}
				startAngle={selected[1].endAngle ? selected[1].endAngle : 0}
				endAngle={selected[1].startAngle ? 360 + selected[1].startAngle : 360}
				outerRadius={150}
				label={(d) => (d.name + ', ' + d.value + ' ' + data.firstLayer.unit)}
				onClick={(d) => addNewLayer(setData02, [{}, d, selected[2]], data.secondLayer[d.name].data, setData01, Data01, d)}
			>
				{Data01.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={data.firstLayer.color[index + (index >= selected[1].id ? 1 : 0)]} />
        		))}
			</Pie>
			<Pie
				data={Data02}
				startAngle={selected[2].endAngle ? selected[2].endAngle : selected[1].startAngle}
				endAngle={selected[2].startAngle ? selected[1].endAngle : selected[1].endAngle}
				cx={getCX(selected[1])}
				cy={getCY(selected[1])}
				label={(d) => (d.name + ', ' + d.value + ' ' + data.secondLayer.unit)}
				outerRadius={150}
				onClick={(d) => addNewLayer(setData03, [{}, selected[1], d], data.thirdLayer[d.name].data, setData02, Data02, d)}
			>
				{Data02.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={data.secondLayer[selected[1].name].color[index + (index >= selected[2].id ? 1 : 0)]} />
        		))}
			</Pie>
			<Pie
				data={Data03}
				startAngle={selected[2].startAngle}
				endAngle={selected[2].endAngle}
				cx={getCX(selected[2])}
				cy={getCY(selected[2])}
				label={(d) => (d.name + ', ' + d.value + ' ' + data.thirdLayer.unit)}
				outerRadius={150}
			>
				{Data03.map((entry, index) => (
          			<Cell key={`cell-${index}`} fill={data.thirdLayer[selected[2].name].color[index]} />
        		))}
			</Pie>
		</PieChart>
	)
}

export default Camembert;