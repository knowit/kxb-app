// Based on https://github.com/Skatteetaten/trekktabell
// TODO: Add tests, major refactoring + cleanup
// TODO: Add support for different periods?
// Can test against https://api-tabellkort.app.skatteetaten.no/?valgtTabell=7100&valgtInntektType=Lonn&valgtPeriode=PERIODE_1_MAANED&valgtLonn=112000&visHeleTabellen=false&valgtAar=2023
// substitute valgtTabell with the table you want to use
// substitute valgtLonn with the salary you want to use
//
// getTableTax return should equal the value returned from the API above

import { TAX_CONSTANTS } from "@/constants/tax-constants";
import { Big, type BigSource } from "big.js";

enum Tabelltype {
  VANLIG,
  PENSJONIST,
  STANDARDFRADRAG,
  SJØ,
  FINNMARK,
  SPESIAL
}

type TaxTable = {
  tabelltype: Tabelltype;
  tabellFradrag: number;
  klasseFradrag: number;
  trygdeavgiftstype: string;
  trekk_i_12_mnd: boolean;
  overskytendeProsent: number;
  isStandardFradrag: () => boolean;
  ikkeTrygdeavgift: () => boolean;
  lavSatsTrygdeavgift: () => boolean;
};

type Period = {
  inntektsPeriode: number;
  trekkPeriode: number;
  inntektsPeriodePensjon: number;
  trekkPeriodePensjon: number;
  inntektsPeriodeStandardfradrag: number;
  trekkPeriodeStandardfradrag: number;
  avrunding: number;
  maxTrekkgrunnlag: number;
};

const PERIOD_CONSTANTS: Period = {
  inntektsPeriode: 12.12,
  trekkPeriode: 10.5,
  inntektsPeriodePensjon: 12,
  trekkPeriodePensjon: 11,
  inntektsPeriodeStandardfradrag: 12,
  trekkPeriodeStandardfradrag: 10.5,
  avrunding: 100,
  maxTrekkgrunnlag: 99800
};

const createTaxTable = (
  tabelltype: Tabelltype,
  tabellFradrag: number,
  klasseFradrag: number,
  trygdeavgiftstype: string,
  trekk_i_12_mnd: boolean,
  overskytendeProsent: number
): TaxTable => ({
  tabelltype,
  tabellFradrag,
  klasseFradrag,
  trygdeavgiftstype,
  trekk_i_12_mnd,
  overskytendeProsent,
  isStandardFradrag: () =>
    tabelltype === Tabelltype.STANDARDFRADRAG ||
    tabelltype === Tabelltype.SJØ ||
    tabelltype === Tabelltype.FINNMARK,
  ikkeTrygdeavgift: () => trygdeavgiftstype === "Ingen",
  lavSatsTrygdeavgift: () => trygdeavgiftstype === "Lav"
});

const TAX_TABLES: Record<string, TaxTable> = {
  "7100": createTaxTable(
    Tabelltype.VANLIG,
    0,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7101": createTaxTable(
    Tabelltype.VANLIG,
    10000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7102": createTaxTable(
    Tabelltype.VANLIG,
    20000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7103": createTaxTable(
    Tabelltype.VANLIG,
    30000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7104": createTaxTable(
    Tabelltype.VANLIG,
    40000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7105": createTaxTable(
    Tabelltype.VANLIG,
    50000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7106": createTaxTable(
    Tabelltype.VANLIG,
    60000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7107": createTaxTable(
    Tabelltype.VANLIG,
    70000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7108": createTaxTable(
    Tabelltype.VANLIG,
    80000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7109": createTaxTable(
    Tabelltype.VANLIG,
    90000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7110": createTaxTable(
    Tabelltype.VANLIG,
    100000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7111": createTaxTable(
    Tabelltype.VANLIG,
    110000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7112": createTaxTable(
    Tabelltype.VANLIG,
    120000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7113": createTaxTable(
    Tabelltype.VANLIG,
    130000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7114": createTaxTable(
    Tabelltype.VANLIG,
    140000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7115": createTaxTable(
    Tabelltype.VANLIG,
    150000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7116": createTaxTable(
    Tabelltype.VANLIG,
    160000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7117": createTaxTable(
    Tabelltype.VANLIG,
    170000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7118": createTaxTable(
    Tabelltype.VANLIG,
    180000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7119": createTaxTable(
    Tabelltype.VANLIG,
    190000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7120": createTaxTable(
    Tabelltype.VANLIG,
    -10000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7121": createTaxTable(
    Tabelltype.VANLIG,
    -20000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7122": createTaxTable(
    Tabelltype.VANLIG,
    -30000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7123": createTaxTable(
    Tabelltype.VANLIG,
    -40000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7124": createTaxTable(
    Tabelltype.VANLIG,
    -50000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7125": createTaxTable(
    Tabelltype.VANLIG,
    -60000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7126": createTaxTable(
    Tabelltype.VANLIG,
    -70000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7127": createTaxTable(
    Tabelltype.VANLIG,
    -80000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7128": createTaxTable(
    Tabelltype.VANLIG,
    -90000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7129": createTaxTable(
    Tabelltype.VANLIG,
    -100000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7130": createTaxTable(
    Tabelltype.VANLIG,
    -110000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7131": createTaxTable(
    Tabelltype.VANLIG,
    -120000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7132": createTaxTable(
    Tabelltype.VANLIG,
    -130000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  ),
  "7133": createTaxTable(
    Tabelltype.VANLIG,
    -140000,
    TAX_CONSTANTS.KLASSE1_VANLIG,
    "Høy",
    false,
    TAX_CONSTANTS.OVERSKYTENDE_PROSENT_VANLIG
  )
};

