import React, { useEffect, useContext, useState } from "react";

import { AppWideContext } from "../context/AppWideContext";

export default function Account() {
  const [loading, setLoading] = useState(false);

  const {
    state: { todos },
    dispatch,
  } = useContext(AppWideContext);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Ensure that if the user navigates between pages, the data is not refetched unnecessarily.
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/1`
        );
        const json = await response.json();
        dispatch({ type: "SET_TODOS", payload: json });
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, []);

  if (loading) {
    return <span>loading...</span>;
  }

  return (
    <div>
      <pre>{JSON.stringify(todos, 2)}</pre>
    </div>
  );
}
