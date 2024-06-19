"use client";

import { useFormStatus } from "react-dom";

// this Button needs to be client component because we using hook inside it
export default function SubmitButton({ children, pendingLabel }) {
  // how to know a form is submiting? and how to know a server action is doing asynchronous task? using useFormStatus hook
  // this hook must be used inside the component that render inside the form not inside the component that contains the form
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
