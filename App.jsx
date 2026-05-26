import { useState } from "react";

export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="app-container">
      {/* Встроенные премиум-стили */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #050505;
          color: #a3a3a3;
          overflow-x: hidden;
          letter-spacing: -0.01em;
        }

        .app-container {
          background-color: #050505;
          min-height: 100vh;
          padding-bottom: 40px;
        }

        /* Навигация */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          background: rgba(5, 5, 5, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px 0;
        }

        .nav-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          color: #fff;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.03em;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        @media (max-width: 600px) {
          .nav-links { display: none; }
        }

        .nav-links a {
          color: #8e8e93;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: #fff;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          padding: 10px 20px;
          border-radius: 99px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .btn-primary:hover {
          background: #e5e5ea;
          transform: translateY(-1px);
        }

        /* Главный экран */
        .hero {
          position: relative;
          padding: 180px 24px 100px 24px;
          text-align: center;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%);
          pointer-events: none;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: 99px;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 32px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #34c759;
          border-radius: 50%;
          box-shadow: 0 0 10px #34c759;
        }

        .hero h1 {
          color: #fff;
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 36px; }
        }

        .hero p {
          color: #8e8e93;
          font-size: 19px;
          line-height: 1.5;
          max-width: 640px;
          margin: 0 auto 40px auto;
          font-weight: 400;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 64px;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          padding: 14px 28px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .btn-link {
          color: #636366;
          padding: 14px 28px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .btn-link:hover {
          color: #aeaeb2;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 40px;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .stats-row { gap: 24px; }
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-num {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .stat-label {
          color: #48484a;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        /* Секции общие */
        .section {
          padding: 100px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-subtitle {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #636366;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .section-title {
          color: #fff;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        /* Сетка Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          border-color: rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          transform: translateY(-2px);
        }

        .feature-icon {
          color: #fff;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .feature-card h3 {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feature-card p {
          color: #636366;
          font-size: 14px;
          line-height: 1.5;
        }

        /* Цены */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
        }

        .price-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        .price-card.popular {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.02);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          color: #000;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-card h3 {
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .price-amount {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 32px;
        }

        .price-num {
          color: #fff;
          font-size: 44px;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .price-currency {
          color: #8e8e93;
          font-size: 14px;
          font-weight: 500;
        }

        .price-features {
          list-style: none;
          margin-bottom: 40px;
          flex-grow: 1;
        }

        .price-features li {
          font-size: 14px;
          color: #8e8e93;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .price-features li::before {
          content: '✓';
          color: #fff;
          font-size: 12px;
        }

        .btn-pricing {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          text-align: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .price-card.popular .btn-pricing {
          background: #fff;
          color: #000;
        }

        .price-card.popular .btn-pricing:hover {
          background: #e5e5ea;
        }

        .price-card:not(.popular) .btn-pricing {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .price-card:not(.popular) .btn-pricing:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        /* FAQ */
        .faq-list {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          border: 1px solid rgba(255, 255, 255, 0.04);
          background: rgba(255, 255, 255, 0.01);
          border-radius: 16px;
          overflow: hidden;
        }

        .faq-trigger {
          width: 100%;
          padding: 24px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-trigger:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        .faq-content {
          padding: 0 24px 24px 24px;
          color: #636366;
          font-size: 14px;
          line-height: 1.6;
        }

        .arrow {
          transition: transform 0.2s ease;
          color: #48484a;
        }

        /* Футер */
        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding: 60px 24px;
          margin-top: 60px;
        }

        .footer-content {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
        }

        .footer-text {
          font-size: 12px;
          color: #3a3a3c;
          line-height: 1.6;
        }
      `}</style>

      {/* Навигационная панель */}
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">AFFOW</span>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="https://t.me/antiscamprjectbot" className="btn-primary">Get Started</a>
        </div>
      </nav>

      {/* Hero Раздел */}
      <header className="hero">
        <div className="badge">
          <span className="badge-dot" />
          v2.4.0 Early Access
        </div>
        <h1>Будущее соревновательной<br />оптимизации Brawl Stars</h1>
        <p>
          Продвинутые интеллектуальные модули внешней визуализации данных, разработанные для глубокого анализа игрового процесса и калибровки отклика.
        </p>
        
        <div className="hero-buttons">
          <a href="https://t.me/enuau" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
            Community
          </a>
          <a href="#features" className="btn-link">Learn More →</a>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-num">5000+</span>
            <span className="stat-label">Downloads</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">2940</span>
            <span className="stat-label">Live Sessions</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>
      </header>

      {/* Раздел Features (Функции) */}
      <section id="features" className="section">
        <div className="section-header">
          <span className="section-subtitle">Capabilities</span>
          <h2 className="section-title">Интеллектуальные модули системы</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Auto Dodge</h3>
            <p>Высокоточный алгоритм расчета векторов движения для плавного уклонения от летящих объектов в автоматическом режиме.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Aim Bot & Assist</h3>
            <p>Умная корректировка векторов наведения с упреждением траектории движения цели для идеального позиционирования атаки.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Xray Vision</h3>
            <p>Внешнее графическое наложение, отображающее контуры объектов в слепых зонах и зонах растительности.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Combat Aura</h3>
            <p>Автоматическая координация ближнего боя, позволяющая оптимизировать тайминги без необходимости ручного контроля.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Hide Gadget</h3>
            <p>Оптимизация сетевых пакетов анимации для маскировки момента активации ключевых способностей (например, динамита).</p>
          </div>
          <div className
