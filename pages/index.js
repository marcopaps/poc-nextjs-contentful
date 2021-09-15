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

export default function Home() {
  return <div>Home</div>;
}
