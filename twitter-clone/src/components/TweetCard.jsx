import styled from 'styled-components';

const Card = styled.div`
  border-bottom: 1px solid #222;
  padding: 1.2rem 1.5rem;
  display: flex;
  gap: 1rem;
  background: #000;
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

function TweetCard({ tweet }) {
  return (
    <Card>
      <Avatar src={tweet.avatar} alt="avatar" />
      <Content>
        <Author>
          {tweet.author}
          <Username>{tweet.username}</Username>
        </Author>
        <TweetText>{tweet.content}</TweetText>
        {tweet.image && <TweetImage src={tweet.image} alt="tweet" />}
        <Stats>
          <span>💬 {tweet.stats.replies}</span>
          <span>🔁 {tweet.stats.retweets}</span>
          <span>❤️ {tweet.stats.likes}</span>
          <span>👁️ {tweet.stats.views}</span>
        </Stats>
      </Content>
    </Card>
  );
}

export default TweetCard;