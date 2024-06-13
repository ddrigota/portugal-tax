import { TaxForm } from "@/components/TaxForm";

export default function Home() {
  return (
    <main className="container grid flex-grow grid-cols-1 py-10 lg:grid-cols-2">
      <TaxForm />
    </main>
  );
}
