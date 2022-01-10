import clientPromise from "../../lib/mongodb"

export default async (req, res) => {

  const client = await clientPromise;
  const companies = client.db().collection('companies');
  const allCompanies = await companies.find({}).toArray();

  res.status(200).json(allCompanies)
}