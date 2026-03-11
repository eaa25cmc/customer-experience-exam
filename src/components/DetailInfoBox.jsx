
export default function DetailInfoBox({ product }) {
  if (!product) return null;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Pris: {product.price} kr.</p>
    </div>
  );
}

