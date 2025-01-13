import { PrimaryButton, SecondaryButton } from "../components/UI/Button";
import UpdatePassword from "../components/forms/UpdatePassword";
import Navbar from "../components/UI/Navbar";
import { Link } from "react-router-dom";
import styles from "../styles/Profile/Profile.module.css";
import { useLogout, useProfile } from "../api/userApi";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import errorToasting from "../utils/errorToasting";
import Spinner from "../components/UI/Spinner";

export default function Profile() {
  const { mutate, isPending } = useLogout();
  const { data: user, isLoading, isError, error } = useProfile();

  useEffect(() => {
    if (isError) {
      errorToasting(error);
    }
  }, [isError, error]);

  const logout = async () => {
    mutate();
  };

  return (
    <div>
      <Navbar />
      <div className="detailpage-container p-2">
        <div className={styles.profileGrid}>
          <div className={styles.profileInfoCard}>
            {isLoading ? (
              <>
                <div>
                  <p>
                    <Skeleton circle className={styles.profileAvatar} />
                  </p>
                </div>
                <div className={styles.profileDetails}>
                  <h2>
                    <Skeleton count={2} height={30} />
                  </h2>
                  <p>
                    <Skeleton width={"100%"} />
                  </p>
                  <div>
                    <Skeleton count={2} height={28} width={"100%"} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.profileAvatar}>
                  <span>{user ? user.name[0].toUpperCase() : ""}</span>
                </div>
                <div className={styles.profileDetails}>
                  <h2>{user ? user.name : ""}</h2>
                  <p>{user ? user.email : ""}</p>
                  <div className="col gap-1">
                    <SecondaryButton
                      classes="w-100"
                      disabled={isError || isPending}
                      onClick={logout}>
                      {isPending ? (
                        <Spinner
                          size="15px"
                          color="#000000"
                          borderThickness="2px"
                        />
                      ) : (
                        "Logout"
                      )}
                    </SecondaryButton>
                    <Link to="/orders">
                      <PrimaryButton classes="w-100" disabled={isError}>
                        View Orders
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.updatePasswordSection}>
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
