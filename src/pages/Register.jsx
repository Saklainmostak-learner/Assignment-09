import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router";

const useClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/10";
const Register = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [warning, setWarning] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password.length < 6) {
      setWarning("Password must contain at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setWarning("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setWarning("Password must contain at least one lowercase letter.");
      return;
    }

    if (password !== confirmPassword) {
      setWarning("Password and confirm password do not match.");
      return;
    }

    // Better Auth registration will be connected here.
    setWarning(
      "Registration is currently unavailable. Authentication will be connected soon.",
    );
  }

  function handleGoogleRegister() {
    // Google authentication will be connected here.
    setWarning("Google registration is currently unavailable.");
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
      <aside className="overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-10">
        <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
          Join the game
        </p>

        <h1 className="mt-6 max-w-md text-4xl leading-tight font-black sm:text-5xl">
          One account. Every playing field.
        </h1>

        <p className="mt-5 max-w-md leading-7 text-white/75">
          Create your PlayGrid account to book facilities, organize your
          sessions, and manage your playing spaces.
        </p>

        <div className="mt-10 space-y-4">
          {[
            "Discover nearby sports facilities",
            "Manage all your bookings",
            "List and manage your own facilities",
          ].map((feature, index) => (
            <div
              key={feature}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-black">
                {index + 1}
              </span>

              <p className="font-semibold text-white/90">{feature}</p>
            </div>
          ))}
        </div>
      </aside>

      <div className="rounded-3xl border border-ink/10 bg-surface p-6 sm:p-10">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
          Create account
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Join PlayGrid
        </h2>

        <p className="mt-3 leading-7 text-muted">
          Enter your information to create a new account.
        </p>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-ink/15 bg-white px-4 py-3 font-semibold text-ink transition hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <FaGoogle aria-hidden="true" className="size-5" />
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />

          <span className="text-sm text-muted">or use email</span>

          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
        </div>

        <form
          onSubmit={handleRegister}
          onChange={() => setWarning("")}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="register-name"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Full name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              required
              className={useClass}
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Email address
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={useClass}
            />
          </div>

          <div>
            <label
              htmlFor="register-photo"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Photo URL
            </label>

            <input
              id="register-photo"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className={useClass}
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="register-password"
                name="password"
                type={visiblePassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                required
                className={`${useClass} pr-14`}
              />

              <button
                type="button"
                onClick={() => setVisiblePassword((previous) => !previous)}
                aria-label={
                  visiblePassword ? "Hide passwords" : "Show passwords"
                }
                aria-pressed={visiblePassword}
                className="absolute inset-y-1 right-1 grid w-11 place-items-center rounded-lg text-muted hover:bg-background hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
              >
                {visiblePassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted">
              Use at least 6 characters with uppercase and lowercase letters.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Confirm password
            </label>

            <input
              id="confirm-password"
              name="confirmPassword"
              type={visiblePassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter the password again"
              required
              className={useClass}
            />
          </div>

          <button
            type="submit"
            className="min-h-12 w-full rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Create account
          </button>
        </form>

        {warning && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
          >
            {warning}
          </p>
        )}

        <p className="mt-7 text-center text-sm leading-6 text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
