import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { map, isEmpty } from 'lodash';

import { videosRef } from '../../firebase';
import {
  Display,
  SmallBodyAlt,
  Caption,
  Container,
  SectionWrapper,
  TitlePaddingBottom,
} from '../../styles';
import { COLORS } from '../../styles/vars';
import {
  Header,
  HeaderButtons,
  CurrentLiveCasts,
  RecentLiveCasts,
  CurrentCard,
  RecentCard,
  CornerImage,
  CoverImage,
  CornerImageRecent,
  CoverImageRecent,
  Footer,
  RecentCardDesktop,
  RecentCardInner,
} from './HomeStyles';
import { User } from '../Common/User';
import { LoginConsumer } from '../Login/Login';
import { VideoCoinInfo } from '../VideoCoinInfo/VideoCoinInfo';
import { StartLiveCast } from '../GoLive/StartLiveCast';
import { ViewLiveCast } from '../ViewLiveCast/ViewLiveCast';
import { CardImage } from '../Common/CardImage';
import { withScreenWidth, BREAKPOINT_NAMES } from '../HOC/withScreenWidth';
import { VIDEO_STATUS } from '../../constants';

const fetchFirebaseData = async callback => {
  try {
    const docs = await videosRef.get();
    const data = {
      current: {},
      ended: {},
    };

    docs.forEach(doc => {
      const docData = doc.data();
      if (!docData.id) {
        docData.id = doc.id;
      }
      if (docData.status === VIDEO_STATUS.ENDED) {
        data.ended[doc.id] = docData;
      } else {
        data.current[doc.id] = docData;
      }
    });

    callback(data);
  } catch (e) {
    console.log('error', e);
  }
};

const HomeInner = ({ screenWidth }) => {
  const [selected, setSelected] = useState('');
  const [videoData, setVideoData] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchFirebaseData(setVideoData);
    if (id) {
      setSelected(id);
    }
  }, [id]);

  const SectionTitle = TitlePaddingBottom(Display('h2'));

  const isDesktop =
    screenWidth === BREAKPOINT_NAMES.LAPTOP ||
    screenWidth === BREAKPOINT_NAMES.DESKTOP;

  const renderCard = (data, isCurrent = false) => {
    const VideoTitle = SmallBodyAlt('h3', COLORS.WHITE);
    const AuthorNameTitle = Caption('h5', COLORS.WHITE);
    return (
      <div onClick={() => history.push(data.id)}>
        <div className="imageArea">
          <CardImage
            src={data.image_url}
            alt={data.title}
            StyledComponent={CoverImage}
          />
          <CornerImage src={data.creator_img_url} alt={data.creator_name} />
        </div>
        <div className="videoInfoArea">
          <AuthorNameTitle>{data.creator_name}</AuthorNameTitle>
          <VideoTitle>{data.title}</VideoTitle>
        </div>
      </div>
    );
  };

  const renderRecentCard = data => {
    const VideoTitle = SmallBodyAlt('h3');
    const AuthorNameTitle = Caption('h5');

    return (
      <RecentCardInner onClick={() => history.push(data.id)}>
        <div className="imageArea">
          <CardImage
            src={data.image_url}
            alt={data.title}
            StyledComponent={CoverImageRecent}
          />
          <CornerImageRecent
            src={data.creator_img_url}
            alt={data.creator_name}
          />
        </div>
        <div className="videoInfoArea">
          <AuthorNameTitle>{data.creator_name}</AuthorNameTitle>
          <VideoTitle>{data.title}</VideoTitle>
        </div>
      </RecentCardInner>
    );
  };

  const renderCurrentLiveCasts = () => {
    const currentLivecasts = Object.keys(videoData.current);
    return (
      <CurrentLiveCasts>
        {map(currentLivecasts, key => {
          const item = videoData.current[key];
          return <CurrentCard key={key}>{renderCard(item, true)}</CurrentCard>;
        })}
      </CurrentLiveCasts>
    );
  };

  const renderRecentLiveCasts = () => {
    const endedLivecasts = Object.keys(videoData.ended);
    return (
      <RecentLiveCasts>
        {map(endedLivecasts, key => {
          const item = videoData.ended[key];
          return isDesktop ? (
            <RecentCardDesktop key={key}>{renderCard(item)}</RecentCardDesktop>
          ) : (
            <RecentCard key={key}>{renderRecentCard(item)}</RecentCard>
          );
        })}
      </RecentLiveCasts>
    );
  };

  if (!videoData) {
    return null;
  }

  return (
    <LoginConsumer>
      {({ user }) => {
        if (isEmpty(user)) {
          return <Redirect to="/login" />;
        }

        return (
          <Container>
            <SectionWrapper>
              <Header>
                <SectionTitle>Live Casts</SectionTitle>
                <HeaderButtons>
                  <User />
                  <VideoCoinInfo />
                </HeaderButtons>
              </Header>
              {renderCurrentLiveCasts()}
            </SectionWrapper>
            <SectionWrapper>
              <SectionTitle>Recently Ended</SectionTitle>
              {renderRecentLiveCasts()}
            </SectionWrapper>
            <Footer>
              <StartLiveCast user={user} />
            </Footer>
            <ViewLiveCast id={selected} handleClose={() => setSelected(null)} />
          </Container>
        );
      }}
    </LoginConsumer>
  );
};

HomeInner.propTypes = {
  screenWidth: PropTypes.string.isRequired,
};

export const Home = withScreenWidth(HomeInner);
