import React, { useState } from "react";
import InventoryContext from "./InvertoryContext";

function InventoryProvider(props) {
  const [medsQty, setMedsQty] = useState(0);
  const [form, setForm] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [addedQty, setAddedQty] = useState(0);


// form quantity global state 

  const handleMedsQty = (qty) => {
    setMedsQty(qty);
  };


  //handling form submit and form state

  const handleFormSubmit = (medsData) => {
    const meds = { ...medsData, id: Math.random() };
    setForm((prev) => [...prev, meds]);
  };


// updating inventory quantity on the basis of quantity in cart

  const updatedQty = (id) => {
    setForm((prevForm) => {
      return prevForm.map((meds) => {
        if (meds.id === id) {
          if(meds.qty-addedQty<=0){
            return{...meds,qty: 'OUT-OF-STOCK'}
          }
          return { ...meds, qty: meds.qty - addedQty };
        }
        return meds;
    
      });

  })
  
}

// Add-to-cart Button clicked

  const handleAddToCart = (id) => {
    let existingMeds = addToCart.find((meds) => id === meds.id);

    if (existingMeds) {
      setAddToCart((prevCartItems) => {
        return prevCartItems.map((meds)=>{
          if (meds.id === id) {
            return { ...meds, qty: +addedQty+(meds.qty) };
          }
          return meds;
        })
      })
    } 
    else {
      let cart = form.find((meds) => id === meds.id);
      setAddToCart((prev) => [...prev, { ...cart, qty: addedQty }]);
    }
   
  };

//quantity in the cart state 
 const handleAddedQty = (qty) => {
   setAddedQty(+qty);
 };


// handling quantiy when the item is deleted from the cart
const handleCartItemsDel = (id, qty) => {

  let updateCart = addToCart.filter((meds) => id !== meds.id);
  setAddToCart(updateCart);

  setForm((prev) => {
    return prev.map((meds) => {
      if (id === meds.id || meds.qty === "OUT-OF-STOCK") {
        let updatedQty = (+meds.qty + qty || 0+qty)
        return { ...meds, qty: updatedQty };
      }
      return meds;
    });
  });
};

//Increasing Qty in the cart

const handleIncreaseQty=(id,qty)=>{


   setForm((prevMeds) => {
     return prevMeds.map((meds) => {
       if (meds.id === id || meds.qty===0) {
        
         return { ...meds, qty: +meds.qty - 1 || "OUT-OF-STOCK" };
       }
       return meds;
     });
   });
   
    setAddToCart((prevMeds)=>{
      return prevMeds.map((meds)=>{
        if(meds.id===id && meds.qty<=qty){
          return {...meds,qty:+meds.qty+1}
        }
        return meds
      }
        
    )
  }
    )


}

// Decreasing Qty in the cart 
const handleDecreaseQty=(id,qty)=>{

   setForm((prevMeds) => {
     return prevMeds.map((meds) => {
       if (meds.id === id || +meds.qty===+qty) {
        
         return { ...meds, qty: +meds.qty + 1 || 1 };
       }
       return meds;
     });
   });
   
    setAddToCart((prevMeds)=>{
      return prevMeds.map((meds)=>{
        if(meds.id===id && meds.qty > 0){
          return {...meds,qty:+meds.qty-1}
        }
        return meds
      }
        
    )
  }
    )
   
  
if(qty===1){
    let updateCart = addToCart.filter((meds) => id !== meds.id);
    setAddToCart(updateCart);
}

}


  const inventory = {
    handleMedsQty,
    medsQty,
    handleFormSubmit,
    form,
    handleAddToCart,
    addToCart,
    handleAddedQty,
    addedQty,
    updatedQty,
    setAddedQty,
    handleCartItemsDel,
    handleIncreaseQty,
    handleDecreaseQty

  };

  return (
    <InventoryContext.Provider value={inventory}>
      {props.children}
    </InventoryContext.Provider>
  );
}

export default InventoryProvider;
