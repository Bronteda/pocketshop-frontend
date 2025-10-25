import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const linkToSignIn = () => {
    navigate("/login");
  };

  const linkToSignUp = () => {
    navigate("/register");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">{user ? "Dashboard" : "Home"}</Link>
        </li>
        <li>
          <Link to="/shops">Shops</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {user ? (
          <>
            <li>
              {user && user.has_shop ? (
                <Link to="/dashboard/shop">Manage Shop</Link>
              ) : (
                <Link to="/shops/new">Create Shop</Link>
              )}
            </li>
            <li>
              <Link to="/dashboard/orders">My Orders</Link>
            </li>
            <li>
              <Link to="/cart">Cart 🛒</Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={linkToSignUp}>Register</button>
            </li>
            <li>
              <button onClick={linkToSignIn}>Sign in</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
