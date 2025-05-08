import Footer from "@/core/components/Footer";
import Header from "@/core/components/Header";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="flex xl:w-[1200px] md:w-[100%] justify-center xl:m-auto md:px-4 px-2 min-h-[100vh] py-14">
        {children}
      </div>
      <Footer />
    </section>
  );
}
