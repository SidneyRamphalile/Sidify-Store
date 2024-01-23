// Import necessary modules and components from Next.js and other libraries
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

// Asynchronous function to fetch product data based on category
async function getData(category: string) {
  // Define a GROQ query to retrieve product data for a specific category
  const query = `*[_type == "product" && category->name == "${category}"]{
        _id,
        "imageUrl": images[0].asset->url,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name  
    }`;

  // Use the Sanity client to fetch data based on the defined query
  const data = await client.fetch(query);

  // Return the fetched data
  return data;
}

// Main component function for the category page
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // Fetch product data for the specified category using the getData function
  const data: simplifiedProduct[] = await getData(params.category);

  // Return JSX for rendering the category page
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Header section with the category name */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
        </div>
        

        {/* Grid layout to display products */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Map through the fetched data and render each product */}
          {data.map((product) => (
            <div key={product._id} className="group relative">
              {/* Container for the product image */}
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                {/* Display the product image using the Next.js Image component */}
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              {/* Container for product details and price */}
              <div className="mt-4 flex justify-between">
                {/* Container for product name and link to product page */}
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* Link to the individual product page */}
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  {/* Display the product category */}
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                {/* Display the product price */}
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
