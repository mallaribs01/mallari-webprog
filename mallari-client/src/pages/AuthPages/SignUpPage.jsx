import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-xs tracking-widest font-semibold";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 rounded-3xl">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900">
            Create Account 🫡
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Join Bherli Studios and get started
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="ex. Juan"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="ex. Dela Cruz"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="ex. juandelacruz@email.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              type="password"
              placeholder="ex. S@f3W0rd!"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-1 text-xs text-zinc-400">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          {/* Button */}
          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
          >
            CREATE ACCOUNT
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400">OR</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Social */}
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
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-zinc-900 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;