import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTweetDetail, deleteTweet } from "../api";

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
  margin-left: ${NAV_WIDTH}px;
  margin-right: ${RIGHTBAR_WIDTH}px;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  background: #000;
`;

const Header = styled.div`
  padding: 1.2rem 1.5rem 0.7rem 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid #222;
  background: #000;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TweetCard = styled.div`
  position: relative;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #222;
  background: #000;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #222;
  margin-right: 1rem;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Username = styled.span`
  color: #888;
  font-size: 1rem;
  font-weight: 400;
`;

const MoreBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
`;

const TweetContent = styled.div`
  margin: 0.7rem 0 0.5rem 0;
  font-size: 1.15rem;
`;

const TweetMeta = styled.div`
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 0.7rem;
`;

const TweetActions = styled.div`
  display: flex;
  gap: 2.5rem;
  color: #888;
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
`;

const ReplyBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #222;
  background: #000;
`;

const ReplyInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.05rem;
  outline: none;
  margin-left: 1rem;
`;

const ReplyButton = styled.button`
  background: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  font-size: 1rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1a8cd8;
  }
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

const ModalBg = styled.div`
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
`;

const Modal = styled.div`
  background: #111;
  color: #fff;
  border-radius: 1.2rem;
  padding: 2rem 2.5rem;
  min-width: 320px;
  text-align: center;
`;

const ModalBtn = styled.button`
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.8rem 0;
  border-radius: 999px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  background: ${({ red }) => (red ? '#f4212e' : '#222')};
  color: ${({ red }) => (red ? '#fff' : '#fff')};
  &:hover { opacity: 0.9; }
`;

const dummyTrends = [
  { title: "싱크로유", posts: "12.7K posts" },
  { title: "#스트레이키즈", posts: "223K posts" },
  { title: "티켓 양도", posts: "3,871 posts" },
  { title: "#윤두준", posts: "8,094 posts" },
  { title: "도경수 노래", posts: "" },
  { title: "#아미들_남준이에게_돌아갈_결심", posts: "111K posts" },
  { title: "#규현", posts: "" },
];

function TweetDetailPage() {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // showModal 상태 추가

  useEffect(() => {
    fetchTweetDetail(id)
      .then(setTweet)
      .catch((err) => alert(err.message || "트윗을 불러올 수 없습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTweet({ tweetId: id, userId: 3, password: "your_password" });
      alert("트윗이 삭제되었습니다.");
      window.location.href = "/";
    } catch (err) {
      alert(err.message || "트윗 삭제 실패");
    }
  };

  if (loading) return <div style={{ color: "#fff", padding: 20 }}>로딩중...</div>;
  if (!tweet) return <div style={{ color: "#fff", padding: 20 }}>트윗 없음</div>;

  return (
    <Layout>
      <Main>
        <Header>Tweet</Header>
        <TweetCard>
          <AuthorRow>
            <Avatar src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" />
            <div>{tweet.userName}</div>
            <Username>@{tweet.userName}</Username>
          </AuthorRow>
          <TweetContent>{tweet.content}</TweetContent>
          <TweetMeta>
            Created: {new Date(tweet.createdAt).toLocaleString()}
            <br />
            Modified: {new Date(tweet.modifiedAt).toLocaleString()}
          </TweetMeta>
          <TweetActions>
            <button
              onClick={() => setShowModal(true)} // 모달 표시
              style={{ color: "red", cursor: "pointer" }}
            >
              삭제
            </button>
          </TweetActions>
        </TweetCard>
      </Main>
      <RightBar>
        <SearchInput placeholder="Search" disabled />
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
      {showModal && (
        <ModalBg onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 12 }}>
              Delete post?
            </div>
            <div style={{ color: "#aaa", fontSize: 15, marginBottom: 18 }}>
              This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
            </div>
            <ModalBtn red onClick={handleDelete}>Delete</ModalBtn>
            <ModalBtn onClick={() => setShowModal(false)}>Cancel</ModalBtn>
          </Modal>
        </ModalBg>
      )}
    </Layout>
  );
}

export default TweetDetailPage;