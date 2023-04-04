import Big from "big.js";

// Maximum sick pay per day is 6G divided by 260
const G = 111477;
const MAX_G_SICK_PAY_PER_YEAR = 6;
const MAN_YEARS = 260; // 260 work days per year
const WORK_HOURS_PER_DAY = 7.5;

const EARNING_CONSTANTS = {
  WORK_HOURS_PER_DAY: WORK_HOURS_PER_DAY,
  WORK_VACATION_DAYS: 25,
  WORK_HOLIDAY_PAY: 0.12,
  WORK_SICK_PAY_PER_HOUR: new Big(G)
    .times(MAX_G_SICK_PAY_PER_YEAR)
    .div(MAN_YEARS)
    .div(WORK_HOURS_PER_DAY)
    .round(2, 0)
    .toNumber(),
  TAX_TABLES: [
    "7100",
    "7101",
    "7102",
    "7103",
    "7104",
    "7105",
    "7106",
    "7107",
    "7108",
    "7109",
    "7110",
    "7111",
    "7112",
    "7113",
    "7114",
    "7115",
    "7116",
    "7117",
    "7118",
    "7119",
    "7120",
    "7121",
    "7122",
    "7123",
    "7124",
    "7125",
    "7126",
    "7127",
    "7128",
    "7129",
    "7130",
    "7131",
    "7132",
    "7133"
    // "7150",
    // "7160",
    // "7170",
    // "7300",
    // "7350",
    // "7500",
    // "7550",
    // "7700",
    // "6300",
    // "6350",
    // "6500",
    // "6550",
    // "6700",
    // "0100",
    // "0101"
  ]
};

export { EARNING_CONSTANTS };
