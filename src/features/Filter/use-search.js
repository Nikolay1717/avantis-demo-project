import { useDispatch, useSelector } from "react-redux";
import { loadFilteredItems } from "../Cards/cards-slice";
import { selectFilter, setFilterBy, setSearchText } from "./filter-slice";
import { useNavigate } from "react-router-dom";
import { loadNumberOfPages } from "../Pagination/pagination-slice";

export const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const filter = useSelector(selectFilter);

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
  }

  const handleSelect = (e) => {
    dispatch(setFilterBy(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadNumberOfPages(filter));
    dispatch(loadFilteredItems(filter));
    navigate('/1');
  }

  return {handleSearch, handleSubmit, handleSelect};
};
