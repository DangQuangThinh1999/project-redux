import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivateRoute from "./components/Route/PrivateRoute";
import ProductPage from "./pages/dashboard/ProductPage";
import PageNotFound from "./pages/PageNotFound";
import WelcomePage from "./pages/dashboard/WelcomePage";
import CartPage from "./pages/dashboard/CartPage";
import CheckoutPage from "./pages/dashboard/CheckoutPage";

function App() {
  return (
    <div className=" w-[1500px] min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected route accessible only to authenticated users */}

          <Route
            path="/dashboard"
            element={<PrivateRoute component={DashboardPage} />}
          >
            <Route index element={<WelcomePage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
