import { useRef, useState } from "react";

import styles from "../../styles/BrandDetailView/Menu.module.css";
import MenuImage from "./MenuImage";
import Modal, { ModalHandle } from "../UI/Modal";

interface DetailMenuImageProps {
  diningMenuImage: string;
  takeawayMenuImage: string;
}

const DetailMenuImage = ({
  diningMenuImage,
  takeawayMenuImage,
}: DetailMenuImageProps) => {
  const modal = useRef<ModalHandle>(null);
  const [currentImage, setCurrentImage] = useState<string>("");

  function handleZoomImage(imageSrc: string) {
    setCurrentImage(imageSrc);
    modal.current?.open();
  }

  function closeModal() {
    modal.current?.close();
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
};

export default DetailMenuImage;
