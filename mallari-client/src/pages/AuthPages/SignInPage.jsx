import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-xs tracking-widest font-semibold";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 rounded-3xl">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome Back 🤩</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Login to continue to Bherli Studios
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-zinc-700"
            >
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="ex. juandelacruz@email.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              placeholder="ex. S@f3W0rd!"
              autoComplete="current-password"
              className={inputClasses}
            />
            <p className="mt-1 text-xs text-zinc-400">
              It must be a combination of minimum 8 letters, numbers, and
              symbols.
            </p>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
              />
              Remember me
            </label>
            <button
              type="button"
              className="font-medium text-zinc-500 hover:text-zinc-900 transition"
            >
              Forgot?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
            to="/dashboard"
          >
            LOG IN
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400">OR</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}
            >
              Apple
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-zinc-900 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;