import { FormEvent, useState } from "react";
import styles from "../../styles/forms/Authentication.module.css";
import { PrimaryButton } from "../UI/Button";
import { useAuthenticate } from "../../api/userApi";
import Spinner from "../UI/Spinner";

const Login = () => {
  const [error, setError] = useState("");
  const { mutate, isPending } = useAuthenticate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    mutate(
      { credentials: { email, password }, operation: "login" },
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
    <form onSubmit={handleLogin} className={styles.form}>
      <h2>Login</h2>
      <div className={styles.form_group}>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className={styles.form_group}>
        <input type="password" name="password" placeholder="Password" />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <PrimaryButton disabled={isPending}>
        {isPending ? (
          <Spinner size="15px" color="#fff" borderThickness="2px" />
        ) : (
          "Login"
        )}
      </PrimaryButton>
    </form>
  );
};

export default Login;
