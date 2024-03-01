import { usePagination } from "./use-pagination";

function Pagination() {
  const {hundlePage, currentPage, numberOfPages, error} = usePagination();

  return <>
    {error && <h4 className="text-center">{error}</h4>}
    {numberOfPages > 0 &&
    <div className="d-flex justify-content-center">
      <nav className="page-navigation" aria-label="Page navigation">
        <ul className="pagination d-flex align-items-center">
          <li className={currentPage<=1 ? 'disabled' : 'page-item'}>
            <button className="page-link" onClick={hundlePage} value={currentPage-1}>
              {'<<'}
            </button>
          </li>
          <li className="page-item">
            <div className="page-link mx-1 bg-primary-subtle">
              стр. {currentPage || 1} из {numberOfPages}
            </div>
          </li>
          <li className={currentPage>=numberOfPages ? 'disabled' : 'page-itenm'}>
            <button className="page-link" onClick={hundlePage} value={currentPage+1}>
              {'>>'}
            </button>
          </li>
        </ul>
      </nav>
    </div>}
  </>
}

export default Pagination;
