"use server";

import { cookies } from "next/headers";

const COOKIE_NAME_SALARY_INPUTS = "kxb-salary-compare-inputs";

// set optional salary compare inputs
type SalaryCompareInputs = {
  workHours: string;
  hourlyRate: string;
  commission: string;
  tax: string;
  taxTable: string;
};

type SalaryCompareInputsAction = {
  type: "SET_WORK_HOURS" | "SET_HOURLY_RATE" | "SET_COMMISSION" | "SET_TAX" | "SET_TAX_TABLE";
  payload: string;
};

const _internalSetSalaryCompareInputs = (
  state: SalaryCompareInputs,
  action: SalaryCompareInputsAction
) => {
  switch (action.type) {
    case "SET_WORK_HOURS":
      return { ...state, workHours: action.payload };
    case "SET_HOURLY_RATE":
      return { ...state, hourlyRate: action.payload };
    case "SET_COMMISSION":
      return { ...state, commission: action.payload };
    case "SET_TAX":
      return { ...state, tax: action.payload };
    case "SET_TAX_TABLE":
      return { ...state, taxTable: action.payload };
    default:
      return state;
  }
};

const getDefaultSalaryCompareInputs = (): SalaryCompareInputs => {
  return {
    workHours: process.env.NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS,
    hourlyRate: process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
    commission: process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
    tax: process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
    taxTable: process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX_TABLE ?? ""
  };
};

const setSalaryCompareInputs = (action: SalaryCompareInputsAction) => {
  // get cookie state
  const cookieState = cookies().get(COOKIE_NAME_SALARY_INPUTS)?.value;

  const state: SalaryCompareInputs = cookieState
    ? (JSON.parse(cookieState) as SalaryCompareInputs)
    : getDefaultSalaryCompareInputs();

  // update state
  const newState = _internalSetSalaryCompareInputs(state, action);

  // set cookie state
  cookies().set(COOKIE_NAME_SALARY_INPUTS, JSON.stringify(newState));
};

const getSalaryCompareInputs = () => {
  // get cookie state
  const cookieState = cookies().get(COOKIE_NAME_SALARY_INPUTS)?.value;

  const state: SalaryCompareInputs = cookieState
    ? (JSON.parse(cookieState) as SalaryCompareInputs)
    : getDefaultSalaryCompareInputs();

  return state;
};

export { getSalaryCompareInputs, setSalaryCompareInputs };
