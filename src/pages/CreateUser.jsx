import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../store/authSlice";
import { useNavigate, useParams } from "react-router-dom";

const CreateUser = () => {
  const { users } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  console.log(id);

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id == id);
      console.log(user, "user");

      if (user) {
        setFormData({
          name: user?.name,
          email: user.email,
          role: user.role,
          password: user.password,
        });
      }
    }
  }, [id, users]);

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFormData((prev) => ({
      ...prev,
      [name]: name === "role" ? value : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const req = {
      id: id ? id : users.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    };
    console.log({ req });
    if (id) {
      dispatch(editUser(req));
      navigate(-1);
    } else {
      dispatch(addUser(req));
      navigate(-1);
    }
  };

  return (
    <div className="max-w-lg min-h-screen flex items-center justify-center mx-auto ">
      <form
        onSubmit={onSubmit}
        className="w-full mx-auto border p-4  rounded-md border-[#d4d4d4]"
      >
        <h2 className="py-3 font-semibold">Create User</h2>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Role
          </label>

          <select
            name="role"
            required
            value={formData.role}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
          >
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </select>
        </div>

        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            value={formData.password}
            onChange={onChange}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <br />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
