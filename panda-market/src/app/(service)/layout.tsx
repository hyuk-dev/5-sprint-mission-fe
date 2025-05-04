import ServiceHeader from "@/core/components/ServiceHeader";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ServiceHeader />
      {children}
    </section>
  );
}
