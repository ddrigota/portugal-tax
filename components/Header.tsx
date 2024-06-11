import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="container flex h-20 w-full items-center justify-between">
      <h1 className="text-2xl font-bold">Portugal IRS Calculator</h1>
      <div className="flex gap-4">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
