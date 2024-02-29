import { useDispatch, useSelector } from "react-redux";
import { loadItems, selectItems } from "./cards-slice";
import { useEffect } from "react";
import { loadNumberOfPages } from "../Pagination/pagination-slice";
import { selectFilter } from "../Filter/filter-slice";
import { useParams } from "react-router-dom";

export const useItems = () => {
  const dispatch = useDispatch();
  const { status, error, items, retryCount } = useSelector(selectItems);
  const filter = useSelector(selectFilter);
  const {page} = useParams();
  const currentPage = Number(page) || 1;

  useEffect(() => {
    if ((status === "idle" || status === "rejected") && retryCount < 3)
      dispatch(loadItems({
        page: currentPage,
        filter,
      }));
  }, [status, retryCount, currentPage, filter, dispatch]);

  useEffect(() => {
    dispatch(loadNumberOfPages(filter))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {status, error, items};
}