function getInntektsPeriode(tabellnummer: TaxTable) {
  if (tabellnummer.tabelltype === Tabelltype.PENSJONIST)
    return PERIOD_CONSTANTS.inntektsPeriodePensjon;
  if (tabellnummer.tabelltype === Tabelltype.VANLIG) return PERIOD_CONSTANTS.inntektsPeriode;

  return PERIOD_CONSTANTS.inntektsPeriodeStandardfradrag;
}

function getTrekkPeriode(tabellnummer: TaxTable) {
  if (tabellnummer.tabelltype === Tabelltype.PENSJONIST)
    return PERIOD_CONSTANTS.trekkPeriodePensjon;
  if (tabellnummer.tabelltype === Tabelltype.VANLIG) return PERIOD_CONSTANTS.trekkPeriode;

  if (tabellnummer.trekk_i_12_mnd) return PERIOD_CONSTANTS.inntektsPeriodeStandardfradrag; // Hvis 12-måneders-trekk, skal inntektsperioden returneres !

  return PERIOD_CONSTANTS.trekkPeriodeStandardfradrag;
}

function beregnMinsteFradrag(tabellnummer: TaxTable, personInntektAar: Big) {
  if (tabellnummer.tabelltype === Tabelltype.PENSJONIST)
    return beregnMinstefradragPensjon(personInntektAar);

  if (tabellnummer.tabelltype === Tabelltype.SJØ) return beregnMinstefradragSjo(personInntektAar);

  return beregnMinstefradragVanlig(personInntektAar);
}

// Beregner både for vanlige tabeller og standardfradrag-tabeller
function beregnMinstefradragVanlig(personInntektAar: Big) {
  let minstefradrag = personInntektAar.times(TAX_CONSTANTS.ANV_MINSTE_FRAD_PROSENT).div(100);

  if (minstefradrag.gt(TAX_CONSTANTS.MAX_ANV_MINSTE_FRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.MAX_ANV_MINSTE_FRADRAG);
  }

  if (minstefradrag.lt(TAX_CONSTANTS.MIN_ANV_MINSTE_FRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.MIN_ANV_MINSTE_FRADRAG);
  }

  if (minstefradrag.lt(TAX_CONSTANTS.ANV_LONNSFRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.ANV_LONNSFRADRAG);
  }

  if (minstefradrag.gt(personInntektAar)) {
    minstefradrag = personInntektAar;
  }

  return minstefradrag;
}

function beregnMinstefradragPensjon(personInntektAar: Big) {
  let minstefradrag = personInntektAar
    .times(TAX_CONSTANTS.ANV_MINSTE_FRAD_PROSENT_PENSJ)
    .div(100)
    .round(0);

  if (minstefradrag.gt(TAX_CONSTANTS.MAX_ANV_MINSTE_FRADRAG_PENSJ)) {
    minstefradrag = new Big(TAX_CONSTANTS.MAX_ANV_MINSTE_FRADRAG_PENSJ);
  }

  if (minstefradrag.lt(TAX_CONSTANTS.MIN_ANV_MINSTE_FRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.MIN_ANV_MINSTE_FRADRAG);
  }

  if (minstefradrag.gt(personInntektAar)) {
    minstefradrag = personInntektAar;
  }

  return minstefradrag;
}

