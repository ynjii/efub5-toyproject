import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import TweetCard from "../components/TweetCard";
import { useEffect, useState } from "react";
import { fetchUserDetail } from "../api";

const NAV_WIDTH = 300;
const MAIN_WIDTH = 600;
const PROFILE_CONTENT_WIDTH = 600;
const RIGHTBAR_WIDTH = 350; // 누락되어 추가

const Layout = styled.div`
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const Main = styled.main`
  width: ${MAIN_WIDTH}px;
  min-height: 100vh;
  margin-left: ${NAV_WIDTH}px;
  margin-right: ${RIGHTBAR_WIDTH}px;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  background: #000;
`;

const Banner = styled.div`
  width: ${PROFILE_CONTENT_WIDTH}px;
  height: 200px;
  background: #222;
  position: relative;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  width: ${PROFILE_CONTENT_WIDTH}px;
  margin: 0 auto;
  background: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  padding-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #000;
  background: #222;
  position: absolute;
  left: 1.5rem;
  top: -70px;
`;

const EditProfileBtn = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  border: 1px solid #3a3b3c;
  background: transparent;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #222;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px; /* Avatar height/2 + 여백 */
  padding-left: 1.5rem;
  gap: 0.2rem;
  width: 100%;
  position: relative;
`;

const Name = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Username = styled.div`
  color: #888;
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
`;

const Bio = styled.div`
  margin: 0.5rem 0 0.7rem 0;
  font-size: 1.05rem;
`;

const Joined = styled.div`
  color: #888;
  font-size: 0.97rem;
  margin-bottom: 0.7rem;
`;

const FollowInfo = styled.div`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 0.7rem;
  & span {
    font-weight: bold;
    color: #fff;
    margin-right: 0.5rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1.5px solid #222;
  margin-top: 1.2rem;
  background: #000;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem 0 0.7rem 0;
  background: none;
  border: none;
  color: ${({ active }) => (active ? "#fff" : "#888")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  font-size: 1.08rem;
  border-bottom: ${({ active }) => (active ? "3px solid #1da1f2" : "none")};
  cursor: pointer;
  transition: color 0.2s;
`;

const Feed = styled.div`
  background: #000;
`;

const RightBar = styled.aside`
  allign-items: center;
  width: ${RIGHTBAR_WIDTH}px;
  padding: 1.5rem 1rem 0 1rem;
  background: #000;
  border-left: 1px solid #222;
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: none;
  background: #222;
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const Card = styled.div`
  background: #16181c;
  border-radius: 1.2rem;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
`;

const CardTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.7rem;
`;

const WhoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
  gap: 0.7rem;
`;

const WhoAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #222;
`;

const WhoInfo = styled.div`
  flex: 1;
`;

const WhoName = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const WhoUsername = styled.div`
  color: #888;
  font-size: 0.95rem;
`;

const WhoFollowBtn = styled.button`
  background: #fff;
  color: #000;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1.1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    background: #e6e6e6;
  }
`;

const TrendItem = styled.div`
  margin-bottom: 0.7rem;
  font-size: 0.98rem;
`;

const dummyProfile = {
  name: "김윤지",
  username: "efub_5th_toy",
  avatar:
    "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  bio: "이펍 5기 트위터 클론 코딩",
  joined: "Joined January 2025",
  following: 0,
  followers: 0,
};

const dummyTweets = [
  {
    id: 1,
    author: "김윤지",
    username: "efub_5th_toy",
    avatar:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    content: "내 트윗 1",
    image: null,
    stats: { replies: "1", retweets: "2", likes: "3", views: "100" },
  },
  {
    id: 2,
    author: "김윤지",
    username: "efub_5th_toy",
    avatar:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    content: "내가 작성한 글 2",
    image: null,
    stats: { replies: "2", retweets: "3", likes: "4", views: "200" },
  },
];

