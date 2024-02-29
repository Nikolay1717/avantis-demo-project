import Item from "../../components/Item";
import Spinner from "../../components/Spinner";
import { useItems } from "./use-items";

function ItemList() {
  const { status, error, items } = useItems();
  return (
    <div style={{minHeight: "90vh"}}>
      {error && <h2 className="text-center">{error}</h2>}
      {status === "loading" && <Spinner />}

      {status === "received" && (
        <div className="d-flex flex-column mb-3">
          <div className="d-flex flex-row mx-4 mb-3">
            <div className="container text-center">
              <div className="row g-3 row-cols-xl-5">
                {items.length ? (
                  items.map((item) => (
                    <div className="col" key={item.id}>
                      <Item {...item} />
                    </div>
                  ))
                ) : (
                  <h2 className="mx-auto">Not found</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;
