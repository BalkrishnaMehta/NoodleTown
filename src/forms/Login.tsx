import { FormEvent, useState } from "react";
import styles from "../styles/Forms/Authentication.module.css";
import { PrimaryButton } from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/authSlice";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (false) {
      // check user is regestered or not
      setError("Email does not exists try signing up");
      return;
    }
    if (false) {
      // check registered user password with user input
      setError("Invalid password");
      return;
    }
    setError("");
    if (error === "") {
      dispatch(authActions.login());
    }
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
      <PrimaryButton>Login</PrimaryButton>
    </form>
  );
};

export default Login;
