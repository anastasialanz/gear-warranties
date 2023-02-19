import clientPromise from "../lib/mongodb";

export default function Companies({ companies }) {
  return (
    <ul>
      {companies.map((company) => (
        <li>
          <h2>{company.name}</h2>
          <a href={company.website}>{company.website}</a>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const companies = await db
      .collection("companies")
      .find({})
      .toArray();

    return {
      props: { companies: JSON.parse(JSON.stringify(companies)) },
    };
  } catch (e) {
    console.error(e);
  }
}