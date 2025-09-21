export const promiseErrorFunction = (error: any) => {
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  } else if (error?.response?.data?.detail) {
    return error?.response?.data?.detail;
  } else if (error?.response?.data?.details[0]?.msg) {
    return error?.response?.data?.details[0]?.msg;
  } else if (error?.response?.data?.errors[0]?.message) {
    return error?.response?.data?.errors[0]?.message;
  } else if (
    error?.response?.data?.errors &&
    error?.response?.data?.errors?.length > 0
  ) {
    return error?.response?.data?.errors[0];
  } else if (error.message) {
    return error.message;
  } else {
    return "An unknown error occurred. Contact support.";
  }
};
