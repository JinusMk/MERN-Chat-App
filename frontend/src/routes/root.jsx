import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
        <h1>React Router Contacts</h1>
        <Link to="chat/123">Go to Chat screen</Link>
    </>
  );
}