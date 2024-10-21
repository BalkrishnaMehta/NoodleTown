export default function MenuImage({ title, menuImage, handleZoomImage }) {
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
}