function beregnMinstefradragSjo(personInntektAar: Big) {
  let minstefradrag = personInntektAar.times(TAX_CONSTANTS.MINSTE_FRAD_PROSENT).div(100).round(0);

  if (minstefradrag.gt(TAX_CONSTANTS.MAX_MINSTE_FRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.MAX_MINSTE_FRADRAG);
  }

  if (minstefradrag.lt(TAX_CONSTANTS.MIN_MINSTE_FRADRAG)) {
    minstefradrag = new Big(TAX_CONSTANTS.MIN_MINSTE_FRADRAG);
  }

  if (minstefradrag.gt(personInntektAar)) {
    minstefradrag = personInntektAar;
  }

  return minstefradrag;
}

function beregnStandardFradrag(tabellnummer: TaxTable, personInntektAar: Big) {
  if (!tabellnummer.isStandardFradrag()) return new Big(0);

  let standardFradrag = personInntektAar.times(TAX_CONSTANTS.STFRADRAG_PROSENT).div(100).round(0);
  return standardFradrag.gt(TAX_CONSTANTS.MAX_STFRADRAG)
    ? new Big(TAX_CONSTANTS.MAX_STFRADRAG)
    : standardFradrag;
}

function beregnSjoFradrag(tabellnummer: TaxTable, personInntektAar: Big) {
  if (tabellnummer.tabelltype !== Tabelltype.SJØ) return new Big(0);

  let sjoFradrag = personInntektAar.times(TAX_CONSTANTS.SJO_PROSENT).div(100).round(0);
  return sjoFradrag.gt(TAX_CONSTANTS.MAX_SJO_FRADRAG)
    ? new Big(TAX_CONSTANTS.MAX_SJO_FRADRAG)
    : sjoFradrag;
}

function finnAlminneligInntektAar(tabellnummer: TaxTable, personInntektAar: Big) {
  return personInntektAar
    .minus(beregnMinsteFradrag(tabellnummer, personInntektAar))
    .minus(tabellnummer.tabellFradrag)
    .minus(beregnStandardFradrag(tabellnummer, personInntektAar))
    .minus(beregnSjoFradrag(tabellnummer, personInntektAar))
    .minus(tabellnummer.klasseFradrag);
}

// BEREGN SKATT
function beregnKommuneskatt(alminneligInntektAar: Big) {
  return alminneligInntektAar.gt(0)
    ? alminneligInntektAar.times(TAX_CONSTANTS.SKATTORE).div(100).round(0)
    : new Big(0);
}

function beregnFelleseskatt(tabellnummer: TaxTable, alminneligInntektAar: Big) {
  if (alminneligInntektAar.lt(0)) {
    return new Big(0);
  }

  return tabellnummer.tabelltype === Tabelltype.FINNMARK
    ? alminneligInntektAar.times(TAX_CONSTANTS.FELLES_SKATT_FINNMARK).div(100).round(0)
    : alminneligInntektAar.times(TAX_CONSTANTS.FELLES_SKATT_VANLIG).div(100).round(0);
}

function beregnTrinnskatt(tabellnummer: TaxTable, personInntektAar: Big) {
  if (personInntektAar.lt(TAX_CONSTANTS.TRINN1)) {
    return 0;
  }

  let prosentTrinn3: Big = new Big(0);
  if (tabellnummer.tabelltype === Tabelltype.FINNMARK) {
    prosentTrinn3 = new Big(TAX_CONSTANTS.PROSENT_TRINN3_FINNMARK);
  } else {
    prosentTrinn3 = new Big(TAX_CONSTANTS.PROSENT_TRINN3);
  }

  if (personInntektAar.lt(TAX_CONSTANTS.TRINN2)) {
    return beregnTrinnskattHvisInntektUnderTrinn2(personInntektAar);
  }

  if (personInntektAar.lt(TAX_CONSTANTS.TRINN3)) {
    return beregnTrinnskattHvisInntektUnderTrinn3(personInntektAar);
  }

  if (personInntektAar.lt(TAX_CONSTANTS.TRINN4)) {
    return beregnTrinnskattHvisInntektUnderTrinn4(personInntektAar, prosentTrinn3);
  }

  if (personInntektAar.lt(TAX_CONSTANTS.TRINN5)) {
    return beregnTrinnskattHvisInntektUnderTrinn5(personInntektAar, prosentTrinn3);
  }
  return beregnTrinnskattHvisInntektOverTrinn5(personInntektAar, prosentTrinn3);
}