const dummyWho = [
  {
    name: "서울시",
    username: "seoulmania",
    avatar:
      "https://w7.pngwing.com/pngs/45/176/png-transparent-seoul-capital-area-seoul-metropolitan-government-seoul-fc-free-government-s-text-south-korea-circle-thumbnail.png",
    desc: "서울특별시에서 운영하는 대표 엑스(구 트위터)입니다. 시민분들과 서울의 소식을 함께 나누고자 합니다. “또해! 매번 특별시 서울”",
  },
  {
    name: "서울교통공사 SeoulMetro",
    username: "seoul_metro",
    avatar:
      "https://pbs.twimg.com/profile_images/1585121133243805696/8kQnQw8d_400x400.jpg",
    desc: "",
  },
  {
    name: "미술관 다니는 청년",
    username: "youthful_museum",
    avatar:
      "https://pbs.twimg.com/profile_images/1648572638348460032/8kQnQw8d_400x400.jpg",
    desc: "",
  },
];

const dummyTrends = [
  { title: "싱크로유", posts: "12.7K posts" },
  { title: "#WHEREISJUN", posts: "26.3K posts" },
  { title: "일백직캠", posts: "2,795 posts" },
  { title: "잠뜰티비", posts: "2,711 posts" },
  { title: "#스트레이키즈", posts: "223K posts" },
];

function ProfilePage() {
  const userId = 3;
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetail(userId)
      .then((data) => {
        setProfile({
          userName: data.userName,
          username: data.userName, // username이 없으므로 userName 사용
          avatar:
            data.avatar ||
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
          bio: data.bio,
          birth: data.birth,
          following: data.following,
          follower: data.follower,
        });
        setTweets(data.tweets || []); // 트윗 목록 설정
      })
      .catch((err) => {
        alert(err.message || "사용자 정보를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div style={{ color: "#fff" }}>로딩중...</div>;
  if (!profile) return <div style={{ color: "#fff" }}>사용자 정보 없음</div>;

  return (
    <Layout>
      <Main>
        <Banner />
        <ProfileSection>
          <Avatar src={profile.avatar} alt="avatar" />
          <EditProfileBtn>Edit profile</EditProfileBtn>
          <ProfileInfo>
            <Name>{profile.userName}</Name>
            <Username>@{profile.username}</Username>
            <Bio>{profile.bio}</Bio>
            <Joined>
              📅 Joined {new Date(profile.birth).toLocaleDateString()}
            </Joined>
            <FollowInfo>
              <span>{profile.following}</span> Following
              <span style={{ marginLeft: 15 }}>{profile.follower}</span> Followers
            </FollowInfo>
          </ProfileInfo>
        </ProfileSection>
        <Tabs>
          <Tab active>Posts</Tab>
          <Tab>Replies</Tab>
          <Tab>Highlights</Tab>
          <Tab>Articles</Tab>
          <Tab>Media</Tab>
          <Tab>Likes</Tab>
        </Tabs>
        <Feed>
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.tweetId}
              tweet={{
                id: tweet.tweetId,
                author: profile.userName,
                username: profile.username,
                avatar: profile.avatar,
                content: tweet.content,
                stats: {
                  replies: "-",
                  retweets: "-",
                  likes: "-",
                  views: "-",
                },
              }}
            />
          ))}
        </Feed>
      </Main>
      <RightBar>
        <SearchInput placeholder="Search" disabled />
        <Card>
          <CardTitle>You might like</CardTitle>
          {dummyWho.map((who, idx) => (
            <WhoItem key={idx}>
              <WhoAvatar src={who.avatar} alt={who.name} />
              <WhoInfo>
                <WhoName>{who.name}</WhoName>
                <WhoUsername>@{who.username}</WhoUsername>
              </WhoInfo>
              <WhoFollowBtn>Follow</WhoFollowBtn>
            </WhoItem>
          ))}
          <div
            style={{
              color: "#1da1f2",
              fontSize: 15,
              cursor: "pointer",
              marginTop: 5,
            }}
          >
            Show more
          </div>
        </Card>
        <Card>
          <CardTitle>Trends for you</CardTitle>
          {dummyTrends.map((trend, idx) => (
            <TrendItem key={idx}>
              <div style={{ fontWeight: 500 }}>{trend.title}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{trend.posts}</div>
            </TrendItem>
          ))}
        </Card>
      </RightBar>
    </Layout>
  );
}

export default ProfilePage;
