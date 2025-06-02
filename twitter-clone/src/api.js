const BASE_URL = '/api';

// 전체 트윗 조회
export async function fetchTweets() {
  const res = await fetch(`${BASE_URL}/tweets`);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  console.log("전체 트윗 데이터:", data); // 디버깅용
  return data;
}

// 트윗 세부 조회
export async function fetchTweetDetail(tweetId) {
  const res = await fetch(`${BASE_URL}/tweets/${tweetId}`);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  console.log("트윗 상세 데이터:", data); // 디버깅용
  return data;
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
  console.log("DELETE 요청 URL:", `/api/tweets/${tweetId}`);
  console.log("요청 본문:", { userId, password });
  const res = await fetch(`/api/tweets/${tweetId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, password }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("삭제 요청 실패:", errorData); // 디버깅용
    throw new Error(errorData.message || "트윗 삭제 실패");
  }
  return res.json();
}

// 사용자 상세정보 조회
export async function fetchUserDetail(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "사용자 정보를 불러오지 못했습니다.");
    }
    const data = await response.json();
    return data; // API 응답 데이터를 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}