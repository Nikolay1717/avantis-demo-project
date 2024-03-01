import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectFilter } from "../Filter/filter-slice";
import { loadNumberOfPages, selectPaginationInfo } from "./pagination-slice";
import { loadItems } from "../Cards/cards-slice";
import { useEffect } from "react";

export const usePagination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = useSelector(selectFilter);
  const {status, error, retryCount, numberOfPages} = useSelector(selectPaginationInfo);
  const {page} = useParams();
  const currentPage = Number(page) || 1;

  useEffect(() => {
    if ((status === "idle" || status === "rejected") && retryCount < 3)
      dispatch(loadNumberOfPages(filter));
  }, [status, retryCount, filter, dispatch]);

  const hundlePage = (e) => {
    navigate(`/${e.target.value}`);
    dispatch(
      loadItems({
        page: e.target.value,
        filter,
      })
    );
  };

  return {hundlePage, currentPage, numberOfPages, error};
}