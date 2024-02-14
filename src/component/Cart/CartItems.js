import React from "react";
import InventoryContext from "../Store/InvertoryContext";
import { useContext } from "react";
import './CartItems.css'
import Button from "../Button/Button";


function CartItems(props) {
  
 const MedsCtx = useContext(InventoryContext);
 const { addToCart,handleCartItemsDel} = MedsCtx;

const totalAmount = addToCart.reduce((total,meds)=>total+meds.price*meds.qty,0)

const handleDelete=(id,qty)=>{
 handleCartItemsDel(id,qty)
}


 let CartItem =
   addToCart &&
   addToCart.map((meds) => (
     <ul className="cart-modal-items" key={meds.id}>
       <li>
         <span>Name:{meds.name}</span>
         <span>Price:{meds.price}</span>
         <span>Qty:{meds.qty}</span>
         <span><Button type='button' onClick={()=>handleDelete(meds.id,meds.qty)}>X</Button></span>
       </li>
     </ul>
   ));

 return (
   <div className="cart">
     <div className="cart-modal">
       {CartItem}
       <div className="amt">
        {addToCart.length>0?(<> <span>Total Amount:{totalAmount}</span>
         <Button type='button' onClick={props.onClick}>Close</Button></>):(<p>Cart-Is-Empty</p>)
         }
       </div>
     </div>
   </div>
 );

}

export default CartItems;
