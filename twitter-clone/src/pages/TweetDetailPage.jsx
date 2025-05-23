import styled from 'styled-components';

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

const dummyTweet = {
  id: 1,
  author: 'Elon Musk',
  username: 'elonmusk',
  avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
  content: '상세 트윗 내용입니다.',
};

const dummyReplies = [
  { id: 1, author: '김철수', content: '댓글 1' },
  { id: 2, author: '이영희', content: '댓글 2' },
];

function TweetDetailPage() {
  return (
    <Layout>
      <Main>
        <div style={{ padding: '2rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{dummyTweet.author} @{dummyTweet.username}</div>
          <div style={{ margin: '1rem 0' }}>{dummyTweet.content}</div>
          <hr style={{ border: '1px solid #222' }} />
          <h3 style={{ margin: '1.5rem 0 1rem 0' }}>댓글</h3>
          {dummyReplies.map(reply => (
            <div key={reply.id} style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
              <b>{reply.author}</b>: {reply.content}
            </div>
          ))}
        </div>
      </Main>
    </Layout>
  );
}

export default TweetDetailPage;