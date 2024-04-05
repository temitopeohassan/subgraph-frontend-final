










import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';

function App() {
  const [transfers, setTransfer] = useState([]);

  const QueryURL = "https://api.studio.thegraph.com/query/66484/graph-africa-demo/version/latest";

  const client = new ApolloClient({
    uri: QueryURL,
    cache: new InMemoryCache()
  });

  const GET_TRANSFER = gql`
  query {
    transfers(first: 5) {
      id
      sender
      receiver
      amount
    }
  }
`;


  useEffect(() => {
    console.log("Fetching transfers...");
    const fetchTransfer = async () => {
      try {
        const { data } = await client.query({
          query: GET_TRANSFER
        });
        console.log("Received transfers data:", data);
        setTransfer(data.transfers);
      } catch (error) {
        console.error("Error fetching transfer:", error);
      }
    };

    fetchTransfer();

    // Clean-up function
    return () => {
      console.log("Component unmounted or dependencies changed, cleaning up...");
      // You can perform any cleanup here if necessary
    };
  }, [client, GET_TRANSFER]);

  return (
    <div>
      <h1>Transfers Information</h1>
      {transfers !== null && transfers.length > 0 && transfers.map((transfers) => (
        <div key={transfers.id}>
  
          <div>Sender:{transfers.sender}</div> 
          <div>Receiver:{transfers.receiver}</div> 
          <div>Amount:{transfers.amount}</div> 
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
