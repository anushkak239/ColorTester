import React, { useState } from 'react';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import './ColorTester.css'; // Create this CSS file

const brandColors = {
  primary: { red: '#FF0000', deepNavy: '#003DA5' },
  secondary: { lightBlue: '#72B5E8', gray: '#54585A' },
  accent: { yellow: '#FFB612', green: '#158B45' },
};

const ColorTester = () => {
  const [image, setImage] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [accessibilityIssues, setAccessibilityIssues] = useState([]);

  // Handle image upload and color extraction
  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 5); // Extract 5 dominant colors
        const colors = palette.map((color) => chroma(color).hex());
        setExtractedColors(colors);
        analyzeColors(colors);
      };
    }
  };

  // Find the closest brand color using Delta E
  const findClosestBrandColor = (color) => {
    let closest = { color: '', deltaE: Infinity };
    for (const category in brandColors) {
      for (const brandColor in brandColors[category]) {
        const deltaE = chroma.deltaE(color, brandColors[category][brandColor]);
        if (deltaE < closest.deltaE) {
          closest = { color: brandColors[category][brandColor], deltaE };
        }
      }
    }
    return closest.color;
  };

  // Analyze extracted colors for brand compliance
  const analyzeColors = (colors) => {
    const complianceResults = colors.map((color) => {
      for (const category in brandColors) {
        for (const brandColor in brandColors[category]) {
          const deltaE = chroma.deltaE(color, brandColors[category][brandColor]);
          if (deltaE < 10) return { matches: true };
        }
      }
      const closest = findClosestBrandColor(color);
      return { matches: false, closest };
    });
    setCompliance(complianceResults);

    const issues = checkContrast(colors);
    setAccessibilityIssues(issues);
  };

  // Check contrast ratios for accessibility compliance
  const checkContrast = (colors) => {
    const issues = [];
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const contrast = chroma.contrast(colors[i], colors[j]);
        if (contrast < 4.5) {
          issues.push({
            combination: `${colors[i]} on ${colors[j]}`,
            contrastRatio: contrast.toFixed(2),
            requirement: 'AA',
            colorblindImpact: checkColorblindContrast(colors[i], colors[j]),
          });
        }
      }
    }
    return issues;
  };

  // Simulate colorblindness by adjusting RGB values
  const simulateColorblindness = (color, type) => {
    const [r, g, b] = chroma(color).rgb();
    switch (type) {
      case 'protanopia': // Red-blind
        return chroma([0.567 * r + 0.433 * g, 0.558 * r + 0.442 * g, b]);
      case 'deuteranopia': // Green-blind
        return chroma([0.625 * r + 0.375 * g, 0.7 * r + 0.3 * g, b]);
      case 'tritanopia': // Blue-blind
        return chroma([r, 0.95 * g + 0.05 * b, 0.433 * g + 0.567 * b]);
      default:
        return chroma(color);
    }
  };

  // Check contrast for colorblindness types
  const checkColorblindContrast = (color1, color2) => {
    const types = ['protanopia', 'deuteranopia', 'tritanopia'];
    return types.map((type) => {
      const c1Blind = simulateColorblindness(color1, type);
      const c2Blind = simulateColorblindness(color2, type);
      const contrast = chroma.contrast(c1Blind, c2Blind);
      return contrast < 4.5 ? `${type}: Low contrast` : null;
    }).filter(Boolean);
  };
  // ... [keep all the existing state and logic] ...


  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🎨 Color Analyzer Pro</h1>
        <p className="subtitle">Upload an image to analyze brand compliance & accessibility</p>
        
        <div className="upload-section">
          <label className="upload-btn">
            📁 Upload Image
            <input type="file" accept="image/*" onChange={handleUpload} hidden />
          </label>
          <p className="supported-formats">Supports: JPG, PNG, WEBP</p>
        </div>
      </header>

      {image && (
        <section className="image-preview">
          <h2 className="section-title">Uploaded Preview</h2>
          <div className="image-wrapper">
            <img src={URL.createObjectURL(image)} alt="Uploaded" />
          </div>
        </section>
      )}

      {extractedColors.length > 0 && (
        <main className="results">
          <section className="color-palette">
            <h2 className="section-title">Extracted Color Palette</h2>
            <div className="color-grid">
              {extractedColors.map((color, idx) => (
                <div key={idx} className="color-card">
                  <div 
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    title={`Hex: ${color}`}
                  >
                    <span className="color-hex">{color}</span>
                  </div>
                  <div className={`compliance-tag ${compliance[idx].matches ? 'matched' : 'suggestion'}`}>
                    {compliance[idx].matches ? (
                      <>✅ Brand Match</>
                    ) : (
                      <>🔍 Closest: {compliance[idx].closest}</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="accessibility-report">
            <h2 className="section-title">Accessibility Report</h2>
            {accessibilityIssues.length > 0 ? (
              <div className="issues-list">
                {accessibilityIssues.map((issue, idx) => (
                  <div key={idx} className="issue-card warning">
                    <div className="issue-header">
                      <span className="warning-icon">⚠️</span>
                      <h3>Low Contrast Combination</h3>
                      <span className="contrast-ratio">
                        {issue.contrastRatio}:1 (AA Required: 4.5:1)
                      </span>
                    </div>
                    <div className="color-combo">
                      <span 
                        className="color-dot" 
                        style={{ backgroundColor: issue.combination.split(' on ')[0] }}
                      />
                      <span className="on-text">on</span>
                      <span 
                        className="color-dot" 
                        style={{ backgroundColor: issue.combination.split(' on ')[1] }}
                      />
                    </div>
                    {issue.colorblindImpact.length > 0 && (
                      <div className="colorblind-impact">
                        <h4>Colorblind Impact:</h4>
                        <div className="impact-tags">
                          {issue.colorblindImpact.map((impact, i) => (
                            <span key={i} className="impact-tag">
                              {impact}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="success-message">
                🎉 Excellent! No accessibility issues found
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
};

export default ColorTester;