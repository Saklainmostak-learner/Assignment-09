import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookmarkCheck, Building2, LogOut, PlusCircle } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { API_URL } from "../lib/api";

const UserMenu = ({ onNavigate }) => {
  const navigate = useNavigate();

  const [logoutError, setLogoutError] =
    useState("");

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setLogoutError("");

      await fetch(`${API_URL}/api/session/logout`, {
        method: "POST",
        credentials: "include",
      });

      const { error } = await authClient.signOut();

      if (error) {
        setLogoutError(
          error.message || "Logout failed"
        );
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);

      setLogoutError(
        "Could not connect to the authentication server"
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-20 animate-pulse rounded-xl bg-ink/10" />
    );
  }

  if (!user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-ink px-5 py-2 text-sm font-bold text-white transition hover:bg-primary"
      >
        Login
      </Link>
    );
  }

  const firstLetter =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-ink/10 bg-white px-2 py-1.5 transition hover:bg-background [&::-webkit-details-marker]:hidden">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="size-8 rounded-lg object-cover"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
            {firstLetter}
          </span>
        )}

        <span className="hidden max-w-28 truncate text-sm font-bold text-ink sm:block">
          {user.name}
        </span>
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-ink/10 bg-white p-3 shadow-xl">
        <div className="border-b border-ink/10 px-2 pb-3">
          <p className="truncate font-bold text-ink">
            {user.name}
          </p>

          <p className="mt-1 truncate text-xs text-muted">
            {user.email}
          </p>
        </div>

        <Link
          to="/my-bookings"
          onClick={onNavigate}
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition hover:bg-background"
        >
          <BookmarkCheck size={17} />
          My Bookings
        </Link>

        <Link
          to="/add-facility"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition hover:bg-background"
        >
          <PlusCircle size={17} />
          Add Facility
        </Link>

        <Link
          to="/manage-facilities"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition hover:bg-background"
        >
          <Building2 size={17} />
          Manage My Facilities
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={17} />

          {isLoggingOut
            ? "Logging out..."
            : "Logout"}
        </button>

        {logoutError && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {logoutError}
          </p>
        )}
      </div>
    </details>
  );
};

export default UserMenu;
