import contentful from "../../contentful";

const client = contentful.getClient();

export async function getStaticPaths() {
  const { items } = await client.getEntries({
    content_type: "recipe",
  });

  const paths = items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
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
  };
}

export default function RecipeDetails({ recipe }) {
  const {
    fields: { title },
  } = recipe;

  return <div>{title}</div>;
}
