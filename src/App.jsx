import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SalePage from "./pages/SalePage";
import ProductsPage from "./pages/ProductsPage";
import PaymentPage from "./pages/PaymentPage";
import NewsPage from "./pages/NewsPage";
import InspirationPage from "./pages/InspirationPage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailPage from "./pages/DetailPage";
import SustainabilityPage from "./pages/SustainabilityPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
      </Routes>
      <Footer />
    </>
  );
}
