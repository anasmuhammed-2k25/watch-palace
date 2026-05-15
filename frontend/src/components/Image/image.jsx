function Image({ src, alt = "image", width = "60px", height = "60px" }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit: "cover",
        borderRadius: "6px",
      }}
    />
  );
}

export default Image;