function beregnTrinnskattHvisInntektUnderTrinn2(personInntektAar: Big) {
  return personInntektAar
    .minus(TAX_CONSTANTS.TRINN1)
    .times(TAX_CONSTANTS.PROSENT_TRINN1)
    .div(100)
    .round(0)
    .toNumber();
}

function beregnTrinnskattHvisInntektUnderTrinn3(personInntektAar: Big) {
  return new Big(TAX_CONSTANTS.TRINN2)
    .minus(TAX_CONSTANTS.TRINN1)
    .times(TAX_CONSTANTS.PROSENT_TRINN1)
    .div(100)
    .plus(personInntektAar.minus(TAX_CONSTANTS.TRINN2).times(TAX_CONSTANTS.PROSENT_TRINN2).div(100))
    .round(0);
}

function beregnTrinnskattHvisInntektUnderTrinn4(personInntektAar: Big, prosentTrinn3: Big) {
  return new Big(TAX_CONSTANTS.TRINN2)
    .minus(TAX_CONSTANTS.TRINN1)
    .times(TAX_CONSTANTS.PROSENT_TRINN1)
    .div(100)
    .plus(
      new Big(TAX_CONSTANTS.TRINN3)
        .minus(TAX_CONSTANTS.TRINN2)
        .times(TAX_CONSTANTS.PROSENT_TRINN2)
        .div(100)
    )
    .plus(personInntektAar.minus(TAX_CONSTANTS.TRINN3).times(prosentTrinn3).div(100))
    .round(0);
}

function beregnTrinnskattHvisInntektUnderTrinn5(personInntektAar: Big, prosentTrinn3: Big) {
  return new Big(TAX_CONSTANTS.TRINN2)
    .minus(TAX_CONSTANTS.TRINN1)
    .times(TAX_CONSTANTS.PROSENT_TRINN1)
    .div(100)
    .plus(
      new Big(TAX_CONSTANTS.TRINN3)
        .minus(TAX_CONSTANTS.TRINN2)
        .times(TAX_CONSTANTS.PROSENT_TRINN2)
        .div(100)
    )
    .plus(new Big(TAX_CONSTANTS.TRINN4).minus(TAX_CONSTANTS.TRINN3).times(prosentTrinn3).div(100))
    .plus(personInntektAar.minus(TAX_CONSTANTS.TRINN4).times(TAX_CONSTANTS.PROSENT_TRINN4).div(100))
    .round(0);
}

function beregnTrinnskattHvisInntektOverTrinn5(personInntektAar: Big, prosentTrinn3: Big) {
  return new Big(TAX_CONSTANTS.TRINN2)
    .minus(TAX_CONSTANTS.TRINN1)
    .times(TAX_CONSTANTS.PROSENT_TRINN1)
    .div(100)
    .plus(
      new Big(TAX_CONSTANTS.TRINN3)
        .minus(TAX_CONSTANTS.TRINN2)
        .times(TAX_CONSTANTS.PROSENT_TRINN2)
        .div(100)
    )
    .plus(new Big(TAX_CONSTANTS.TRINN4).minus(TAX_CONSTANTS.TRINN3).times(prosentTrinn3).div(100))
    .plus(
      new Big(TAX_CONSTANTS.TRINN5)
        .minus(TAX_CONSTANTS.TRINN4)
        .times(TAX_CONSTANTS.PROSENT_TRINN4)
        .div(100)
    )
    .plus(personInntektAar.minus(TAX_CONSTANTS.TRINN5).times(TAX_CONSTANTS.PROSENT_TRINN5).div(100))
    .round(0);
}

