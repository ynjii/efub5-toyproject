import React, { useState } from 'react';
import styled from 'styled-components';

export default function NewTweetForm() {
  const [content, setContent] = useState('');
  return (
    <form>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Share your thoughts"
      />
      <button type="submit">Post</button>
    </form>
  );
}