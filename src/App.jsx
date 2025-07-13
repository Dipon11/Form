import { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import Footer from './Footer';


const App = () => {
  const [users, setUsers] = useState([{ name: '', email: '', password: '', gender: '' }]);
  const [showPassword, setShowPassword] = useState(false);
  const [submittedUsers, setSubmittedUsers] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const addUser = () => {
    setUsers([...users, { name: '', email: '', password: '', gender: '' }]);
  };

  const deleteUser = (index) => {
    if (users.length > 1) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const deleteSubmittedUser = (index) => {
    setSubmittedUsers(submittedUsers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUsers = users.filter(u => u.name || u.email || u.password);

    if (validUsers.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add at least one user!',
      });
      return;
    }

    setSubmittedUsers([...submittedUsers, ...validUsers]);
    setUsers([{ name: '', email: '', password: '', gender: '' }]);

    Swal.fire({
      icon: 'success',
      title: 'Submitted!',
      text: `${validUsers.length} user(s) successfully submitted.`,
    });
  };

  const tableData = users.filter(u => u.name || u.email || u.password);

  return (
    <>
      <Footer></Footer>
      <div className="max-w-7xl mx-auto md:flex bg-white py-12 px-4">

        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-5">Add Team Members</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {users.map((user, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">User #{index + 1}</h3>
                    {users.length > 1 && (
                      <button
                        type="button"
                        onClick={() => deleteUser(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="lg:grid lg:grid-cols-4 sm:grid sm:grid-cols-1 space-y-4 gap-4">
                    <div>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={(e) => handleChange(index, 'password', e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                      </button>
                    </div>
                    <div>
                      <select
                        value={user.gender}
                        onChange={(e) => handleChange(index, 'gender', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={addUser}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add User
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-6 rounded-lg font-medium"
                >
                  Submit All
                </button>
              </div>
            </form>
          </div>
          {tableData.map((u) => (


            <table className="min-w-full border-collapse mt-5">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border-b-2 border-gray-200">Name</th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-200">Email</th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-200">Password</th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-200">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">{u.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{u.email}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{u.password}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{u.gender}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>

        {/* Right Column - Submitted Data Table */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8">
          <div className="bg-white rounded-lg shadow-md p-8 h-full">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">Submitted Users</h2>
            {submittedUsers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submittedUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => deleteSubmittedUser(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No submitted users yet. Fill out the form and click "Submit All".</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </>

  );
};

export default App;