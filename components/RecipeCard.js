import Link from "next/link";
import Image from "next/image";

const RecipeCard = ({ recipe }) => {
  const {
    title,
    slug,
    cookingTime,
    thumbnail: {
      fields: {
        file: {
          details: { image },
          url: imageUrl,
        },
      },
    },
  } = recipe.fields;
  return (
    <div className="card">
      <div className="featured">
        <Image
          src={`https:${imageUrl}`}
          width={image.width}
          height={image.height}
          alt={""}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className="actions">
          <Link href={`/recipes/${slug}`}>
            <a>{"Cook this"}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
