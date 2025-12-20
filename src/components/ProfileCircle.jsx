import { useState } from 'react';
import ProfileModal from './ProfileModal';

const ProfileCircle = () => {
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
    <div className="relative ">
      <div
        onClick={toggleProfile}
        className="shadow-sm shadow-black w-12 h-12 rounded-full bg-red-wine text-white flex items-center justify-center cursor-pointer text-xl font-bold"
        title="Profile"
      >
        {localStorage.getItem("email")?.[0]?.toUpperCase() || "U"}
      </div>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default ProfileCircle;
