import styled from 'styled-components';

const Card = styled.div`
  background: #16181c;
  border-radius: 1.2rem;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #222;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Username = styled.div`
  color: #888;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Bio = styled.div`
  color: #ccc;
  font-size: 1rem;
`;

export default function ProfileCard({ profile }) {
  return (
    <Card>
      <Avatar src={profile.avatar} alt="avatar" />
      <Info>
        <Name>{profile.name}</Name>
        <Username>@{profile.username}</Username>
        <Bio>{profile.bio}</Bio>
      </Info>
    </Card>
  );
}