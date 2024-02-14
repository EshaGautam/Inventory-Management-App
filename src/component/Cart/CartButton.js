import React, { useState } from 'react'
import Button from '../Button/Button'
import CartItems from './CartItems'
import InventoryContext from "../Store/InvertoryContext";
import { useContext } from "react";
import './CartButton.css'

function CartButton() {
  const [orderInCart, setOrderInCart] = useState(false);
    
 const MedsCtx = useContext(InventoryContext);
 
 const { addToCart } = MedsCtx;
let cartQty = addToCart.length

const handleCartModal=()=>{
  setOrderInCart(!orderInCart)
}


  return (
    <div className="modal">
      {!orderInCart && <CartItems onClick={handleCartModal} />}
      <Button type="button" onClick={handleCartModal} className="cart-btn">
        Open-Cart<span>{cartQty}</span>
      </Button>
    </div>
  );
}

export default CartButton