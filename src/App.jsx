import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SalePage from "./pages/SalePage";
import PaymentPage from "./pages/PaymentPage";
import NewsPage from "./pages/NewsPage";
import InspirationPage from "./pages/InspirationPage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailPage from "./pages/DetailPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ProductGridBaby from "./components/ProductGridBaby";
import ProductGridGirls from "./components/ProductGridGirls";
import ProductGridBoys from "./components/ProductGridBoys";
import CategoryPage from "./components/CategoryPage";
import ShoppingbagPage from "./pages/ShoppingbagPage";
import BrandPage from "./pages/BrandPage";

export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Navbar />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/baby" element={<ProductGridBaby />} />
        <Route path="/pige" element={<ProductGridGirls />} />
        <Route path="/dreng" element={<ProductGridBoys />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/produkt/:id" element={<DetailPage />} />
        <Route path="/kategori/:category" element={<CategoryPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route
          path="/kategori/:gender/:mainCategory/:subcategory?"
          element={<CategoryPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/shoppingbag" element={<ShoppingbagPage />} />
        <Route path="/brand/:brandSlug" element={<BrandPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/shoppingbag" element={<ShoppingbagPage />} />
          <Route path="/baby" element={<ProductGridBaby />} />
        </Routes>
      )}
      <Footer />
    </>
  );
}
