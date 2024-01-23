// Importing the necessary dependencies and modules
"use client";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

// Defining the type for the properties expected by the ImageGallery component
interface iAppProps {
  images: any; // Assuming 'images' is an array of any type
}

// Defining the ImageGallery component
export default function ImageGallery({ images }: iAppProps) {
  // State to manage the currently displayed big image
  const [bigImage, setBigImage] = useState(images[0]);

  // Function to handle clicks on small images and update the big image
  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  // Rendering the ImageGallery component
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Rendering the list of small images */}
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()} // Generating the URL for the image using the 'urlFor' function
              width={200}
              height={200}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)} // Attaching click event to switch the big image
            />
          </div>
        ))}
      </div>

      {/* Rendering the big image with additional styling */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()} // Generating the URL for the big image using the 'urlFor' function
          alt="Photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        {/* Adding a red sale label on the top left of the big image */}
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          sale
        </span>
      </div>
    </div>
  );
}
