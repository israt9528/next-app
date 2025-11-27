"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/client";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider } from "firebase/auth";
import Link from "next/link";

export default function loginPage() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const router = useRouter();

  const handleGoogleLogin = async () => {
    // const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithGoogle();
      if (res?.user) {
        // const token = await res.user.getIdToken();
        // document.cookie = `authToken=${token}; path=/;`;
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        // const token = await res.user.getIdToken();
        // document.cookie = `authToken=${token}; path=/;`;
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-3xl font-bold ml-5 mt-5">Login to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              {/* Errors */}
              {(error || gError) && (
                <p className="text-red-500 text-sm text-center">
                  {error?.message || gError?.message}
                </p>
              )}
              <button className="btn btn-neutral mt-4">
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                onClick={handleGoogleLogin}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                {gLoading ? "Connecting to Google..." : "Login with Google"}
              </button>
            </fieldset>
          </div>
        </form>
        <p className="pl-6 pb-5">
          New to our website? Please{" "}
          <Link href="/register" className="link link-hover text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
