// src/pages/home.tsx
import { paths } from "../paths";
import PageCard from "../components/page-card";
import { PageCardProps } from "../components/page-card";

export default function HomePage() {
  const pages = [
    {
      img: {
        src: "https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1626826379382-G3AZ2M1WYL72AJEV3LZR/sw+%281%29.jpg",
        alt: "Star Wars: People",
      },
      title: "People",
      linkTo: paths.people,
    },
    {
      img: {
        src: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/10/major-star-wars-planets-future-image.jpg",
        alt: "Star Wars: Planets",
      },
      title: "Planets",
      linkTo: paths.planets,
    },
    {
      img: {
        src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/star-wars-largest-starships-ranked.jpg",
        alt: "Star Wars: Starships",
      },
      title: "Starships",
      linkTo: paths.starships,
    },
  ] satisfies PageCardProps[];

  return (
    <div className="container-fluid">
      <h1 className="">Star Wars API</h1>
      <p className="lead text-muted">
        The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified
        and programmatically-accessible data source for all the data from the
        Star Wars canon universe!
      </p>
      <div className="row">
        {pages.map((page, index) => (
          <div className="col-md-4" key={index}>
            <PageCard img={page.img} title={page.title} linkTo={page.linkTo} />
          </div>
        ))}
      </div>
    </div>
  );
}
