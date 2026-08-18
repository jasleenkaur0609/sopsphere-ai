import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const ProfileMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const name = user.name || "Jasleen Kaur";
  const email =
    user.email || "jasleen@example.com";

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    onClose();

    navigate("/login");
  };

  return (
    <div
      className="profile-dropdown"
      style={{
        position: "fixed",
        top: "70px",
        right: "24px",
      }}
    >
      <div className="profile-dropdown-header">
        <div className="profile-dropdown-name">
          {name}
        </div>

        <div className="profile-dropdown-email">
          {email}
        </div>
      </div>

      <button
        type="button"
        className="profile-dropdown-item"
        onClick={() =>
          handleNavigate("/dashboard/profile")
        }
      >
        <FaUser />
        Profile
      </button>

      <button
        type="button"
        className="profile-dropdown-item"
        onClick={() =>
          handleNavigate("/dashboard/settings")
        }
      >
        <FaCog />
        Settings
      </button>

      <button
        type="button"
        className="profile-dropdown-item"
        onClick={() =>
          handleNavigate("/dashboard/help")
        }
      >
        <FaQuestionCircle />
        Help & Support
      </button>

      <button
        type="button"
        className="profile-dropdown-item logout"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;