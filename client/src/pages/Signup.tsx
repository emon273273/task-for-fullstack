import { SignupType, userSchema } from "../schema/userSchema";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [input, setInput] = useState<SignupType>({
    email: "",
    password: "",
    confirmpassword: "",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Handle form submission
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const result = userSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError);
      return;
    } else {
      setErrors({});
    }
    console.log(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen border bg-red-50">
      <form
        className="md:p-8 md:w-full max-w-md rounded-lg md:border border-gray-700"
        onSubmit={submitForm}
      >
        <h1 className="font-bold text-2xl text-center">Global-DineHub</h1>
        <div className="mt-6">
          {/* Email */}
          <div className="relative mb-6">
            <label className="pl-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="pl-8 w-full border rounded px-3 py-2 focus-visible:ring-1"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="pl-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="pl-8 w-full border rounded px-3 py-2 focus-visible:ring-1"
              onChange={handleChange}
              value={input.password}
              name="password"
            />
            {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative mt-6">
            <label className="pl-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="pl-8 w-full border rounded px-3 py-2 focus-visible:ring-1"
              onChange={handleChange}
              value={input.confirmpassword}
              name="confirmpassword"
            />
            {errors.confirmpassword && (
              <p className="text-red-500">{errors.confirmpassword[0]}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <button className="bg-red-500 w-full rounded-xl text-white py-2" disabled>
              Loading...
            </button>
          ) : (
            <button className="bg-red-500 w-full rounded-xl text-white py-2" type="submit">
              Sign Up
            </button>
          )}
        </div>
        <hr className="my-6" />
        <p>Already have an account?</p>
        <div className="mt-6">
          <Link to="/">
            <button className="w-full rounded-xl border py-2">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
