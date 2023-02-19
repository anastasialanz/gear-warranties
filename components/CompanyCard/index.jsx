export default function CompanyCard({ 
  name,
  website,
  warrantyDescription,
  warrantyUrl
}) {
  return (
    <li className="company-card">
      <h3><a href={website}>{name}</a></h3>
      <h4>Warranty</h4>
      <p>{warrantyDescription}</p>
      <a href={warrantyUrl}>Warranty details</a>
      <h4>Returns</h4>
      <style jsx>{`
        .company-card {
          border: 1px solid #231E1E;
          border-radius: 0.5rem;
          list-style: none;
          padding: 1rem;
          flex: 1 33.33%;
        }

        .company-card h3 {
          margin-top: 0;
        }
      `}
      </style>
    </li>
  )
}