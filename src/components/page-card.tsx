import { Link, useLocation } from "react-router-dom";

export interface PageCardProps {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  linkTo: string;
}

export default function PageCard({ img, title, linkTo }: PageCardProps) {
  let location = useLocation();
  const isActive = location.pathname === linkTo;
  const { src, alt } = img;
  return (
    <div className="card mb-4 box-shadow">
      <img
        src={src}
        className="card-img-top"
        alt={alt}
        style={{
          height: "225px",
          width: "100%",
          display: "block",
          objectFit: "cover",
        }}
        data-holder-rendered="true"
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <p className="lead m-0">{title}</p>
          <Link
            to={linkTo}
            className={`btn btn-sm btn-outline ${
              isActive ? "btn-success text-light" : "btn-secondary"
            }`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}