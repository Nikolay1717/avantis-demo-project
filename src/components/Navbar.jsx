import Search from "../features/Filter/Search";

function Navbar() {
  return (
    <nav className="navbar bg-primary mb-3">
      <div className="container-fluid">
        <Search />
      </div>
    </nav>
  );
}

export default Navbar;
