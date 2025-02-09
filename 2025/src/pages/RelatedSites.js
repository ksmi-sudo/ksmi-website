import { useState, useEffect } from 'react';
import './RelatedSites.css';

function RelatedSites() {
  const [sitesData, setSitesData] = useState(null);

  useEffect(() => {
    const loadSitesData = async () => {
      try {
        const response = await import('../data/relatedSites.json');
        setSitesData(response.default);
      } catch (error) {
        console.error('Error loading related sites data:', error);
      }
    };

    loadSitesData();
  }, []);

  if (!sitesData) return <div>Loading...</div>;

  return (
    <div className="related-sites">
      {/* 국내 학회 */}
      <section className="academic-societies">
        <h2>유관 학회 및 단체</h2>
        <div className="sites-grid">
          <div className="site-card">
            <h3>국내 학회</h3>
            <ul>
              {sitesData.academicSocieties.domestic.map((society, index) => (
                <li key={index}>
                  <a href={society.url} target="_blank" rel="noopener noreferrer">
                    {society.name}
                  </a>
                  <p>{society.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-card">
            <h3>국제 학회</h3>
            <ul>
              {sitesData.academicSocieties.international.map((society, index) => (
                <li key={index}>
                  <a href={society.url} target="_blank" rel="noopener noreferrer">
                    {society.name}
                  </a>
                  <p>{society.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 정부 및 연구기관 */}
      <section className="government-research">
        <h2>정부 및 연구기관</h2>
        <div className="sites-grid">
          {Object.entries(sitesData.governmentAndResearch).map(([category, items]) => (
            <div key={category} className="site-card">
              <h3>{category === 'government' ? '정부기관' : '연구기관'}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 학술 정보 사이트 */}
      <section className="academic-resources">
        <h2>학술 정보 사이트</h2>
        <div className="sites-grid">
          {Object.entries(sitesData.academicResources).map(([category, items]) => (
            <div key={category} className="site-card">
              <h3>{category === 'databases' ? '학술 데이터베이스' : '음악 데이터베이스'}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RelatedSites; 