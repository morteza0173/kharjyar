const toPersianDigits = (value: string | number): string => {
  return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

export const formatPrice = (value: number): string => {
  let formatted: string;

  if (value >= 1_000_000) {
    const amount = (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1);
    formatted = `${toPersianDigits(amount)} میلیون تومان`;
  } else if (value >= 1_000) {
    const amount = (value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1);
    formatted = `${toPersianDigits(amount)} هزار تومان`;
  } else {
    formatted = `${toPersianDigits(value)} تومان`;
  }

  return formatted;
};


export const formatPriceWithCommaFa = (value: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const addCommas = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const toPersianDigits = (str: string) =>
    str.replace(/\d/g, (d) => persianDigits[parseInt(d)]);

  const numberWithCommas = addCommas(value.toString());
  const numberInPersian = toPersianDigits(numberWithCommas);

  return `${numberInPersian} تومان`;
};
