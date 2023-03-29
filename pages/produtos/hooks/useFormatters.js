import SimpleMaskMoney from "simple-mask-money";

const useFormatters = ({ setPriceForm }) => {
  SimpleMaskMoney.args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: "R$ ",
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: ".",
    cursor: "move",
  };

  const handleInputNumberChange = (currentValue) => {
    const formattedValue = SimpleMaskMoney.formatToMask(currentValue);
    setPriceForm(formattedValue);
  };

  return {
    handleInputNumberChange,
  };
};

export default useFormatters;
