import Hero from '@/components/Hero'

import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";


import ServicesPage from './services/page';
import Services from '@/components/Services';
import PaymentPage from './payment/page';


export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <ServicesPage />
      <PaymentPage />
      <Contact />
    </>
  )
}
