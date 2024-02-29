import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectFilter } from "../Filter/filter-slice";
import { selectNumberOfPages } from "./pagination-slice";
import { loadItems } from "../Cards/cards-slice";

export const usePagination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = useSelector(selectFilter);
  const numberOfPages = useSelector(selectNumberOfPages);
  const {page} = useParams();
  const currentPage = Number(page) || 1;

  const hundlePage = (e) => {
    navigate(`/${e.target.value}`);
    console.log('navigate');
    dispatch(
      loadItems({
        page: e.target.value,
        filter,
      })
    );
  };

  return {hundlePage, currentPage, numberOfPages};
}