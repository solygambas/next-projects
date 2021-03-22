// Combining Pre-Fetching With Client-Side Fetching

import { useEffect, useState } from "react";
import useSWR from "swr";

const url = process.env.NEXT_PUBLIC_FIREBASE_DB;

function lastSales(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(url);
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  if (error) {
    return <p>Failed to load...</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default lastSales;

export async function getStaticProps() {
  const response = await fetch(url);
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales }, revalidate: 10 };
}
