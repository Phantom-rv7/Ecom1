import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc"
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";


const Cart = () => {

  const {cartItems, subTotal, tax, total, shippingCharges, discount} = 
    useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

  const dispatch = useDispatch() 

  const [couponCode,setCouponCode] = useState<string>("");
  const [isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false);

      
  const incrementHandler = (cartItem:CartItem) =>{
    if(cartItem.quantity >= cartItem.stock) return
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1})); 
};
  const decrementHandler = (cartItem:CartItem) =>{
    if(cartItem.quantity <= 1) return
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1})); 
};
  const removerHandler = (productId:string) =>{
    dispatch(removeCartItem(productId)); 
};

  useEffect(() => {

      const {token: cancelToken, cancel} = axios.CancelToken.source()
      const timeOutId =  setTimeout(() =>{

        axios
          .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{
            cancelToken,
          })
          .then((res) => {
            dispatch(discountApplied(res.data.discount))
            setIsValidCouponCode(true);
            dispatch(calculatePrice())
          })
          .catch((e) => {
            dispatch(discountApplied(0))
            setIsValidCouponCode(false);
            dispatch(calculatePrice())
          })

        if(Math.random() > 0.5) setIsValidCouponCode(true);
        else setIsValidCouponCode(false);
      },1000);
      

      return () => {
        clearTimeout(timeOutId);
        cancel();
        setIsValidCouponCode(false)
      }
    }, [couponCode]
  )
  
  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])
  
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? ( 
          cartItems.map((i,idx) =>
            <CartItemCard 
              incrementHandler={incrementHandler} 
              decrementHandler={decrementHandler} 
              removerHandler={removerHandler} 
              key = {idx} 
              cartItem={i}/>)
      ) : ( 
        <h1>No Items Added</h1>
      )}
      </main>

      <aside>
        <p>Subtotal:₹{subTotal}</p>
        <p>Shipping Charges:₹{shippingCharges}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount<em className="red"> - ₹{discount} </em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input 
         type="text" 
         placeholder="Coupon Code"
         value={couponCode}
         onChange={(e) => setCouponCode(e.target.value)}/>

        { couponCode && (
          isValidCouponCode ? 
          ( <span className="green">
             ₹{discount} off using the <code>{couponCode}</code>
            </span>  
            ) : ( 
            <span className="red">
              Invalid Coupon <VscError />
              </span>
          )
        )}

      {
        cartItems.length > 0 && <Link to={"/shipping"}>Pay Now</Link>
      }  

      </aside>
    </div>
  )
}

export default Cart
