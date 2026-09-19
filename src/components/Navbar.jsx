import { useState } from "react";
import { NavLink } from "react-router";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "All Facilities", path: "/facilities" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkStyle = ({ isActive }) => {
    return [
      "rounded-lg px-3 py-2.5 text-sm font-semibold",
      "transition duration-200",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted hover:bg-primary/10 hover:text-primary",
    ].join(" ");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-[calc(100%-2rem)] max-w-300 items-center justify-between gap-8 md:min-h-18 md:w-[calc(100%-2.5rem)]">
        <NavLink to="/" className="flex items-center gap-2.5 text-ink no-underline" onClick={closeMenu}>
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-extrabold text-white md:size-11">PG</span>
          <span className="text-xl font-extrabold tracking-[-0.7px]">PlayGrid</span>
        </NavLink>
        <button
          type="button"
          className="grid size-10 place-content-center rounded-lg border border-black/15 bg-surface md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-level="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="my-0.5 block h-0.5 w-5 rounded-full bg-ink"></span>
          <span className="my-0.5 block h-0.5 w-5 rounded-full bg-ink"></span>
          <span className="my-0.5 block h-0.5 w-5 rounded-full bg-ink"></span>
        </button>
        <nav className={["absolute top-[calc(100%+1px)] right-4 left-4", "flex-col gap-2 rounded-xl border border-black/10","bg-surface p-3 shadow-xl","md:static md:flex md:flex-row md:items-center","md:border-0 md:bg-transparent md:p-0 md:shadow-none", isMenuOpen ? "flex" : "hidden",
        ].join(" ")
        }>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={getNavLinkStyle}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/login" className="rounded-lg bg-ink px-5 py-2.5 text-center text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary md:ml-2" onClick={closeMenu}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
