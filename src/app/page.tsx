import { Banner } from "@/components/banner";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1">
        <Banner />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      
    </div>
  );
}
