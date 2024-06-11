import { TaxForm } from "@/components/TaxForm";

export default function Home() {
  return (
    <main className="container grid flex-grow grid-cols-2 grid-rows-1 py-10">
      <TaxForm />
    </main>
  );
}
