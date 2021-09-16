import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import contentful from "../../contentful";
import Skeleton from "../../components/Skeleton";

const client = contentful.getClient();

export async function getStaticPaths() {
  const { items } = await client.getEntries({
    content_type: "recipe",
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const paths = items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  const [recipe] = items;

  return {
    props: { recipe },
    revalidate: 1,
  };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return <Skeleton />;
  }

  const { title, cookingTime, ingredients, method } = recipe.fields;

  const {
    file: {
      details: { image },
      url: imageUrl,
    },
  } = recipe.fields.featureImage.fields;

  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${imageUrl}`}
          width={image.width}
          height={image.height}
          alt={title}
        />

        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Takes about {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>
        {ingredients.map((ingredient, i) => {
          return <span key={i}>{ingredient}</span>;
        })}
      </div>

      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}
