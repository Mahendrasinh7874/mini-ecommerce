import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/authSlice";
import { userdata } from "../users";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/admin/login");
  }, [user]);
  return (
    <div className="relative py-16 max-w-2xl mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex  py-3 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <h2 className="font-semibold">Users</h2>
        </div>

        <button
          onClick={() => navigate("/admin/users/new")}
          className="py-1 bg-blue-500 min-w-[100px] cursor-pointer text-white text-base rounded-md"
        >
          Add New
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.length > 0 &&
            users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {user.id}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 space-x-5">
                  <a
                    onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                    className="font-medium text-blue-600  hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      const filteredUsers = users.filter(
                        (u) => u.id !== user.id
                      );
                      dispatch(setUsers(filteredUsers));
                    }}
                    className="font-medium text-red-600  hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
