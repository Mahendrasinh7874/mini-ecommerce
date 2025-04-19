import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeCart } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cart } = useSelector((state) => state.product);
  console.log(cart, "cart");

  const isAleradyExist = (id) => cart.some((prod) => prod.id === id);

  const addToCart = (id) => {
    const product = products.find((product) => product.id === id);
    const updatedProduct = {
      ...product,
      qty: 1,
    };
    dispatch(storeCart([updatedProduct]));
  };

  return (
    <div className="w-11/12  my-5 gap-2 mx-auto flex flex-wrap">
      {products?.length > 0 &&
        products.map((product) => (
          <div
            key={product.id}
            className="w-[300px] px-3 flex-col gap-y-2 py-3 min-h-[200px] flex items-start rounded-md border border-[#d3d3d3] gap-x-2"
          >
            <h3>{product?.title}</h3>
            <h3>{product?.price}</h3>
            <h3>{product?.description}</h3>
            <button
              onClick={() => {
                if (isAleradyExist(product.id)) {
                  navigate("/cart");
                } else {
                  addToCart(product.id);
                }
              }}
              className="bg-blue-600 rounded text-white text-base cursor-pointer px-4 py-1"
            >
              {isAleradyExist(product.id) ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Products;
