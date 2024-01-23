// Importing necessary dependencies and modules
"use client";
import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

// CartProvider component definition
export default function CartProvider({ children }: { children: ReactNode }) {
  // Rendering the CartProvider component, wrapping it around the USCProvider from use-shopping-cart
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={
        // Replace the following string with your actual Stripe public key
        "pk_test_51OW0p2Gsk1YbcNiBNL4ElpsuyJ7q362sD5tfcPKt5bY4MeZ2AEf553lIsiYXo1tZvKMXLuDUWukHpWT6c1hQFTRX00aCCfZ4sz" as string
      }
      successUrl="http://localhost:3000/stripe/success" // URL to redirect to on successful payment
      cancelUrl="http://localhost:3000/stripe/error" // URL to redirect to on canceled payment
      currency="USD" // Currency used for transactions
      billingAddressCollection={true} // Allowing the collection of billing address during checkout
      shouldPersist={true} // Persisting cart data across page reloads
      language="en-US" // Language setting for the provider
    >
      {children}
    </USCProvider>
  );
}
