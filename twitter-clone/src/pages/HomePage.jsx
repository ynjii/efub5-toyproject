import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchTweets, postTweet } from "../api";
import TweetCard from "../components/TweetCard";

const NAV_WIDTH = 300;
const RIGHTBAR_WIDTH = 350;

const Layout = styled.div`
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 1250px;
  min-height: 100vh;
  position: center;
  z-index: 1;
  margin-left: ${NAV_WIDTH}px;
  margin-right: ${RIGHTBAR_WIDTH}px;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  background: #000;
  margin-top: 0;
  margin-bottom: 0;
`;

const Header = styled.div`
  padding: 1.2rem 1.5rem 0.5rem 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid #222;
  background: #000;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TweetForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-bottom: 1px solid #222;
  background: #000;
`;

const TweetInputRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #222;
  margin-right: 1rem;
`;

const TweetTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  resize: none;
  outline: none;
  min-height: 60px;
`;

const TweetActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.7rem;
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 1rem;
  color: #1da1f2;
  font-size: 1.2rem;
`;

const PostButton = styled.button`
  background: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1a8cd8;
  }
`;

const Feed = styled.div`
  background: #000;
`;

const RightBar = styled.aside`
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

const TrendItem = styled.div`
  margin-bottom: 0.7rem;
  font-size: 0.98rem;
`;

const dummyTweets = [
  {
    id: 1,
    author: "Elon Musk",
    username: "elonmusk",
    avatar:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    content: `Just to reiterate: Tesla will spend well over $500M expanding our Supercharger network to create thousands of NEW chargers this year.

That’s just on new sites and expansions, not counting operations costs, which are much higher.`,
    image: null,
    stats: { replies: "3.8K", retweets: "7.9K", likes: "64K", views: "25M" },
  },
  {
    id: 2,
    author: "Elon Musk",
    username: "elonmusk",
    avatar:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    content: `What Earth looks like in radio frequency from the @Starlink direct to phone satellites`,
    image: "https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg",
    stats: { replies: "4.7K", retweets: "8.2K", likes: "98K", views: "29M" },
  },
];

const dummyTrends = [
  { title: "싱크로유", posts: "12.7K posts" },
  { title: "#스트레이키즈", posts: "223K posts" },
  { title: "티켓 앙도", posts: "3,871 posts" },
  { title: "#윤두준", posts: "8,094 posts" },
  { title: "도경수 노래", posts: "" },
  { title: "#아미들_남준이에게_돌아갈_걸심", posts: "111K posts" },
  { title: "#규현더", posts: "" },
];

function HomePage() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // 트윗 목록 불러오기
  useEffect(() => {
    fetchTweets()
      .then((data) => setTweets(data.tweets))
      .catch((err) => alert(err.message || "트윗을 불러올 수 없습니다."))
      .finally(() => setLoading(false));
  }, []);

  // 트윗 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      // userId는 실제 로그인된 유저의 id로 교체 필요
      const newTweet = await postTweet({ userId: 3, content });
      setTweets((prev) => [newTweet, ...prev]);
      setContent("");
    } catch (err) {
      alert(err.message || "트윗 등록 실패");
    }
    setPosting(false);
  };

  return (
    <Layout>
      <Main>
        <Header>
          <span
            style={{
              borderBottom: "3px solid #1da1f2",
              paddingBottom: 6,
              marginRight: 20,
            }}
          >
            For you
          </span>
          <span style={{ color: "#888", fontWeight: 400 }}>Following</span>
        </Header>
        <TweetForm onSubmit={handleSubmit}>
          <TweetInputRow>
            <Avatar />
            <TweetTextarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="무슨 일이 일어나고 있나요?"
              disabled={posting}
            />
          </TweetInputRow>
          <TweetActions>
            <ActionIcons>
              <span>📷</span>
              <span>🎬</span>
              <span>😊</span>
              <span>📅</span>
              <span>📍</span>
              <span>⚙️</span>
            </ActionIcons>
            <PostButton type="submit" disabled={posting || !content.trim()}>
              {posting ? "Posting..." : "Post"}
            </PostButton>
          </TweetActions>
        </TweetForm>
        {loading ? (
          <div style={{ color: "#fff", padding: 20 }}>로딩중...</div>
        ) : (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.tweetId}
              tweet={{
                id: tweet.tweetId,
                author: tweet.userName,
                username: tweet.userName,
                avatar:
                  "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
                content: tweet.content,
                image: null,
                stats: {
                  replies: "-",
                  retweets: "-",
                  likes: "-",
                  views: "-",
                },
                createdAt: tweet.createdAt,
              }}
            />
          ))
        )}
      </Main>
      <RightBar>
        <SearchInput placeholder="Search" disabled />
        <Card>
          <CardTitle>Subscribe to Premium</CardTitle>
          <div style={{ fontSize: 15, marginBottom: 10 }}>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </div>
          <PostButton style={{ width: "100%" }}>Subscribe</PostButton>
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

export default HomePage;