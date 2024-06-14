import Disclaimer from "@/components/Disclaimer";
import { TaxForm } from "@/components/TaxForm";

export default function Home() {
  return (
    <main className="container grid flex-grow grid-cols-1 grid-rows-3 gap-4 py-10 lg:grid-cols-2">
      <TaxForm />
      <Disclaimer />
    </main>
  );
}
