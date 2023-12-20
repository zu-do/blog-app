import { useEffect, useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeProfileModal from "../components/ChangeProfileModal";
import { CURRENT_USER_ID, TOKEN } from "../constants";
import "../styles/user-profile.css";
import { getUser } from "../utils/auth-axios-utils";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfiledModal, setShowProfileModal] = useState(false);

  const handlePasswordModalOpen = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const handleProfileModalOpen = () => {
    setShowProfileModal(true);
  };

  const handleUpdateProfile = async () => {
    const updatedProfileData = await getUser();
    setUser(updatedProfileData);
  };

  const handleProfiledModalClose = () => {
    setShowProfileModal(false);
  };

  const initialProfile = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio,
  };

  useEffect(() => {
    getUser()
      .then(async (data) => {
        setUser(data);
        sessionStorage.setItem(CURRENT_USER_ID, data.id);
      })
      .catch((err) => sessionStorage.removeItem(TOKEN));
  }, []);

  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm justify-content-md-center">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user?.userName}</h4>
                    <p className="text-secondary mb-1">{user?.email}</p>
                    <p className="text-secondary mb-1">{user?.firstName}</p>
                    <p className="text-secondary mb-1">{user?.lastName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row gutters-sm justify-content-md-center">
          <div className="col-md-8">
            {user?.bio && (
              <div className="card mb-3 text-center">
                <div className="card-body">
                  <p>{user?.bio}</p>
                </div>
              </div>
            )}
            <div className="card mb-3 text-center">
              <div className="card-body">
                <button onClick={handleProfileModalOpen}>
                  Change Profile information
                </button>
              </div>
            </div>

            <div className="card mb-3 text-center">
              <div className="card-body">
                <button onClick={handlePasswordModalOpen}>
                  Change Password
                </button>
                <ChangePasswordModal
                  show={showPasswordModal}
                  handleClose={handlePasswordModalClose}
                />
                <ChangeProfileModal
                  show={showProfiledModal}
                  handleClose={handleProfiledModalClose}
                  initialProfile={initialProfile}
                  updateProfileData={() => handleUpdateProfile()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
