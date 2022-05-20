import React, { useEffect, useState } from 'react';
import { getUser, getProfilePicture } from '../api/requests';
import { setUser } from '../utils';
import User from './User';
import Guest from './Guest';

// MUI

const Sidebar = () => {
  const [isUser, setCurrentUser] = useState(false);
  const [steamProfile, setSteamProfile] = useState(false);
  useEffect(() => {
    const user = setUser();
    if (user == true) {
      getUser()
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          setUser(false);
        });
    } else if (user == false) {
      setUser(false);
    }
  }, []);
  useEffect(() => {
    getProfilePicture().then((res) => {
      setSteamProfile(res);
    });
  }, [isUser]);

  // useEffect(() => {
  //     getProfilePicture({url: isUser.steam64})
  //     .then((res) =>{
  //         if (res){
  //             console.log(res ,"profile url no error")
  //         }
  //     })
  //     .catch((err) => {
  //         console.log(err, "profile url error")
  //     })

  // }, [isUser])
  return (
    <div style={{ marginTop: '340px' }}>
      {isUser ? (
        <User user={isUser} steamProfile={steamProfile} />
      ) : (
        <Guest />
      )}
    </div>
  );
};
export default Sidebar;
