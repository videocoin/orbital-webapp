import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from 'firebase';

import { LoginConsumer } from '../Login/Login';
import { Modal } from './Modal';

const UserButton = styled.button`
  height: 40px;
  width: 40px;
  margin-right: 20px;
  background: transparent;
  border: none;

  img {
    border-radius: 50%;
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;

export const User = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpen = () => setLogoutModalOpen(true);

  const handleClose = () => setLogoutModalOpen(false);

  const logout = async setUserCb => {
    try {
      await auth().signOut();
      setUserCb(null);
    } catch (e) {
      console.log('logout error', e);
    }
  };

  return (
    <LoginConsumer>
      {({ user, setUser }) => {
        return (
          <>
            <UserButton onClick={handleOpen}>
              <img src={user.profile_img_url} alt={user.name} />
            </UserButton>
            {logoutModalOpen && (
              <Modal
                title={user.name}
                handleClose={handleClose}
                handleButtonClick={() => logout(setUser)}
                buttonText="Logout"
              />
            )}
          </>
        );
      }}
    </LoginConsumer>
  );
};
