interface MenuImageProps {
  title: string;
  menuImage: string;
  handleZoomImage: (menuImage: string) => void;
}

const MenuImage = ({ title, menuImage, handleZoomImage }: MenuImageProps) => {
  return (
    <div>
      <img
        src={menuImage}
        className="brand-image"
        onClick={() => handleZoomImage(menuImage)}
        alt={title}
        style={{ cursor: "pointer" }}
      />
      <p>{title}</p>
    </div>
  );
};

export default MenuImage;
