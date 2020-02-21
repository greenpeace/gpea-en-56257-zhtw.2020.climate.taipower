import React, {useEffect, useState} from 'react';
import "./ProgressBar.scss"

/**
 *
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export default (props) => {
	// props.percent (0~100)
	// max: 30000
	// value: 2000

	const [completed, setCompleted] = useState(0)
	const [animateFinished, setAnimateFinished] = useState(false)

	useEffect(() => {
		setCompleted(props.value/props.max*100)
		setAnimateFinished(false)

		setTimeout(() => {
			setAnimateFinished(true)
		}, 2000)
	}, [props.value, props.max])

	return (
		<div className="progressbar">
			<div className={"progressbar-container "+props.className} {...props}>
				<div className="progressbar-progress" style={{width: `${completed}%`}}>
					<div className={"child-wrapper "+(animateFinished?'':'is-animating') }>
						{props.value.toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	)
}