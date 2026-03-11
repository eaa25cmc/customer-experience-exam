import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import DetailImageBox from "../components/DetailImageBox";
import DetailInfoBox from "../components/DetailInfoBox";
import styles from "./DetailPage.module.css";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/products.json");
      const products = await response.json();
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <section>
        <Breadcrumbs />
      </section>
      <main className={styles["product-detail"]}>
        <DetailImageBox product={product} />
        <DetailInfoBox product={product} />
      </main>
    </>
  );
}
