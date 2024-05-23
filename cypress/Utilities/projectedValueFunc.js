export function calculateProjectedAmount(principal, rate, duration) {
  let value = principal * Math.pow(1 + rate, duration);
  return value;
}

