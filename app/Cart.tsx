'use client'; 

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.book.id} className="flex justify-between my-2">
                <span>
                  {item.book.title} by {item.book.author.penName} x {item.quantity}
                </span>
                <span>${(item.book.price * item.quantity).toFixed(2)}</span>
                <button
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => dispatch(removeFromCart(item.book))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
