const toPersianDigits = (value: string | number): string => {
  return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

export const formatPrice = (value: number): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  let formatted: string;

  if (absValue >= 1_000_000_000) {
    const amount = (absValue / 1_000_000_000).toFixed(
      absValue % 1_000_000_000 === 0 ? 0 : 1
    );
    formatted = `${toPersianDigits(amount)} میلیارد تومان`;
  } else if (absValue >= 1_000_000) {
    const amount = (absValue / 1_000_000).toFixed(
      absValue % 1_000_000 === 0 ? 0 : 1
    );
    formatted = `${toPersianDigits(amount)} میلیون تومان`;
  } else if (absValue >= 1_000) {
    const amount = (absValue / 1_000).toFixed(absValue % 1_000 === 0 ? 0 : 1);
    formatted = `${toPersianDigits(amount)} هزار تومان`;
  } else {
    formatted = `${toPersianDigits(absValue)} تومان`;
  }

  // اضافه کردن علامت منفی در صورت نیاز
  return isNegative ? `-${formatted}` : formatted;
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
