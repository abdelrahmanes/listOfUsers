import { useState } from "react";

interface Props {
  onSubmit: (numberOfUsers?: number) => Promise<void>;
}
const Form: React.FC<Props> = ({ onSubmit }) => {
  const [count, setcount] = useState(1);

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(count);
      }}
      className="number-of-users-form"
    >
      <div className="form-group">
        <label htmlFor="number-of-users">Number of users</label>
        <input
          type="number"
          id="number-of-users"
          value={count}
          onChange={(e) => {
            setcount(+e.target.value);
          }}
          min="1"
          max="200"
          className="form-control"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Fetch Users
        </button>
      </div>
    </form>
  );
};

export default Form;
