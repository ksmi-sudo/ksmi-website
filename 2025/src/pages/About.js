import { useState, useEffect } from 'react';
import './About.css';

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const response = await import('../data/about.json');
        setAboutData(response.default);
      } catch (error) {
        console.error('Error loading about data:', error);
      }
    };

    loadAboutData();
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  return (
    <div className="about">
      {/* 인사말 */}
      <section className="greeting">
        <h2>인사말</h2>
        <div className="president-message">
          <div className="president-info">
            <img src={aboutData.greeting.presidentImage} alt="학회장" className="president-photo" />
            <h3>학회장 {aboutData.greeting.presidentName}</h3>
          </div>
          <div className="message-content">
            {aboutData.greeting.message.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 학회 연혁 */}
      <section className="history">
        <h2>학회 연혁</h2>
        <div className="timeline">
          {aboutData.history.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="year">{item.year}</div>
              <div className="event">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 학회 활동 소개 */}
      <section className="activities">
        <h2>학회 활동 소개</h2>
        <div className="activities-grid">
          {aboutData.activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </section>
{/* 
      <section className="organization">
        <h2>조직도</h2>
        <div className="org-chart">
        </div>
      </section> */}
    </div>
  );
}

export default About; 