import { signInAction } from "@/app/_lib/actions";

function SignInButton() {
  // we can not use onClick on button because we want this component to be server side rendering. so we have to use server actions, to use server actions we first wrap the button with <form> tag and specify action attribute
  // server actions allow us iteractivity in server components
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
