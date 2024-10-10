import { Outlet } from "react-router-dom";

export default function Chats() {
  return (
    <div>
        Chats screen
        <div>
            <Outlet />
        </div>
    </div>
  );
}