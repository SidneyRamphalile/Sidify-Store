// Importing necessary dependencies and modules
"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

// Defining the ProductCart interface to represent the product details
export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any; // Assuming this is the data structure for an image
  price_id: string;
}

// AddToBag component definition
export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  // Destructuring the addItem and handleCartClick functions from useShoppingCart hook
  const { addItem, handleCartClick } = useShoppingCart();

  // Creating a product object with necessary details for adding to cart
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(), // Generating the URL for the product image using the 'urlFor' function
    price_id: price_id,
  };

  // Rendering the AddToBag component with a button to add the product to the cart
  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
}
