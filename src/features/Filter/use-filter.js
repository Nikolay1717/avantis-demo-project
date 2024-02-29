import { useDispatch, useSelector } from "react-redux"
import { selectFilters, setBrand, setPrice } from "./filters-slice";

export const useFilter = () => {
  const dispatch = useDispatch();
  const {brand, price} = useSelector(selectFilters);

  const handleBrand = (e) => {
    dispatch(setBrand(e.target.value))
  }

  const handlePrice = (e) => {
    dispatch(setPrice(e.target.value))
  }

  return {handleBrand, handlePrice, brand, price};
}