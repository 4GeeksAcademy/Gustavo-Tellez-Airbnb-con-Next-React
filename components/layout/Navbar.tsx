import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="hidden max-w-md flex-1 sm:block">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="shrink-0">
          <UserMenu />
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 pb-3 sm:hidden">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  );
}

export default Navbar;
