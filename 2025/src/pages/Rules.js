import { useState, useEffect } from 'react';
import './Rules.css';

function Rules() {
  const [rulesData, setRulesData] = useState(null);

  useEffect(() => {
    const loadRulesData = async () => {
      try {
        const response = await import('../data/rules.json');
        setRulesData(response.default);
      } catch (error) {
        console.error('Error loading rules data:', error);
      }
    };

    loadRulesData();
  }, []);

  if (!rulesData) return <div>Loading...</div>;

  return (
    <div className="rules">
      {/* 정관 */}
      <section className="statutes">
        <h2>정관</h2>
        <div className="rules-content">
          {rulesData.statutes.map((chapter, index) => (
            <article key={index} className="rule-section">
              <h3>{chapter.chapter}</h3>
              <div className="rule-items">
                {chapter.articles.map((article, aIndex) => (
                  <div key={aIndex} className="rule-item">
                    <h4>{article.number} ({article.title})</h4>
                    <p>{article.content}</p>
                    {article.items && (
                      <ol>
                        {article.items.map((item, iIndex) => (
                          <li key={iIndex}>{iIndex+1}. {item}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 개정 이력 */}
      <section className="revision-history">
        <h2>개정 이력</h2>
        <div className="history-list">
          {rulesData.revisionHistory.map((revision, index) => (
            <div key={index} className="history-item">
              <div className="date">{revision.date}</div>
              <div className="description">
                <h4>{revision.version}</h4>
                <ul>
                  {revision.changes.map((change, cIndex) => (
                    <li key={cIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Rules; 