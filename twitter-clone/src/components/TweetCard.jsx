import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  FaRegComment,
  FaRetweet,
  FaRegHeart,
  FaChartBar,
  FaEllipsisH,
} from "react-icons/fa";

const Card = styled.div`
  border-bottom: 1px solid #222;
  padding: 1.2rem 1.5rem;
  display: flex;
  gap: 1rem;
  background: #000;
  cursor: pointer;
  position: relative;
`;

const MoreBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
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

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #222;
`;

const Content = styled.div`
  flex: 1;
`;

const Author = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Username = styled.span`
  color: #888;
  font-size: 0.95rem;
  font-weight: 400;
`;

const TweetText = styled.div`
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const TweetMeta = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const TweetImage = styled.img`
  width: 100%;
  max-height: 350px;
  border-radius: 1rem;
  margin-top: 0.5rem;
  object-fit: cover;
`;

const Stats = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #888;
  font-size: 0.95rem;
  margin-top: 0.7rem;
`;

const TweetActions = styled.div`
  display: flex;
  gap: 2.5rem;
  color: #888;
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
`;

function TweetCard({ tweet, onMore }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 카드 클릭 시 상세로 이동 (더보기 클릭 시에는 이동X)
  const handleCardClick = (e) => {
    // 더보기 버튼 클릭 시 이벤트 버블링 막기
    if (e.target.closest('button')) return;
    navigate(`/tweet/${tweet.id}`);
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <Avatar
          src={tweet.avatar}
          alt="avatar"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
          }}
        />
        <Content>
          <Author>
            {tweet.author}
            <Username>@{tweet.username}</Username>
          </Author>
          <TweetText>{tweet.content}</TweetText>
          <TweetMeta>Created: {tweet.createdAt}</TweetMeta>
          {tweet.image && <TweetImage src={tweet.image} alt="tweet" />}
          <Stats>
            <span><FaRegComment /> {tweet.stats.replies}</span>
            <span><FaRetweet /> {tweet.stats.retweets}</span>
            <span><FaRegHeart /> {tweet.stats.likes}</span>
            <span><FaChartBar /> {tweet.stats.views}</span>
          </Stats>
        </Content>
        <MoreBtn
          type="button"
          onClick={e => {
            e.stopPropagation();
            setShowModal(true);
          }}
          aria-label="더보기"
        >...</MoreBtn>
      </Card>
      <TweetActions>

        <MoreBtn onClick={onMore}>
          <FaEllipsisH />
        </MoreBtn>
      </TweetActions>
      {showModal && (
        <ModalBg onClick={() => setShowModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>Delete post?</div>
            <div style={{ color: '#aaa', fontSize: 15, marginBottom: 18 }}>
              This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
            </div>
            <ModalBtn red>Delete</ModalBtn>
            <ModalBtn onClick={() => setShowModal(false)}>Cancel</ModalBtn>
          </Modal>
        </ModalBg>
      )}
    </>
  );
}

export default TweetCard;