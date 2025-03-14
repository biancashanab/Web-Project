import "./loadingCat.css";

const LoadingCat = () => {
  return (
    <div className="cat">
      {Array.from({ length: 30 }).map((_, index) => (
        <div key={index} className="cat__segment"></div>
      ))}
    </div>
  );
};

export default LoadingCat;
