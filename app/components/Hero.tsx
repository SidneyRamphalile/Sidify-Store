// Import necessary modules and components from Next.js and other libraries
import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

// Asynchronous function to fetch data from Sanity using a GROQ query
async function getData() {
  // Define a GROQ query to retrieve the first hero image data
  const query = "*[_type == 'heroImage'][0]";

  // Use the Sanity client to fetch data based on the defined query
  const data = await client.fetch(query);

  // Return the fetched data
  return data;
}

// Main component function to display hero section on the frontend
export default async function Hero() {
  // Fetch data using the getData function and store it in the 'data' variable
  const data = await getData();

  // Return JSX for rendering the hero section
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      {/* Container for the hero section content */}
      <div className="mb-8 flex flex-wrap justify-content-between md:mb-16">
        {/* Left column containing text content */}
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a Top Price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high-quality products for you.
            We are the best, so come and shop with us.
          </p>
        </div>
        {/* Right column containing two images */}
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          {/* First image with a specific styling */}
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()} // Use the urlFor function to get the image URL
              alt="Man with a blue sweater and jeans"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>
          {/* Second image with a specific styling */}
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()} // Use the urlFor function to get the image URL
              alt="Lady with white sneakers"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
      {/* Container for category links */}
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Container for category links with borders and styling */}
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          {/* Links to different category pages */}
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center text-gray transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center text-gray transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            href="/Teens"
            className="flex w-1/3 items-center justify-center text-gray transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
}
