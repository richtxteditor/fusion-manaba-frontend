
import { useCart } from '../context/CartProvider';

interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(productId, 1);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
