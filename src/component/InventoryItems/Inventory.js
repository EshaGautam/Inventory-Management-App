import React, { useState } from 'react'
import './Inventory.css'
import InventoryContext from '../Store/InvertoryContext';
import { useContext} from 'react';
import Button from '../Button/Button';
import Input from '../Form/Input';


function Inventory() {
  
  // eslint-disable-next-line no-unused-vars
  const [canEnableButton, setCanEnableButton] = useState(true);

  const MedsCtx = useContext(InventoryContext);
  const { form, handleAddToCart, handleAddedQty,updatedQty,addedQty} = MedsCtx;


  const AddedQty = (event) => {
    let QtyToAdd = event.target.value
  handleAddedQty(QtyToAdd)
    
  };

  const handleCart = (id) => {
    handleAddToCart(id);
    updatedQty(id);

  };

  
  const medsList =
    form &&
    form.map((meds) => (
      <ul className="items" key={meds.id}>
        <li>
          <span>Name--{meds.name}</span>
          <span>Description--{meds.des}</span>
          <span>Price--{meds.price}</span>
          <span>Qty--{meds.qty}</span>
          <span>
            {meds.qty > 0 && (
           <Input
                className="item-input"
                type="number"
                id="Qty"
                name="Quantity-To-Add--"
                onChange={(event) => AddedQty(event, meds.qty)}
                placeholder="0"
                min={0}
                max={meds.qty}
                value={addedQty}
           
              />
            )}
          </span>
          <span>
            <Button
              type="button"
              onClick={() => handleCart(meds.id)}
              disabled={meds.qty === "OUT-OF-STOCK" || !canEnableButton}
            >
              Add-To-Cart
            </Button>
          </span>
        </li>
      </ul>
    ));

  return <div>{medsList}</div>;
}
export default Inventory