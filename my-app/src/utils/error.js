import { toast } from "react-toastify";

export default function showErrorToast(error) {
  return toast.error(
    error?.response?.data?.message ||
      error?.response?.data?.details[0]?.message ||
      "Something went wrong"
  );
}
