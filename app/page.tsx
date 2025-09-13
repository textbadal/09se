import Hero from '@/components/Hero'

import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

import ServicesPage from './services/page';


export default function Page() {
  return (
    <>
      <Hero />
      <ServicesPage />
      <Gallery />
      <Testimonials />
     
      
      <Contact />
    </>
  )
}
