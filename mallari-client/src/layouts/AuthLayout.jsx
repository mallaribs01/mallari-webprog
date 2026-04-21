import { Outlet } from "react-router-dom";
import LOGO from "../assets/images/bherli_logo.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-100 p-16 border-r-2 border-zinc-300">
          
          <h1 className="text-4xl font-bold text-zinc-900 mb-6 text-center">
            Welcome to Bherli Studios! ✨
          </h1>

          <p className="text-zinc-600 text-center max-w-sm mb-10">
            Streamline your creative process with a powerful, clean, and modern workflow experience.
          </p>

          <img
            src={LOGO} // or import it
            alt="Illustration"
            className="w-[350px] object-contain"
          />

        </div>

        {/* RIGHT SIDE */}
        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;