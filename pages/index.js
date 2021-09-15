import RecipeCard from "../components/RecipeCard";
import contentful from "../contentful";

export async function getStaticProps() {
  const client = contentful.getClient();

  const response = await client.getEntries({
    content_type: "recipe",
  });

  return {
    props: { recipes: response.items },
  };
}

export default function Home({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.sys.id} />
      ))}
    </div>
  );
}
