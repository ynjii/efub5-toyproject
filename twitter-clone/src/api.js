const BASE_URL = 'https://api.tweeterdemo.kro.kr';

// 전체 트윗 조회
export async function fetchTweets() {
  const res = await fetch(`${BASE_URL}/tweets`);
  if (!res.ok) throw await res.json();
  return res.json();
}

// 트윗 세부 조회
export async function fetchTweetDetail(tweetId) {
  const res = await fetch(`${BASE_URL}/tweets/${tweetId}`);
  if (!res.ok) throw await res.json();
  return res.json();
}

// 트윗 등록
export async function postTweet({ userId, content }) {
  const res = await fetch(`${BASE_URL}/tweets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, content }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// 트윗 삭제
export async function deleteTweet({ tweetId, userId, password }) {
  const res = await fetch(`${BASE_URL}/tweets/${tweetId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, password }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// 사용자 상세정보 조회
export async function fetchUserDetail(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw await res.json();
  return res.json();
}