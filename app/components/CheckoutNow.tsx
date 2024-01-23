// Importing necessary dependencies and modules
"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";

// CheckoutNow component definition
export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  // Destructuring the checkoutSingleItem function from useShoppingCart hook
  const { checkoutSingleItem } = useShoppingCart();

  // Function to handle the "Checkout Now" button click
  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  // Creating a product object with necessary details for checkout
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(), // Generating the URL for the product image using the 'urlFor' function
    price_id: price_id,
  };

  // Rendering the CheckoutNow component with a button to initiate checkout
  return (
    <Button
      variant="outline"
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Checkout Now
    </Button>
  );
}
