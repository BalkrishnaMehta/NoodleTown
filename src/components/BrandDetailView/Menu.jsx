import MenuImage from "./MenuImage";
import Modal from "../UI/Modal";

import { useRef, useState } from "react";

import styles from "../UI/Modal.module.css";

export default function DetailMenuImage({
  diningMenuImage,
  takeawayMenuImage,
}) {
  const modal = useRef();
  const [currentImage, setCurrentImage] = useState("");

  function handleZoomImage(imageSrc) {
    setCurrentImage(imageSrc);
    modal.current.open();
  }

  function closeModal() {
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <div className={styles.img_container}>
          <img src={currentImage} alt="Zoomed menu" />
          <button onClick={closeModal} className={styles.close_btn}>
            X
          </button>
        </div>
      </Modal>
      <section className="p-2">
        <div className="detailpage-container">
          <h4 className="text-500">Menu</h4>
          <div className="my-2 row gap-2 sm-col">
            <MenuImage
              title={"Dining Menu"}
              menuImage={diningMenuImage}
              handleZoomImage={handleZoomImage}
            />
            <MenuImage
              title={"Takeaway menu"}
              menuImage={takeawayMenuImage}
              handleZoomImage={handleZoomImage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
