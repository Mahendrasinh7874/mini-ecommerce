import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storeCart, updateCart } from "../store/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state) => state.product);
  const cartData = JSON.parse(localStorage.getItem("cart"));
  const isAleradyExist = (id) => cart.some((prod) => prod.id === id);

  useEffect(() => {
    if (cartData) {
      dispatch(storeCart(cartData));
    }
  }, []);

  const increase = (id) => {
    const updatedProduct = cart.map((c) =>
      c.id === id
        ? {
            ...c,
            qty: c.qty + 1,
          }
        : c
    );

    console.log({ updatedProduct });
    dispatch(updateCart(updatedProduct));
  };
  const decrease = (id) => {
    const updatedProduct = cart.map((c) =>
      c.id === id
        ? {
            ...c,
            qty: c.qty - 1,
          }
        : c
    );
    dispatch(updateCart(updatedProduct));
  };

  const addToCart = (id) => {
    const product = products.find((product) => product.id === id);

    dispatch(storeCart([product]));
  };

  const total = cart.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);

  return (
    <>
      {" "}
      <h2 className="w-11/12 mx-auto py-4">Total Price : {total}</h2>
      <div className="w-11/12   mb-5 gap-2 mx-auto flex flex-wrap">
        {products?.length > 0 ? (
          products
            .filter((product) => cart.some((cart) => cart.id === product.id))
            .map((product) => (
              <div
                key={product.id}
                className="w-[300px] px-3 flex-col gap-y-2 py-3 min-h-[200px] flex items-start rounded-md border border-[#d3d3d3] gap-x-2"
              >
                <h3>{product?.title}</h3>
                <h3>{product?.price}</h3>
                <h3>{product?.description}</h3>
                {isAleradyExist ? (
                  <button className="bg-blue-600 flex items-center gap-x-5 rounded text-white text-base px-4 ">
                    <span
                      className={`border-r pr-3 py-2 border-[#d4d3d3] ${
                        cart.find((cart) => cart.id === product.id)?.qty === 1
                          ? "cursor-default pointer-events-none"
                          : "cursor-pointer "
                      }`}
                      onClick={() => decrease(product.id)}
                    >
                      -
                    </span>
                    <span>
                      {cart.find((cart) => cart.id === product.id)?.qty}
                    </span>
                    <span
                      className="border-l pl-3 py-2 cursor-pointer  border-[#d4d3d3]"
                      onClick={() => increase(product.id)}
                    >
                      +
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-blue-600 rounded text-white text-base cursor-pointer px-4 py-1"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            ))
        ) : (
          <div className="flex min-h-[400px] w-[400px] mx-auto flex-col items-center gap-y-4">
            <p>Cart is Empty</p>
            <Link to={"/"}>
              <button className="bg-blue-600 rounded text-white text-base cursor-pointer px-4 py-1">
                Go to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
