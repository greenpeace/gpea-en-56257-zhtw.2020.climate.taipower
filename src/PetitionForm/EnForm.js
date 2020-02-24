import React, {useState, useRef, useEffect} from 'react';
import cx from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";

import ProgressBar from "../ProgressBar/ProgressBar.js"

import {FORMIK_KEY_TO_EN_KEY} from "./config";

const numBirthYears = 100
const currYear = new Date().getFullYear()
const birthYearOptions = []
for (var i = 0; i<numBirthYears; i++) {
	birthYearOptions.push({value:`01/01/${currYear-i}`, display:currYear-i})
}

export default (props) => {
	const targetPetitionNumber = 50000
	const [isOpened, setIsOpend] = useState(props.isOpened)
	const fakeForm = useRef()

	const errorMessages = {
	  required: "必填欄位 This is required",
	  invalid: "格式錯誤 Invalid Format"
	};
	const formik = useFormik({
		initialValues: {
			supporter_emailAddress: "",
			supporter_lastName: "",
			supporter_firstName: "",
			supporter_phoneNumber: "",
			supporter_birthYear: "", //birth year
			email_ok_taiwan: true
		},
	  validationSchema: Yup.object({
	    supporter_firstName: Yup.string().required(errorMessages.required),
	    supporter_lastName: Yup.string().required(errorMessages.required),
	    supporter_emailAddress: Yup.string()
	      .email(errorMessages.invalid)
	      .required(errorMessages.required),
	    supporter_phoneNumber: Yup.string()
	      .matches(/^[\d \-+]{8,20}$/, errorMessages.invalid)
	      .required(errorMessages.required),
	    supporter_birthYear: Yup.string()
	      .matches(/\d{4}/, errorMessages.invalid)
	      .required(errorMessages.required)
	  }),
	  onSubmit: values => {
	    // update final values into original en form
	    if (Object.keys(formik.errors).length > 0) {
	      throw new Error("There are still errors in formik");
	    }

	    // update all the collect values into legacy form
	    for (let formikKey in FORMIK_KEY_TO_EN_KEY) {
	      let el = document.querySelector(
	        `[name="${FORMIK_KEY_TO_EN_KEY[formikKey]}"]`
	      );
	      if (el) {
	      	if (formikKey === "email_ok_taiwan") {
	      		el.checked = formik.values[formikKey];
	      	} if (formikKey === "supporter_birthYear") {
	      		// append this element
	      		var option = document.createElement("option");
	      		option.text = formik.values[formikKey];
	      		option.value = formik.values[formikKey];

	      		el.appendChild(option);

	      		el.value = formik.values[formikKey];
	      	} else {
	      		el.value = formik.values[formikKey];
	      	}
	      } else {
	      	throw new Error(
	      		"Cannot find the input element with name:" +
	      		FORMIK_KEY_TO_EN_KEY[formikKey]
	      		);
	      }
	    }

	    // trigger the form submit
	    document.querySelector("form.en__component").submit();
	  }
	});

	useEffect(() => {
		window.ee.on('SHOULD_OPEN_FORM', () => {setIsOpend(true)})
	}, [])

	useEffect(()=>{
		let handleFocus = () => {
			// offsetParent === null means is invisiable: PropTypes.object.isRequired
			if (fakeForm.current && fakeForm.current.offsetParent!==null) {
				fakeForm.current.querySelector("input").focus()
			}
		}

		window.ee.on('FORM_FOCUS_INPUT', handleFocus)
		return () => {
			window.ee.off('FORM_FOCUS_INPUT', handleFocus)
		}
	}, [isOpened, fakeForm])

	// fetch the petition numbers
	const baseNumber = Math.floor(Math.sqrt(new Date())/500) // make it more
	const [petitionNumber, setPetitionNumber] = useState(baseNumber)

	useEffect(() => {
		fetch("https://cors-anywhere.arpuli.com/https://e-activist.com/ea-dataservice/data.service?service=EaDataCapture&token=7a06c0fc-32fe-43f1-8a1b-713b3ea496e1&campaignId=173932&contentType=json&resultType=summary")
			.then(response => response.json())
			.then(response => {
				if (response && response.rows) {
					let row = response.rows[0]
					let columns = row.columns

					// find that value
					columns.forEach(c => {
						if (c.name==="participations") {
							setPetitionNumber(parseInt(c.value, 10)+baseNumber)
						}
					})
				}
			})
			.catch(err => {
				console.error(err)
			})
	}, [])


	return (<div>
		<div className="is-hidden-desktop">
			<h2>立 即 連 署</h2>
			<h3>要求台電撤回海外煤炭投資<br/>停止犧牲環境與氣候來獲利！</h3>

			<ProgressBar value={petitionNumber} max={targetPetitionNumber} />
			<p className="more-people">號召更多朋友參與，達到目標： {Number(targetPetitionNumber).toLocaleString()} 人</p>
		</div>

		<div className="is-hidden-touch">
			{isOpened &&
				<div className="close-btn is-hidden-touch" onClick={()=>{setIsOpend(false)}}>
					<i className="fas fa-times-circle"></i>
				</div>
			}

			<h2 className="form-title ">立即連署，要求台電撤回海外煤炭投資，停止犧牲環境與氣候來獲利！</h2>
		</div>

		<ul className="is-hidden-desktop">
			<li>相同金額用於再生能源投資，年發電量至少超過 1.8 億度，可供約 5 萬戶家庭整年用電。</li>
			<li>綠色和平會將您的連署轉交台電或用於法律與政策修訂以<strong>減少臺灣國營事業對海外煤炭投資。</strong></li>
		</ul>

		{isOpened && <div>

			<ul className="is-hidden-touch">
				<li>相同金額用於再生能源投資，年發電量至少超過 1.8 億度，可供約 5 萬戶家庭整年用電。</li>
				<li>綠色和平會將您的連署轉交台電或用於法律與政策修訂以<strong>減少臺灣國營事業對海外煤炭投資。</strong></li>
			</ul>

			<form className="fake-form" onSubmit={formik.handleSubmit} ref={fakeForm}>


				<div className="field">
				  <label className="label">電子信箱</label>
				  <div className="control">

	          <input
	          	type="text"
	            name="supporter_emailAddress"
	            className={cx("input", {
	              "is-danger":
	                formik.errors["supporter_emailAddress"] &&
	                formik.touched["supporter_emailAddress"]
	            })}
	            placeholder="電郵地址 Email Address"
	            type="email"
	            {...formik.getFieldProps("supporter_emailAddress")}
	          />
	        </div>
	        {formik.errors["supporter_emailAddress"] &&
	          formik.touched["supporter_emailAddress"] && (
	            <div className="help is-danger">
	              {formik.errors["supporter_emailAddress"]}
	            </div>
	          )}
				</div>

				<div className="field is-horizontal">
					<div className="field-body">
						<div className="field last-name-field">
						  <label className="label">姓氏</label>
						  <div className="control">
						    <input
						      id="supporter_lastName"
						      name="supporter_lastName"
						      className={cx("input", {
						        "is-danger":
						          formik.errors["supporter_lastName"] &&
						          formik.touched["supporter_lastName"]
						      })}
						      type="text"
						      placeholder="姓氏 Last Name"
						      {...formik.getFieldProps("supporter_lastName")}
						      value={formik.values["supporter_lastName"]}
						    />
						  </div>
						  {formik.errors["supporter_lastName"] &&
						    formik.touched["supporter_lastName"] && (
						      <div className="help is-danger">
						        {formik.errors["supporter_lastName"]}
						      </div>
						    )}
						</div>

						<div className="field first-name-field">
						  <label className="label">名字</label>
						  <div className="control">
						    <input
						      name="supporter_firstName"
						      className={cx("input", {
						        "is-danger":
						          formik.errors["supporter_firstName"] &&
						          formik.touched["supporter_firstName"]
						      })}
						      type="text"
						      placeholder="名字 First Name"
						      {...formik.getFieldProps("supporter_firstName")}
						    />
						  </div>
						  {formik.errors["supporter_firstName"] &&
						    formik.touched["supporter_firstName"] && (
						      <div className="help is-danger">
						        {formik.errors["supporter_firstName"]}
						      </div>
						    )}
						</div>
					</div>
				</div>

				<div className="field is-horizontal">
					<div className="field-body">
						<div className="field phone-field">
						  <label className="label">電話</label>
						  <div className="control">
						    <input
						      name="supporter_phoneNumber"
						      className={cx("input", {
						        "is-danger":
						          formik.errors["supporter_phoneNumber"] &&
						          formik.touched["supporter_phoneNumber"]
						      })}
						      type="telephone"
						      placeholder="聯絡電話 Mobile Number"
						      {...formik.getFieldProps("supporter_phoneNumber")}
						    />
						  </div>
						  {formik.errors["supporter_phoneNumber"] &&
						    formik.touched["supporter_phoneNumber"] && (
						      <div className="help is-danger">
						        {formik.errors["supporter_phoneNumber"]}
						      </div>
						    )}
						</div>

						<div className="field select-birth-year">
						  <label className="label">出生年份</label>
						  <div className="control">
						  	<div className="select is-primary">
						  	  <select
						  	  	className={cx({
						  	  	  "is-danger":
						  	  	    formik.errors["supporter_birthYear"] &&
						  	  	    formik.touched["supporter_birthYear"]
						  	  	})}
						  	  	{...formik.getFieldProps("supporter_birthYear")}>
						  	    <option>YYYY</option>
						  	    {birthYearOptions.map(({value, display}) => <option key={value} value={value}>{display}</option>)}
						  	  </select>
						  	</div>
						  </div>
						  {formik.errors["supporter_birthYear"] &&
						    formik.touched["supporter_birthYear"] && (
						      <div className="help is-danger">
						        {formik.errors["supporter_birthYear"]}
						      </div>
						    )}
						</div>
					</div>
				</div>

				<div className="field">
				  <label className="checkbox">
				    <input
				    	type="checkbox"
				    	{...formik.getFieldProps("email_ok_taiwan")}
				    	checked={formik.values["email_ok_taiwan"]} />
				    <span className="desc">我要即時收到最新專案訊息，知道更多參與和協助的方法。（綠色和平尊重並保障您的個人隱私資料，您隨時可取消訂閱，請參考隱私保護政策。）</span>
				  </label>
				</div>
			</form>
		</div>
		}

		<div className="is-hidden-touch">
			<ProgressBar value={petitionNumber} max={targetPetitionNumber} />
			<p className="more-people">號召更多朋友參與，達到目標： {Number(targetPetitionNumber).toLocaleString("zh-TW")} 人</p>
		</div>

		{ !isOpened &&
			<button
				className="button is-primary open-form is-hidden-touch"
				onClick={() => {
					setIsOpend(true)
				}}>我要連署</button>}
		{isOpened &&
			<button
			  className={cx("button is-primary", {
			    "is-loading": formik.isSubmitting
			  })}
			  onClick={formik.handleSubmit}
			>
			  我要連署
			</button>
		}
	</div>)
}