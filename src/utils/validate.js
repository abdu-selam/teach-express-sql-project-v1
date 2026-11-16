const isNumber = (input) => {
  const num = Number(input);

  return !Number.isNaN(num);
  // !NaN => true, !0 => true
  //   if (Number.isNaN(num)) {
  //     return false;
  //   }
  //   return true;
};

// const input = "Sofia" // NaN -> true -> false
// const input2 = "10" // 10 -> false -> true

module.exports = {
  isNumber,
};
