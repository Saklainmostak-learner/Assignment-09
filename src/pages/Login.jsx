import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";
const useClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();

  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();

    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setAuthError("Please enter your email and password.");
      return;
    }

    if (password.length < 8) {
      setAuthError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      setAuthError("");

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        setAuthError(error.message || "Email or password is incorrect.");
        return;
      }

      console.log("Logged-in user:", data);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      setAuthError("Could not connect to the authentication server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleGoogle() {
    //google will connect
    setAuthError("Google sign-in is unavailable.");
  }
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-10 lg:grid-cols-2 lg:py-16">
      <aside className="overflow-hidden rounded-3xl bg-primary p-7 text-white sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          Player Access
        </p>
        <p className="mt-6 mx-w-sm text-4xl leading-tight font-black sm:text-5xl">
          Your next game starts here.
        </p>
        <p className="mt-5 mx-w-sm leading-7 text-white/85">
          Find a place to play, plan your next session, and keep your bookings
          together.
        </p>
        <div
          aria-hidden="true"
          className="relative mt-10 hidden aspect-4/3 rounded-2xl border border-white/30 p-5 lg:block "
        >
          <div className="relative h-full rounded-xl border-2 border-white/50">
            <div className="absolute inset-y-0 left-1/2 border-1-2 border-white/50"></div>
            <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2rounded-full border-2 border-white/50"></div>
          </div>
        </div>
      </aside>
      <div className="rounded-3xl border border-ink/10 bg-surface p-6 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          WelCome
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Login to PlayGrid
        </h1>
        <p className="mt-3 leading-7 text-muted">
          Access your booking and manage facilities.
        </p>
        <button
          type="button"
          onClick={handleGoogle}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-ink/15 bg-white px-4 py-3 font-semibold text-semibold text-ink transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <FaGoogle aria-hidden="true" className="size-5" />
          Continue with Google
        </button>
        <div className="my-6 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10"></span>
          <span className="text-sm text-muted">Or use Email</span>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10"></span>
        </div>
        <form
          onSubmit={handleLogin}
          onChange={() => setAuthError("")}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="login-email"
              autoComplete="email"
              placeholder="your@example.com"
              required
              className={useClass}
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={visiblePassword ? "text" : "password"}
                id="login-password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter password"
                required
                className={`${useClass} pr-14`}
              />
              <button
                type="button"
                onClick={() => setVisiblePassword((before) => !before)}
                aria-label={visiblePassword ? "Hide password" : "Show password"}
                aria-controls="login-password"
                aria-pressed={visiblePassword}
                className="absolute inset-y-1 right-1 grid w-11 place-items-center rounded-lg text-muted hover:bg-background hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
              >
                {visiblePassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 w-full bg-primary px-5 py-3 font-bold rounded-xl text-white transition hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
           {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
        {authError && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
          >
            {authError}
          </p>
        )}
        <p className="mt-7 text-center text-sm leading-6 text-muted">
          New to PlayGrid{" "}
          <Link
            to="/register"
            className="font-bold text-brand underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
