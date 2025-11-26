import Banner from "@/components/banner/Banner";
import FeaturedSection from "@/components/feature/Feature";
import LocationSection from "@/components/location/Location";
import ProductGrid from "@/components/productGrid/ProductGrid";
import TestimonialSection from "@/components/testimonial/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans ">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <ProductGrid></ProductGrid>
      <TestimonialSection></TestimonialSection>
      <LocationSection></LocationSection>
    </div>
  );
}
