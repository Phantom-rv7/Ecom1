import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem as CartItem1 } from "../types/types";

type CartItemProps = {
  cartItem:CartItem1;
  incrementHandler: (cartItem:CartItem1) => void;
  decrementHandler: (cartItem:CartItem1) => void;
  removerHandler: (id:string) => void;
}

const CartItem = ({ 
  cartItem, 
  incrementHandler,
  decrementHandler, 
  removerHandler
 } : CartItemProps) => {

  const {photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removerHandler(productId)}>
        <FaTrash/>
      </button>
    </div>
  )
}

export default CartItem
