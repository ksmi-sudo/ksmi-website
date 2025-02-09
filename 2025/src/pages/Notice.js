import { useState, useEffect } from 'react';
import './Notice.css';

function Notice() {
  const [noticeData, setNoticeData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const loadNoticeData = async () => {
      try {
        const response = await import('../data/notice.json');
        setNoticeData(response.default);
      } catch (error) {
        console.error('Error loading notice data:', error);
      }
    };

    loadNoticeData();
  }, []);

  if (!noticeData) return <div>Loading...</div>;

  const filteredNotices = noticeData.notices.filter(notice => 
    selectedCategory === 'all' || notice.category === selectedCategory
  );

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleBack = () => {
    setSelectedNotice(null);
  };

  if (selectedNotice) {
    return (
      <div className="notice">
        <div className="notice-detail">
          <button className="back-button" onClick={handleBack}>← 목록으로</button>
          <div className="notice-detail-header">
            <h1>{selectedNotice.title}</h1>
            <div className="notice-meta">
              <span className="date">{selectedNotice.date}</span>
              <span className="category-tag">
                {noticeData.categories.find(cat => cat.id === selectedNotice.category)?.name}
              </span>
            </div>
          </div>
          <div className="notice-detail-content">
            {selectedNotice.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notice">
      <h1>공지사항</h1>
      
      {/* 카테고리 필터 */}
      <div className="category-filter">
        {noticeData.categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 공지사항 목록 */}
      <div className="notice-table">
        <div className="notice-table-header">
          <span className="col-category">분류</span>
          <span className="col-title">제목</span>
          <span className="col-date">등록일</span>
        </div>
        {filteredNotices.map(notice => (
          <div 
            key={notice.id} 
            className={`notice-table-row ${notice.important ? 'important' : ''}`}
            onClick={() => handleNoticeClick(notice)}
          >
            <span className="col-category">
              {noticeData.categories.find(cat => cat.id === notice.category)?.name}
            </span>
            <span className="col-title">
              {notice.important && <span className="important-badge">중요</span>}
              {notice.title}
            </span>
            <span className="col-date">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notice; 