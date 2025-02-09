import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>한국음악정보학회</h3>
          <p>주소: 서울특별시 OO구 OO로 123</p>
          <p>전화: 02-123-4567</p>
          <p>이메일: info@kmis.or.kr</p>
        </div>
        <div className="footer-section">
          <h3>빠른 링크</h3>
          <ul>
            <li><a href="/about">학회소개</a></li>
            <li><a href="/notice">공지사항</a></li>
            <li><a href="/seminars">학술세미나</a></li>
            <li><a href="/contact">연락처</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 한국음악정보학회. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 