export function thousandSeparator(number) {
  // Convert the number to a string
  let numStr = String(number);

  // Use regular expression to add commas as thousand separators
  // The pattern (\d)(?=(\d{3})+$) matches any digit that is followed by groups of three digits at the end of the string
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numStr;
}
