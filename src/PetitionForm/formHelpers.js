import { FORMIK_KEY_TO_EN_KEY } from "./config";

/**
 * Resolve the en page status by checking the pageJson
 *
 * @return {string} FRESH | SUCC | ERROR
 */
 export const resolveEnPagePetitionStatus = () => {
  let status = "FRESH";
  window.pageJson = window.pageJson || {}

  if (window.pageJson.pageNumber === 2) {
    status = "SUCC"; // succ page
  } else {
    status = "FRESH"; // start page
  }

  return status;
};

export const getUrlParams = () => {
  const { searchParams } = new URL(window.location.href);
  let p = {};
  for (let [k, v] of searchParams.entries()) {
    p[k] = v;
  }
  return p;
};

// prepare form init values
const getInputValueByFormilKey = k => {
  let found = document.querySelector(`[name="${FORMIK_KEY_TO_EN_KEY[k]}"]`);
  return found ? found.value : "";
};
const getCheckboxValueByFormilKey = k => {
  let found = document.querySelector(`[name="${FORMIK_KEY_TO_EN_KEY[k]}"]`);
  return found ? found.checked : "";
};

/**
 * Resolve the initial values for formik
 * @return {object}
 */
export const resolveInitFormValues = () => {
  const values = {};

  Object.keys(FORMIK_KEY_TO_EN_KEY, k => {
    if (k==="email_ok_taiwan") {
      values[k] = getCheckboxValueByFormilKey(k);
    } else {
      values[k] = getInputValueByFormilKey(k);
    }
  })

  return [values];
};
