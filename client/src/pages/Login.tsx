import { logintype,loginSchema } from "../schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";



function Login() {
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [input, setinput] = useState<logintype>({
    email: "",
    password: "",
  });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace with your actual backend endpoint
//     //   const response = await axios.post("http://your-backend-url/login", { email, password });

//       if (response.data.isAdmin) {
//         // Redirect to admin dashboard if isAdmin is true
//         navigate("/admin");
//       } else {
//         // Redirect to user section otherwise
//         navigate("/users");
//       }
//     } catch (error) {
//       setError("Invalid login credentials");
//       console.error(error);
//     }
//   };


  // onchange input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({
      ...input,
      [name]: value,
    });
  };

  // on submit
  const loginform = (e: FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(input);

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
        onSubmit={loginform} // Changed from `onClick` to `onSubmit`
      >
        <h1 className="font-bold text-2xl text-center">Login</h1>
        <div>
          <div className="relative mb-6">
            <label className="pl-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="pl-8 focus-visible:ring-1 w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            <Mail className="absolute inset-y-7 left-1 text-gray-400 pointer-events-none" />
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </div>
          <div className="relative">
            <label className="pl-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="pl-8 focus-visible:ring-1 w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              value={input.password}
              name="password"
            />
            <LockKeyhole className="absolute inset-y-7 left-1 text-gray-400 pointer-events-none" />
            {errors.password && (
              <p className="text-red-500">{errors.password[0]}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <button
              className="bg-red-500 w-full rounded-xl p-2 text-white"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
              Loading
            </button>
          ) : (
            <button
              className="bg-red-500 w-full rounded-xl p-2 text-white"
              type="submit"
            >
              Login
            </button>
          )}
        
        </div>
        <hr className="my-6" />
        <p>Don't have an account?</p>
        <div className="mt-6">
          <Link to={"/signup"}>
            <button className="w-full rounded-xl p-2 bg-gray-300">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
