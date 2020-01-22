import React, { useState, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from 'firebase';
import { isEmpty } from 'lodash';

import { Container, TitleDefault, BodyDefault } from '../../styles';
import {
  Header,
  Footer,
  LogoWrapper,
  LogoGlobeImage,
  LogoTextImage,
  SignInButtonOuter,
  ButtonText,
  ButtonImage,
  SignInBottomWrapper,
  VCLogoImage,
  LoginWrapper,
  AppStoreWrapper,
  InnerContainer,
  RingBackground,
  GithubWrapper,
} from './LoginStyles';
import { getImage } from '../../utils';
import { Button } from '../Common/Button';
import { usersRef } from '../../firebase';

const LoginContext = createContext({
  user: null,
  setUser: () => {},
});

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const LoginConsumer = LoginContext.Consumer;

export const Login = () => {
  const authProvider = new auth.GoogleAuthProvider();
  const fbUser = auth().currentUser;

  const transformFbUser = fbUserObj => ({
    id: fbUserObj.uid,
    email: fbUserObj.email,
    name: fbUserObj.displayName,
    profile_img_url: fbUserObj.photoURL,
    livecast_time_limit: 0,
  });

  const checkIfUserExists = async id => {
    try {
      const userRes = await usersRef.doc(id).get();
      return userRes.exists;
    } catch (e) {
      console.log('checkIfUserExists error', e);
    }
  };

  const createUser = async userObj => {
    try {
      await usersRef.doc(userObj.id).set(userObj);
    } catch (e) {
      console.log('createUser error', e);
    }
  };

  const handleSignInClick = async setUserCb => {
    try {
      const result = await auth().signInWithPopup(authProvider);
      const user = transformFbUser(result.user);
      const hasUser = await checkIfUserExists(user.id);
      if (!hasUser) {
        await createUser(user);
      }

      setUserCb(user);
    } catch (e) {
      console.log('handleSignInClick', e);
    }
  };

  return (
    <LoginConsumer>
      {({ user, setUser }) => {
        if (!isEmpty(user)) {
          return <Redirect to="/" />;
        }

        if (fbUser) {
          setUser(transformFbUser(fbUser));
          return <Redirect to="/" />;
        }

        return (
          <>
            <RingBackground />
            <Container>
              <Header>
                <img src={getImage('VCLogo.png')} alt="Powered by VideoCoin" />
                <Button theme="minimal" size="sm" text="Learn More" />
              </Header>
              <InnerContainer>
                <LoginWrapper>
                  <LogoWrapper>
                    <LogoGlobeImage>
                      <img src={getImage('orbitalSymbol.png')} alt="orbital" />
                    </LogoGlobeImage>
                    <LogoTextImage>
                      <img src={getImage('orbital.png')} alt="orbital" />
                    </LogoTextImage>
                    <p>Send your Live Cast to the world</p>
                  </LogoWrapper>
                  <SignInBottomWrapper>
                    <SignInButtonOuter
                      onClick={() => handleSignInClick(setUser)}
                    >
                      <ButtonImage src={getImage('googleLogo.png')} />
                      <ButtonText>Continue with Google</ButtonText>
                    </SignInButtonOuter>
                    <VCLogoImage>
                      <img
                        src={getImage('VCLogo.png')}
                        alt="Powered by VideoCoin"
                      />
                    </VCLogoImage>
                  </SignInBottomWrapper>
                </LoginWrapper>
                <AppStoreWrapper>
                  <img src={getImage('phones.png')} alt="phones" />
                  {/*<AppButtonWrapper>*/}
                  {/*  <a>*/}
                  {/*    <img src={getImage('googlePlay.svg')} alt="google play" />*/}
                  {/*  </a>*/}
                  {/*  <a>*/}
                  {/*    <img src={getImage('appleStore.svg')} alt="google play" />*/}
                  {/*  </a>*/}
                  {/*</AppButtonWrapper>*/}
                </AppStoreWrapper>
                <Footer>
                  <GithubWrapper>
                    <img src={getImage('githubLogo.png')} alt="github" />
                    <div>
                      <TitleDefault>Get the source code on GitHub</TitleDefault>
                      <BodyDefault>
                        Learn how to build on the VideoCoin Network
                      </BodyDefault>
                    </div>
                  </GithubWrapper>
                  <Button text="Explore the Source" />
                </Footer>
              </InnerContainer>
            </Container>
          </>
        );
      }}
    </LoginConsumer>
  );
};
