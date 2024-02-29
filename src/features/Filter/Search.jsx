import { useSearch } from "./use-search";

function Search() {
  const { handleSearch, handleSubmit, handleSelect } = useSearch();

  return (
    <form className="search mx-auto" role="search" onSubmit={handleSubmit}>
      <div className="product-search d-flex flex-row">
        <select 
          className="form-select form-select-sm h-50 w-50 me-2 bg-primary-subtle my-auto" 
          aria-label="Select filter"
          onChange={handleSelect}
          defaultValue="searchBy"
        >
          <option value="searchBy" disabled>search by</option>
          <option value="product">product</option>
          <option value="brand">brand</option>
          <option value="price">price</option>
        </select>
        <input
          className="form-control me-2"
          type="search"
          placeholder="search"
          aria-label="search"
          name="product"
          onChange={handleSearch}
        />
        <button className="btn btn-light" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
