import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-xs tracking-widest font-semibold";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all fields.");

      return;
    }

    try {
      setLoading(true);

      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,

        // defaults
        username: form.email,
        age: "18",
        gender: "other",
        contactNumber: "00000000000",
        address: "N/A",
        type: "editor",
        isActive: true,
      });

      alert("Account created successfully!");

      navigate("/auth/signin");
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="ex. Juan"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="ex. Dela Cruz"
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
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ex. juandelacruz@email.com"
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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="ex. S@f3W0rd!"
              className={inputClasses}
            />

            <p className="mt-1 text-xs text-zinc-400">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}
          >
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
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