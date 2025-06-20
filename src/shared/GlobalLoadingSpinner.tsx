import LoadingSpinner from "../components/LoadingSpinner";
import { useLoadingSpinnerStore } from "../store/useLoadingSpinnerStore";

const GlobalLoadingSpinner = () => {
  const { isLoading } = useLoadingSpinnerStore();
  console.log("isloading : ", isLoading);
  return isLoading && <LoadingSpinner />;
};

export default GlobalLoadingSpinner;