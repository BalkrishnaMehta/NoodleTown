import { FormEvent, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../UI/Button";
import styles from "../../styles/forms/AddressForm.module.css";
import Address from "../../models/Address";
import { useAddAddress } from "../../api/addressApi";
import errorToasting from "../../utils/errorToasting";
import Spinner from "../UI/Spinner";

const AddressForm = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState<Address>({
    title: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: 0,
    isDefault: false,
    isLastUsed: false,
  });
  const [error, setError] = useState<string>("");

  const { mutate, isPending } = useAddAddress();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (
      !formData.title ||
      !formData.line1 ||
      !formData.city ||
      !formData.state ||
      formData.pincode === 0
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    mutate(
      { address: formData },
      {
        onSuccess: () => {
          setFormData({
            title: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: 0,
            isDefault: false,
            isLastUsed: false,
          });
          closeModal();
          console.log("Address added successfully!");
        },
        onError: (err) => {
          errorToasting(err);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add new address</h2>
      <div className={styles.form_group}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <input
          type="text"
          name="line1"
          placeholder="Address Line 1"
          value={formData.line1}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <input
          type="text"
          name="line2"
          placeholder="Address Line 2 (optional)"
          value={formData.line2}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>
      <div className={styles.form_group}>
        <label>
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          Set as Default Address
        </label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className="row justify-between">
        <PrimaryButton type="submit" disabled={isPending}>
          {isPending ? (
            <Spinner size="15px" color="#fff" borderThickness="2px" />
          ) : (
            "Submit"
          )}
        </PrimaryButton>
        <SecondaryButton
          type="button"
          onClick={closeModal}
          disabled={isPending}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
};

export default AddressForm;
