import { useState, useEffect } from 'react';
import './Seminars.css';

function Seminars() {
  const [seminarsData, setSeminarsData] = useState(null);

  useEffect(() => {
    // JSON 파일 로드
    const loadSeminarsData = async () => {
      try {
        const response = await import('../data/seminars.json');
        setSeminarsData(response.default);
      } catch (error) {
        console.error('Error loading seminars data:', error);
      }
    };

    loadSeminarsData();
  }, []);

  if (!seminarsData) return <div>Loading...</div>;

  return (
    <div className="seminars">
      {/* 다가오는 세미나 */}
      <section className="upcoming-seminars">
        <h2>다가오는 세미나</h2>
        {seminarsData.upcomingSeminars.map(seminar => (
          <div key={seminar.id} className="seminar-card featured">
            <div className="seminar-date">{seminar.date}</div>
            <h3>{seminar.title}</h3>
            <p className="location">{seminar.location}</p>
            <div className="seminar-details">
              <p>주제: {seminar.topic}</p>
              <button className="register-btn">등록하기</button>
            </div>
          </div>
        ))}
      </section>

      {/* 세미나 신청 */}
      <section className="seminar-submission">
        <h2>발표 신청</h2>
        <div className="submission-info">
          <h3>발표 신청 안내</h3>
          <p>다음 학술대회 발표를 희망하시는 분들은 아래 양식을 작성해 주시기 바랍니다.</p>
          <button className="submit-btn">발표 신청하기</button>
        </div>
      </section>

      {/* 지난 세미나 자료 */}
      <section className="past-seminars">
        <h2>지난 세미나 자료</h2>
        <div className="archive-list">
          {seminarsData.pastSeminars.map(seminar => (
            <div key={seminar.id} className="archive-item">
              <h3>{seminar.title}</h3>
              <p className="date">{seminar.date}</p>
              <div className="materials">
                <a href={seminar.materials.presentation} className="material-link">발표자료 다운로드</a>
                <a href={seminar.materials.video} className="material-link">영상보기</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 워크숍 */}
      <section className="workshops">
        <h2>워크숍 / 튜토리얼</h2>
        <div className="workshop-list">
          {seminarsData.workshops.map(workshop => (
            <div key={workshop.id} className="workshop-card">
              <h3>{workshop.title}</h3>
              <p className="date">{workshop.date}</p>
              <p className="description">{workshop.description}</p>
              <button className="register-btn">상세정보</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Seminars; 