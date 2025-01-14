import React, { useState } from 'react';

const GBPSignalChecker = () => {
  const [businessName, setBusinessName] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [description, setDescription] = useState('');
  const [attributes, setAttributes] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const analyzeBusiness = () => {
    setShowResults(true);
  };

  const getNameScore = () => {
    let score = 0;
    if (businessName) {
      if (businessName.length > 10) score += 1;
      if (!/\d/.test(businessName)) score += 1;
      if (!/best|cheap|top|#1/i.test(businessName)) score += 1;
    }
    return score;
  };

  const getCategoryScore = () => {
    let score = 0;
    if (primaryCategory) {
      if (primaryCategory.length > 5) score += 1;
      if (!/general|misc/i.test(primaryCategory)) score += 1;
      if (primaryCategory.includes(' ')) score += 1;
    }
    return score;
  };

  const getDescriptionScore = () => {
    let score = 0;
    if (description) {
      if (description.length > 100) score += 1;
      if (description.includes('ideal') || description.includes('perfect')) score += 1;
      if (/\$|\d{3,}/.test(description)) score += 1;
    }
    return score;
  };

  const getAttributesScore = () => {
    let score = 0;
    if (attributes) {
      if (attributes.length > 20) score += 1;
      if (attributes.includes(',')) score += 1;
      if (/appointment|schedule|book/i.test(attributes)) score += 1;
    }
    return score;
  };

  const getTotalScore = () => {
    return getNameScore() + getCategoryScore() + getDescriptionScore() + getAttributesScore();
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return '#22c55e'; // green
    if (percentage >= 50) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>GBP Signal Checker</h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          Analyze your Google Business Profile for hidden qualification signals that might be attracting the wrong leads.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Business Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name as it appears on GBP"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Primary Category</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              value={primaryCategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
              placeholder="Your main GBP category"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Business Description</label>
            <textarea
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your current GBP description"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Service Attributes</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              value={attributes}
              onChange={(e) => setAttributes(e.target.value)}
              placeholder="Comma-separated list of your attributes"
            />
          </div>
          
          <button
            onClick={analyzeBusiness}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#000080',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Analyze Signals
          </button>
        </div>
      </div>

      {showResults && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Signal Analysis Results</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
              <span>Business Name Signals</span>
              <span style={{ color: getScoreColor(getNameScore(), 3) }}>{getNameScore()}/3</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
              <span>Category Signals</span>
              <span style={{ color: getScoreColor(getCategoryScore(), 3) }}>{getCategoryScore()}/3</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
              <span>Description Signals</span>
              <span style={{ color: getScoreColor(getDescriptionScore(), 3) }}>{getDescriptionScore()}/3</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
              <span>Attribute Signals</span>
              <span style={{ color: getScoreColor(getAttributesScore(), 3) }}>{getAttributesScore()}/3</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', marginTop: '24px' }}>
              <span style={{ fontWeight: '600' }}>Overall Signal Strength</span>
              <span style={{ fontWeight: 'bold', color: getScoreColor(getTotalScore(), 12) }}>
                {getTotalScore()}/12
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GBPSignalChecker;