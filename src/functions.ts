export const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined;
};

export const isNotEmpty = (value: unknown): boolean => {
  return !isEmpty(value);
};
