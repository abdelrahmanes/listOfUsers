import { useState } from "react";
import User from "../components/User";
import { IUser } from "../interfaces/IUser";
import { sortBy } from "sort-by-typescript";
type Props = {
  users: IUser[];
};
function UsersList({ users }: Props) {
  const [query, setQuery] = useState("");
  const showingUsers: IUser[] =
    query == ""
      ? users
      : users.filter((user: IUser): boolean => {
          const name = `${user.name.first} ${user.name.last}`;
          return name.toLowerCase().includes(query.trim().toLowerCase());
        });
  return (
    <div className="list-users">
      <div className="list-users-top">
        <input
          className="search-users"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search Users"
        />
      </div>
      {showingUsers.length !== users.length && (
        <div className="showing-users">
          <span>{`Now showing ${showingUsers.length} of ${users.length}`}</span>
          <button
            onClick={() => {
              setQuery("");
            }}
          >
            Show all
          </button>
        </div>
      )}
      <div className="row users-container">
        {users &&
          showingUsers.sort(sortBy("name.first")).map((user) => {
            return (
              <div className="col-12 col-md-6" key={user.login.uuid}>
                <User user={user} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UsersList;
