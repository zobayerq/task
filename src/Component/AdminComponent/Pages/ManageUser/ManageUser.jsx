import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
// import useRole from '../../../hooks/useRole';
import { RiDeleteBin6Line } from "react-icons/ri";
import Lodar from '../../../Lodar/Lodar';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUser = () => {
  const AxiosSecure = useAxiosSecure();
  // const [role, isLoading, refetch] = useRole();
  const [itemToDelete, setItemToDelete] = useState(null);

  const { data: users = [], isLoading: loading, refetch: rf } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await AxiosSecure(`/users`);
      return data;
    },
  });

  // Handle user deletion
  const handleDelete = () => {
    if (itemToDelete) {
      AxiosSecure.delete(`/user/${itemToDelete}`)
        .then((res) => {
          rf();
          toast.success("User deleted successfully!", { position: "top-center" });
          closeModal();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Handle user block
  const handleBlock = (id) => {
    AxiosSecure.put(`/user/block/${id}`)
      .then((res) => {
        rf();
        toast.success("User blocked successfully!", { position: "top-center" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle user unblock
  const handleUnblock = (id) => {
    AxiosSecure.put(`/user/unblock/${id}`)
      .then((res) => {
        rf();
        toast.success("User unblocked successfully!", { position: "top-center" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle role change
  const handleRoleChange = (id, role) => {
    AxiosSecure.put(`/user/toggle-role/${id}`, { role })
      .then((res) => {
        rf();
        refetch();
        toast.success("User role changed successfully!", { position: "top-center" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Open modal for delete confirmation
  const openModal = (id) => {
    setItemToDelete(id);
    document.getElementById('delete_modal').showModal();
  };

  // Close modal
  const closeModal = () => {
    setItemToDelete(null);
    document.getElementById('delete_modal').close();
  };

  if (loading) return <Lodar></Lodar>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">Number</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              <th className="py-3 px-6 text-left border-b">Name</th>
              <th className="py-3 px-6 text-left border-b">Role</th>
              <th className="py-3 px-6 border-b text-end">Change Role</th>
              <th className="py-3 px-6 border-b text-end">Status</th>
              <th className="py-3 px-6 border-b text-end">Status Update</th>
              <th className="py-3 px-6 border-b text-end">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td className="hover:bg-gray-50 transition duration-300 text-center">{idx + 1}</td>
                <td className="py-4 px-6 border-b">{user.email}</td>
                <td className="py-4 px-6 border-b">{user.name}</td>
                <td className="py-4 px-6 border-b">{user.role}</td>
                <td className="py-4 px-6 border-b">
                  <select
                    className="border-dashed border-2 p-3"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="moderator">moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-4 px-6 border-b">{user.status}</td>
                <td className="py-4 px-6 border-b">
                  {user.status === 'normal' ? (
                    <button className="btn" onClick={() => handleBlock(user._id)}>Block</button>
                  ) : (
                    <button className="btn" onClick={() => handleUnblock(user._id)}>Unblock</button>
                  )}
                </td>
                <td className="py-4 px-6 border-b">
                  <button className="btn btn-error" onClick={() => openModal(user._id)}>
                    <RiDeleteBin6Line className="text-xl" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <p className="py-4">Are you sure you want to delete this user?</p>
          <div className="modal-action">
            <button className="btn btn-success" onClick={handleDelete}>
              Yes
            </button>
            <button className="btn btn-error" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUser;
