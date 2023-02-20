import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import CompanyCard from "../components/CompanyCard";

export default function Home({ companies }) {
  return (
    <div className="container">
      <Head>
        <title>Gear Warranty Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Outdoor Gear Warranties</h1>
        <p>Do you have gear that is in need of repair or has a defect? See below for which outdoor brands offer Lifetime or Limited warranties.</p>
        <ul className="companies-container">
          {companies.map((company) => (
            <CompanyCard
              key={company._id}
              name={company.name}
              website={company.website}
              warrantyDescription={company.warrantyDescription}
              warrantyUrl={company.warrantyUrl}
            />
          ))}
        </ul>
      </main>

      <footer>
        <p>&#169; {new Date().getFullYear()} <a href="https://anastasialanz.com/">Anastasia Lanz</a></p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 1rem;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .companies-container {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          max-width: 64rem;
          margin: 2rem auto;
          padding: 0;
          gap: 1.5rem;
        }

        @media (min-width: 44rem) {
          .companies-container {
            flex-flow: row wrap;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
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
