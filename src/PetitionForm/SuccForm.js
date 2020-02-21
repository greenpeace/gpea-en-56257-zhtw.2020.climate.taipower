import React, {useState, useRef, useEffect} from 'react';
import "./SuccForm.scss"

import {GetSocialMediaSiteLinks_WithShareLinks} from "../lib/social-share-media.js"

const shareArgs = {
	url: "https://act.gp/2Hzhhw3",
	title: "澳洲大火 台電有責",
	desc: "立即連署，要求台電撤回海外煤炭投資  停止犧牲環境與氣候獲利！"
}
const fbShareLinks = GetSocialMediaSiteLinks_WithShareLinks(Object.assign({}, shareArgs, {
	url: "https://act.gp/2Hzhhw3"
}))
const lineShareLinks = GetSocialMediaSiteLinks_WithShareLinks(Object.assign({}, shareArgs, {
	url: "https://act.gp/2SIAamV"
}))

export default (props) => {
	const thisRef = useRef()
	const handleClickShare = () => {
		if (navigator.share) {
		  // we can use web share!
		  navigator
		    .share({
		      url: shareArgs.url,
		      title: "",
		      text: shareArgs.title + (shareArgs.desc ? ":"+shareArgs.desc : "")
		    })
		    .then(() => console.log("Successfully shared"))
		    .catch(error => console.log("Error sharing:", error));
		}
	}

	const broswerSupportShare = navigator.share

	return (
	<div ref={thisRef}>
		<h2 className="form-title">
			感謝您加入連署，要求台電即刻停止海外煤炭投資。
		</h2>

		<ul>
			<li>請請持續關注和分享澳洲大火及氣候危機等訊息。</li>
			<li>綠色和平長期進行臺灣能源轉型工作，與公民團體共同阻止深澳燃煤電廠興建、敦促政府修訂《電業法》、監督大企業使用再生能源。氣候危機迫在眉睫，能源轉型是最佳解法，請支持綠色和平的氣候專案工作！</li>
		</ul>

		<div className="share-part">
			<p>
				分享至：
			</p>

			<a href={lineShareLinks["line.me"]} title="分享到 LINE" target="_blank" rel="noopener noreferrer"><i className="fab fa-line"></i></a>
			<a href={fbShareLinks.facebook} title="分享到 FACEBOOK" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
			{broswerSupportShare && <a href="#" title="分享" onClick={handleClickShare}><i className="fas fa-share-alt-square"></i></a>}
		</div>

		<a href="https://act.gp/32ccqKP" className="button is-primary" title="支持我們" target="_blank">
			支持我們
		</a>
	</div>)
}