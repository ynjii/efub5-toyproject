import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Nav = styled.nav`
  width: 260px;
  background: #000;
  color: #fff;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1.5rem 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0 0 0 1.5rem;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? "#fff" : "#d9d9d9")};
`;

const PostButton = styled.button`
  width: 90%;
  margin: 1.5rem auto 0 auto;
  display: block;
  background: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 0;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1a8cd8;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.2rem 1.5rem 0.5rem 1.5rem;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.05rem;
`;

const UserId = styled.div`
  color: #888;
  font-size: 0.95rem;
`;

function Navigation() {
  return (
    <Nav>
      <div>
        <div style={{ margin: "0 0 2rem 1.5rem" }}>
          <img src={logo} alt="logo" style={{ width: 75, height: 75 }} />
        </div>
        <NavList>
          <NavItem active>
            <span>🏠</span>
            <Link to="/" style={{ color: "#fff", fontWeight: "bold" }}>
              Home
            </Link>
          </NavItem>
          <NavItem>
            <span>🔍</span>Explore
          </NavItem>
          <NavItem>
            <span>🔔</span>Notifications
          </NavItem>
          <NavItem>
            <span>✉️</span>Messages
          </NavItem>
          <NavItem>
            <span>📝</span>Grok
          </NavItem>
          <NavItem>
            <span>📋</span>Lists
          </NavItem>
          <NavItem>
            <span>🔖</span>Bookmarks
          </NavItem>
          <NavItem>
            <span>👥</span>Communities
          </NavItem>
          <NavItem>
            <span>❌</span>Premium
          </NavItem>
          <NavItem>
            <span>👤</span>
            <Link to="/profile" style={{ color: "#fff" }}>
              Profile
            </Link>
          </NavItem>
          <NavItem>
            <span>😊</span>More
          </NavItem>
        </NavList>
        <PostButton>Post</PostButton>
      </div>
      <UserBox>
        <Avatar>🧑‍💻</Avatar>
        <UserInfo>
          <UserName>김윤지</UserName>
          <UserId>@efub_5th_toy</UserId>
        </UserInfo>
        <span style={{ marginLeft: "auto", color: "#888", fontSize: "1.5rem" }}>
          ...
        </span>
      </UserBox>
    </Nav>
  );
}

export default Navigation;
