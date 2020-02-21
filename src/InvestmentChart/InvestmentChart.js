import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Label } from 'recharts';
import useWindowSize from "../lib/use-window-size.js"

// import LogoText from

const data = [
	{name: '1985', amt: 8},
	{name: '2010', amt: 14},
	{name: '2014', amt: 18.2},
	{name: '2018', amt: 61.2},
];

export default (props) => {
	const {innerHeight, innerWidth, outerHeight, outerWidth} = useWindowSize()
	let chartWidth = Math.floor(Math.min(innerWidth*0.8, 900))
	let chartHeight = Math.floor(chartWidth/1.3)
	let isMobile = innerWidth<1024;

	const CustomizedLabel = (props) => {
		const {x,y, value} = props;

		return (
			<text x={x} y={y}
				dy={isMobile ? -20:-50}
				fill="#FFFFFF"
				fontSize={isMobile ? 12 : 34}
				textAnchor="middle">{value}</text>
		)
	};

	const CustomizedDot = (props) => {
		const {cx, cy, value} = props;

		return (
			<image key={cx}
				x={isMobile ? cx-11/2: cx-15}
				y={isMobile ? cy-13/2-3: cy-28}
				width={isMobile ? 11:33}
				height={isMobile ? 13:39}
				xlinkHref={require("../images/Desktop_fire.png")} alt="" />
		);
	};

	return (
		<LineChart
			data={data}
			width={chartWidth}
			height={chartHeight}
			margin={{
				top: isMobile ? 35 : 70,
				right: isMobile ? 0 : 30,
				bottom: isMobile ? 0 : 20,
				left: isMobile ? 0 : 30 }}
		>
			<Line
				type="linear"
				dataKey="amt"
				stroke="#eb9062"
				strokeWidth={isMobile ? 1:3}
				label={CustomizedLabel}
				dot={CustomizedDot}/>
			<CartesianGrid
				stroke="#636363"
				vertical={false}
			/>
			<XAxis
				dataKey="name"
				padding={{
					left:isMobile ? 30 : 100,
					right:isMobile ? 30 : 100
				}}
				stroke="#FFFFFF"
				strokeWidth={isMobile ? 1:3}
				tickSize="0"
				tick={{ transform: 'translate(0, 10)'}}
				/>
			<YAxis
				stroke="#FFFFFF"
				strokeWidth={isMobile ? 1:3}
				ticks={[5,10,50,100]}
				scale="sqrt"
				width={isMobile ? 35 : 60}
				padding={{bottom: isMobile ? 5 : 50}}
				tickSize="0"
				tick={{ transform: `translate(${isMobile?-10:-30}, 0)`}}>

				<Label
					value="(億元)"
					position="top"
					offset={isMobile ? 15 : 40}
					dx={isMobile ? -5:-17}
					style={{
						textAnchor:"middle",
						fontSize: isMobile ? '10px':'22px',
						fill: '#FFFFFF'
					}}/>
			</YAxis>
		</LineChart>
	)
}