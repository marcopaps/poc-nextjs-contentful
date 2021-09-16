import RecipeCard from "../components/RecipeCard";
import contentful from "../contentful";

export async function getStaticProps() {
  const client = contentful.getClient();

  const response = await client.getEntries({
    content_type: "recipe",
  });

  return {
    props: { recipes: response.items },
    revalidate: 1,
  };
}

export default function Home({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.sys.id} />
      ))}

      <style jsx>
        {`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
        `}
      </style>
    </div>
  );
}
