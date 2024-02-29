function Item({ brand = null, price = 0, product, id }) {
  return (
    <div
      className="card mx-auto bg-body-tertiary shadow"
      style={{ minWidth: "220px", height: "100%" }}
    >
      <div className="position-relative card-body d-flex flex-column ">
        <div className="d-flex flex-column my-auto">
          <h5 className="card-title">{brand}</h5>
          <p className="card-text">{product}</p>
        </div>
        <div className="mt-2">
          <span className="badge text-bg-primary mb-2 w-100">{price} руб.</span>
          <p
            className="bottom-0 text-body-tertiary  text-nowrap mb-0"
            style={{ fontSize: "10px" }}
          >
            id: {id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
