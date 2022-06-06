import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import UsersList from "./containters/UsersList";
import Form from "./components/Form";

function App() {
  const [users, setUsers] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUsers = async (numberOfUsers: number = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://randomuser.me/api/?results=${numberOfUsers}`
      );
      const data = res.data.results;
      setUsers(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">Users List</header>
      <main>
        <Form onSubmit={fetchUsers} />
        {loading && <Loading />}
        {!loading && users && <UsersList users={users} />}
        {!loading && error && <h4 className="error">{error}</h4>}
      </main>
    </div>
  );
}

export default App;
