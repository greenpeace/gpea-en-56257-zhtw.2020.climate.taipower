import React, {useState, useRef, useEffect} from 'react';
import EnForm from "./EnForm.js"
import SuccForm from "./SuccForm.js"

import "./EnForm.scss"

import {resolveEnPagePetitionStatus, resolveInitFormValues} from "./formHelpers";

const enPageStatus = resolveEnPagePetitionStatus()
console.log('enPageStatus', enPageStatus)

export default (props) => {
	return (<div className="en-form">
		{enPageStatus!=='SUCC' && <EnForm {...props}/>}
		{enPageStatus==='SUCC' && <SuccForm {...props}/>}
	</div>)
}