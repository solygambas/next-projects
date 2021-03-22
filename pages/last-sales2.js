// SWR

import { useEffect, useState } from "react";
import useSWR from "swr";

function lastSales() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_FIREBASE_DB;
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

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       url
  //     ).then((response) =>
  //       response.json().then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       })
  //     );
  //   }, []);
  if (error) {
    return <p>Failed to load...</p>;
  }
  if (!data || !sales) {
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
