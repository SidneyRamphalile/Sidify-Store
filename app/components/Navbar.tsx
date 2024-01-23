// Importing necessary dependencies and modules
"use client";
import { Button } from "@/components/ui/button"; // Assuming this is a custom Button component
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

// Array of navigation links with name and href
const links = [
  { name: "Home", href: "/" }, // Home link
  { name: "Men", href: "/Men" }, // Men link
  { name: "Women", href: "/Women" }, // Women link
  { name: "Teens", href: "/Teens" }, // Teens link
];

// Navbar component definition
export default function Navbar() {
  // Getting the current pathname using Next.js navigation
  const pathname = usePathname();

  // Destructuring the handleCartClick function from useShoppingCart hook
  const { handleCartClick } = useShoppingCart();

  // Rendering the Navbar component
  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px6 lg:max-w-7xl">
        {/* Brand logo with a link to the home page */}
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Sidify<span className="text-primary">Store</span>
          </h1>
        </Link>

        {/* Navigation links */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                // If the current pathname matches the link, apply active styles
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                // If not, apply inactive styles with a hover effect
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Cart button with a shopping bag icon */}
        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()} // Handling click to open the cart
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            {/* Hidden text for screen readers and small devices */}
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
