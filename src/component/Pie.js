/* Pie.js */
import React, { useState } from 'react'
import { Sunburst } from 'react-vis'

var newChild = [
	{
		id: "00",
		name: 'Poste 1',
		value: 100,
		color: '#30132a',
		children: [],
	},
	{
		id: "01",
		name: 'Poste 2',
		value: 256,
		color: '#666d40',
		children: [],
	},
	{
		id: "02",
		name: 'Poste 3',
		value: 32,
		color: '#632607',
		children: [],
	},
	{
		id: "03",
		name: 'Poste 4',
		value: 56,
		color: '#e0e57c',
		children: [],
	},
	{
		id: "04",
		name: 'Poste 5',
		value: 89,
		color: '#d87ec5',
		children: [],
	},
]

var anotherChild = [
	{
		id: "000",
		name: 'Poste 1',
		value: 100,
		color: '#30132a',
		children: [],
	},
	{
		id: "001",
		name: 'Poste 2',
		value: 256,
		color: '#666d40',
		children: [],
	},
	{
		id: "002",
		name: 'Poste 3',
		value: 32,
		color: '#632607',
		children: [],
	},
	{
		id: "003",
		name: 'Poste 4',
		value: 56,
		color: '#e0e57c',
		children: [],
	},
	{
		id: "004",
		name: 'Poste 5',
		value: 89,
		color: '#d87ec5',
		children: [],
	},
]

var Data = {
	children: [
		{
			id: "0",
			name: 'Poste 1',
			value: 100,
			color: '#30132a',
			children: [],
		},
		{
			id: "1",
			name: 'Poste 2',
			value: 256,
			color: '#666d40',
			children: [],
		},
		{
			id: "2",
			name: 'Poste 3',
			value: 32,
			color: '#632607',
			children: [],
		},
		{
			id: "3",
			name: 'Poste 4',
			value: 56,
			color: '#e0e57c',
			children: [],
		},
		{
			id: "4",
			name: 'Poste 5',
			value: 89,
			color: '#d87ec5',
			children: [],
		},
	]
}

const Pie = () => {
	const [data, setdata] = useState(Data)

	function differentLayer(d) {
		var tmp = data
		if ((d.id).length === 1) {
			tmp.children[(d.id)[0]].children = newChild
			setdata(Data)
		} else if ((d.id).length === 2) {
			tmp.children[(d.id)[0]].children[(d.id)[1]].children = anotherChild
			setdata(Data)
		}
		console.log(data)
	}

	return (
		<Sunburst
			data={data}
			getLabel={d => d.name}
			showLabels
			getSize={d => d.value}
			width={400}
			height={300}
			onValueClick={(d, _) => differentLayer(d)}
		/>
	)
}

export default Pie;