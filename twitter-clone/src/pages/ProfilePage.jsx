import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import TweetCard from '../components/TweetCard';

const NAV_WIDTH = 260;
const RIGHTBAR_WIDTH = 350;

const Layout = styled.div`
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const Main = styled.main`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  margin-left: ${NAV_WIDTH + 20}px;
  margin-right: ${RIGHTBAR_WIDTH + 20}px;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  background: #000;
`;

const Feed = styled.div`
  background: #000;
`;

const dummyProfile = {
  name: '송지민',
  username: 'efub_4th_toy',
  avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
  bio: '안녕하세요! 트위터 클론입니다.',
};

const dummyTweets = [
  {
    id: 1,
    author: '송지민',
    username: 'efub_4th_toy',
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    content: '내 트윗 1',
    image: null,
    stats: { replies: '1', retweets: '2', likes: '3', views: '100' }
  },
  {
    id: 2,
    author: '송지민',
    username: 'efub_4th_toy',
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    content: '내 트윗 2',
    image: null,
    stats: { replies: '2', retweets: '3', likes: '4', views: '200' }
  }
];

function ProfilePage() {
  return (
    <Layout>
      <Main>
        <ProfileCard profile={dummyProfile} />
        <Feed>
          {dummyTweets.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </Feed>
      </Main>
    </Layout>
  );
}

export default ProfilePage;