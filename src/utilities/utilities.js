import clsx from "clsx";

export function convertToPersianDigits(number) {
  const numberString = number.toString();
  const persianDigits = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  return numberString.replace(
    /[0-9]/g,
    (match) => persianDigits[match] || match
  );
}

export function thousandSeparator(number) {
  if (!number)
    return <span className="text-gray text-[18px]">بدون اطلاعات</span>;
  let numStr = String(number);
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertToPersianDigits(numStr);
}

export function percent(number) {
  if (!number)
    return (
      <span className={"text-[18px] font-bold text-center text-gray"}>---</span>
    );
  let numStr = String(convertToPersianDigits(number));
  numStr = (
    <h6
      className={clsx(
        "text-[18px] font-bold text-center",
        number > 0 && "text-green",
        number === 0 && "text-gray",
        number < 0 && "text-red-500"
      )}
      dir="ltr"
    >
      % {numStr}
    </h6>
  );

  return numStr;
}