function beregnTrygdeavgift(tabellnummer: TaxTable, personInntektAar: Big) {
  if (personInntektAar.lt(TAX_CONSTANTS.AVG_FRI_TRYGDEAVGIFT)) {
    return new Big(0);
  }
  if (tabellnummer.ikkeTrygdeavgift()) {
    return new Big(0);
  }

  if (tabellnummer.lavSatsTrygdeavgift()) {
    return beregnTrygdeavgiftLavSats(personInntektAar);
  } else {
    return beregnTrygdeavgiftHoySats(personInntektAar);
  }
}

function beregnTrygdeavgiftLavSats(personInntektAar: Big) {
  if (personInntektAar.gt(TAX_CONSTANTS.LAV_GRENSE_TRYGDEAVGIFT)) {
    return new Big(personInntektAar).times(TAX_CONSTANTS.LAV_TRYGDEAVG_PROSENT).div(100).round(0);
  } else {
    return new Big(personInntektAar)
      .minus(TAX_CONSTANTS.AVG_FRI_TRYGDEAVGIFT)
      .times(TAX_CONSTANTS.TRYGDE_PROSENT)
      .div(100)
      .round(0);
  }
}

function beregnTrygdeavgiftHoySats(personInntektAar: Big) {
  if (personInntektAar.gt(TAX_CONSTANTS.HOY_GRENSE_TRYGDEAVGIFT)) {
    return new Big(personInntektAar).times(TAX_CONSTANTS.HOY_TRYGDEAVG_PROSENT).div(100).round(0);
  } else {
    return new Big(personInntektAar)
      .minus(TAX_CONSTANTS.AVG_FRI_TRYGDEAVGIFT)
      .times(TAX_CONSTANTS.TRYGDE_PROSENT)
      .div(100)
      .round(0);
  }
}

function beregnSkatt(tabellnummer: TaxTable, personInntektAar: Big, alminneligInntektAar: Big) {
  return new Big(beregnKommuneskatt(alminneligInntektAar))
    .plus(beregnFelleseskatt(tabellnummer, alminneligInntektAar))
    .plus(beregnTrinnskatt(tabellnummer, personInntektAar))
    .plus(beregnTrygdeavgift(tabellnummer, personInntektAar));
}

function beregnTrekk(tabellnummer: TaxTable, sumSkatt: Big) {
  let trekkMedDesimaler = sumSkatt.div(getTrekkPeriode(tabellnummer));

  return tabellnummer.tabelltype === Tabelltype.SJØ
    ? trekkMedDesimaler.round(0, 0)
    : trekkMedDesimaler.round(0);
}

function finnAvrundetTrekkgrunnlag(gross: Big) {
  const avrunding = new Big(PERIOD_CONSTANTS.avrunding);
  return gross.div(avrunding).round(0, 0).times(avrunding).plus(avrunding.div(2));
}

function beregnOverskytendeTrekk(tabellnummer: TaxTable, avrundetTrekkgrunnlag: Big) {
  if (new Big(PERIOD_CONSTANTS.maxTrekkgrunnlag).gt(avrundetTrekkgrunnlag)) {
    return new Big(0);
  }

  return avrundetTrekkgrunnlag
    .minus(PERIOD_CONSTANTS.maxTrekkgrunnlag)
    .times(tabellnummer.overskytendeProsent)
    .div(100)
    .round(0);
}

function getTableTax(taxTableName: string, gross: BigSource) {
  const bigGross = new Big(gross);

  let avrundetTrekkgrunnlag = finnAvrundetTrekkgrunnlag(bigGross);

  const taxTable = TAX_TABLES[taxTableName];

  const overskytendeTrekk = beregnOverskytendeTrekk(taxTable, avrundetTrekkgrunnlag);

  if (overskytendeTrekk.gt(0)) {
    avrundetTrekkgrunnlag = new Big(PERIOD_CONSTANTS.maxTrekkgrunnlag);
  }

  let personInntektAar = avrundetTrekkgrunnlag.times(getInntektsPeriode(taxTable)).round(0);

  let alminneligInntektAar = finnAlminneligInntektAar(taxTable, personInntektAar);

  let sumSkatt = beregnSkatt(taxTable, personInntektAar, alminneligInntektAar);

  let trekk = beregnTrekk(taxTable, sumSkatt).plus(overskytendeTrekk);

  if (trekk.gt(bigGross) && overskytendeTrekk.gt(0)) trekk = bigGross;

  return trekk;
}

export { getTableTax };
