import { FormEvent, useState } from "react";
import styles from "../../styles/forms/Authentication.module.css";
import { PrimaryButton } from "../UI/Button";
import { useAuthenticate } from "../../api/userApi";
import Spinner from "../UI/Spinner";

const SignUp = () => {
  const [error, setError] = useState("");
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const { mutate, isPending } = useAuthenticate();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!nameRegex.test(name)) {
      setError(
        "Name must be at least 3 characters long and contain only letters and spaces."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one symbol, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    mutate(
      { credentials: { name, email, password }, operation: "register" },
      {
        onSuccess: () => {
          setError("");
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSignUp} className={styles.form}>
      <h2>Sign Up</h2>
      <div className={styles.form_group}>
        <input type="text" name="name" placeholder="Full Name" />
      </div>
      <div className={styles.form_group}>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className={styles.form_group}>
        <input type="password" name="password" placeholder="Password" />
      </div>
      <div className={styles.form_group}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <PrimaryButton disabled={isPending}>
        {isPending ? (
          <Spinner size="15px" color="#fff" borderThickness="2px" />
        ) : (
          "Sign Up"
        )}
      </PrimaryButton>
    </form>
  );
};

export default SignUp;
