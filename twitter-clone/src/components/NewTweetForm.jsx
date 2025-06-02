import React, { useState } from 'react';
import { postTweet } from '../api';

export default function NewTweetForm({ onPost }) {
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      // userId는 실제 로그인된 유저의 id로 교체 필요
      const newTweet = await postTweet({ userId: 1, content });
      setContent('');
      if (onPost) onPost(newTweet);
    } catch (err) {
      alert(err.message || "트윗 등록 실패");
    }
    setPosting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Share your thoughts"
        disabled={posting}
      />
      <button type="submit" disabled={posting || !content.trim()}>
        {posting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}