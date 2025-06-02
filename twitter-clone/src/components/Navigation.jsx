import styled from "styled-components";
import { Link } from "react-router-dom";
import { 
  FaXTwitter, FaHashtag, FaBell, FaEnvelope, FaBookmark, FaUsers, FaCrown, 
} from "react-icons/fa6";
import { FaEllipsisH, FaHome, FaListAlt, FaRegStickyNote, FaUserCircle} from "react-icons/fa";

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
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#d9d9d9")};
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
          <FaXTwitter size={75} color="#fff" />
        </div>
        <NavList>
          <NavItem isActive>
            <FaHome />
            <Link to="/" style={{ color: "#fff", fontWeight: "bold" }}>
              Home
            </Link>
          </NavItem>
          <NavItem>
            <FaHashtag />
            Explore
          </NavItem>
          <NavItem>
            <FaBell />
            Notifications
          </NavItem>
          <NavItem>
            <FaEnvelope />
            Messages
          </NavItem>
          <NavItem>
            <FaRegStickyNote />
            Grok
          </NavItem>
          <NavItem>
            <FaListAlt />
            Lists
          </NavItem>
          <NavItem>
            <FaBookmark />
            Bookmarks
          </NavItem>
          <NavItem>
            <FaUsers />
            Communities
          </NavItem>
          <NavItem>
            <FaCrown />
            Premium
          </NavItem>
          <NavItem>
            <FaUserCircle />
            <Link to="/profile" style={{ color: "#fff" }}>
              Profile
            </Link>
          </NavItem>
          <NavItem>
            <FaEllipsisH />
            More
          </NavItem>
        </NavList>
        <PostButton>Post</PostButton>
      </div>
      <UserBox>
        <Avatar>
          <FaUserCircle size={32} />
        </Avatar>
        <UserInfo>
          <UserName>김윤지</UserName>
          <UserId>@efub_5th_toy</UserId>
        </UserInfo>
        <span style={{ marginLeft: "auto", color: "#888", fontSize: "1.5rem" }}>
          <FaEllipsisH />
        </span>
      </UserBox>
    </Nav>
  );
}

export default Navigation;
