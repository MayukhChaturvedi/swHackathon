import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Add your JavaScript code here (the one from the bottom of your HTML)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observe elements (with appropriate selectors for React components)
    document.querySelectorAll('.feature-card, .section-title h2, .section-title p, .adaptive-point, .adaptive-title, .adaptive-description, .cta-title, .cta-text, .cta-btn').forEach(element => {
      observer.observe(element);
    });
    
    // Add scroll event listener for parallax effects
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Parallax for hero section
      const heroElements = document.querySelector('.hero');
      if (heroElements) {
        heroElements.style.backgroundPosition = `50% ${scrollPosition * 0.05}px`;
      }
      
      // Scale effect for logo on scroll
      const logo = document.querySelector('.logo');
      if (logo && scrollPosition > 50) {
        logo.style.transform = 'scale(0.9)';
      } else if (logo) {
        logo.style.transform = 'scale(1)';
      }
      
      // Sticky navigation effect
      const nav = document.querySelector('nav');
      if (nav) {
        if (scrollPosition > 100) {
          nav.style.padding = '8px 0';
          nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
          nav.style.padding = '15px 0';
          nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Event listeners for cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.03)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)';
      });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="App">
      {/* Navigation */}
      {/* <nav>
        <div className="container nav-container">
          <div className="logo">
            <span>Adaptive</span>Learn
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#adaptive">Adaptive Learning</a></li>
            <li><a href="#cta" className="cta">Get Started</a></li>
          </ul>
        </div>
      </nav> */}
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Learning that <span>Adapts</span> to Your Abilities.</h1>
            <p className="hero-subtitle">Our AI-powered e-learning platform automatically adjusts difficulty levels based on your performance, ensuring optimal engagement and learning outcomes.</p>
            <a href="#features" className="cta-btn">Explore Features</a>
          </div>
          <div className="hero-image">
            <img src="https://i.pinimg.com/736x/cc/b5/2a/ccb52a6af411732c1785749b378741d3.jpg" alt="Adaptive Learning Platform Interface" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Key Features</h2>
            <p>Discover how our adaptive platform transforms the learning experience</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-title">Personalized Learning Path</div>
              <p className="feature-text">Our system uses AI to analyze your responses and creates a customized learning journey that matches your pace and knowledge level.</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Intelligent Difficulty Adjustment</div>
              <p className="feature-text">Questions automatically adapt from easy to hard based on your performance, keeping you in the optimal learning zone.</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Engagement Analytics</div>
              <p className="feature-text">Comprehensive metrics track student engagement levels, providing insights to educators about learning patterns and areas needing attention.</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Real-time Feedback</div>
              <p className="feature-text">Receive immediate guidance and explanations tailored to your learning style, helping you understand concepts better.</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Learning Style Recognition</div>
              <p className="feature-text">Our system identifies your unique learning preferences and adapts content presentation accordingly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-title">Progress Tracking</div>
              <p className="feature-text">Visualize your learning journey with detailed progress metrics and achievement milestones.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Adaptive Learning Section */}
      <section className="adaptive-learning" id="adaptive">
        <div className="container">
          <div className="adaptive-content">
            <div className="adaptive-image">
              <img src="https://i.pinimg.com/736x/16/32/e0/1632e0a9a5f5ea1ba7a8e769da66b9cd.jpg" alt="Adaptive Learning System Visualization" />
            </div>
            <div className="adaptive-info">
              <h2 className="adaptive-title">How Adaptive Learning Works</h2>
              <p className="adaptive-description">Our platform uses advanced algorithms to analyze your responses in real-time, automatically adjusting question difficulty to keep you challenged but not overwhelmed.</p>
              <div className="adaptive-points">
                <div className="adaptive-point">
                  <div className="point-icon">1</div>
                  <div className="point-content">
                    <h4>Performance Analysis</h4>
                    <p>The system continuously monitors your speed, accuracy, and confidence level when answering questions.</p>
                  </div>
                </div>
                <div className="adaptive-point">
                  <div className="point-icon">2</div>
                  <div className="point-content">
                    <h4>Dynamic Difficulty Scaling</h4>
                    <p>Question difficulty automatically increases or decreases based on your performance, keeping you in the optimal learning zone.</p>
                  </div>
                </div>
                <div className="adaptive-point">
                  <div className="point-icon">3</div>
                  <div className="point-content">
                    <h4>Learning Style Adaptation</h4>
                    <p>Content presentation adjusts to match your preferred learning style, whether visual, auditory, or kinesthetic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section" id="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Transform Your Learning Experience Today</h2>
            <p className="cta-text">Join thousands of students who have improved their learning outcomes with our adaptive platform.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-btn transparent">Sign Up Free</a>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo">
                <span>Quizz</span>ard
              </div>
              <p className="footer-tagline">Personalized learning for better outcomes</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                
              </div>
              <div className="footer-column">
                
              </div>
              <div className="footer-column">
                
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              &copy; 2025 AdaptiveLearn. All rights reserved.
            </div>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        :root {
          --primary: #4361ee;
          --secondary: #3a0ca3;
          --accent: #f72585;
          --light: #f8f9fa;
          --dark: #212529;
          --success: #4cc9f0;
          --warning: #f8961e;
          --danger: #e63946;
          --transition: all 0.4s ease;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
          background-color: var(--light);
          color: var(--dark);
          overflow-x: hidden;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Navigation */
        nav {
          background-color: rgba(255, 255, 255, 0.95);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
        }
        
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary);
          display: flex;
          align-items: center;
          animation: float 3s ease-in-out infinite;
        }
        
        .logo span {
          background: linear-gradient(45deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
        }
        
        .nav-links li {
          margin-left: 30px;
          animation: fadeInDown 0.5s ease forwards;
          opacity: 0;
        }
        
        .nav-links li:nth-child(1) {
          animation-delay: 0.1s;
        }
        
        .nav-links li:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .nav-links li:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        .nav-links a {
          text-decoration: none;
          color: var(--dark);
          font-weight: 500;
          transition: var(--transition);
          padding: 8px 12px;
          border-radius: 6px;
        }
        
        .nav-links a:hover {
          color: var(--primary);
          background: rgba(67, 97, 238, 0.1);
          transform: translateY(-2px);
        }
        
        .nav-links a.cta {
          background-color: var(--primary);
          color: white;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 600;
          animation: pulse 2s infinite;
        }
        
        .nav-links a.cta:hover {
          background-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
        }
        
        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(247, 37, 133, 0.1));
          padding: 80px 0;
          margin-top: 60px;
          position: relative;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: -50px;
          left: -50px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.1;
          animation: floatBubble 15s linear infinite;
        }
        
        .hero::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.1;
          animation: floatBubble 20s linear infinite reverse;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 50%;
          animation: fadeInLeft 1s ease-out;
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
          animation: slideUp 0.7s ease-out forwards;
        }
        
        .hero-title span {
          color: var(--primary);
          position: relative;
          display: inline-block;
          animation: colorChange 5s infinite alternate;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.6;
          animation: slideUp 0.7s ease-out 0.2s forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-image {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInRight 1s ease-out;
          position: relative;
          z-index: 2;
        }
        
        .hero-image img {
          animation: float 5s ease-in-out infinite;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          transition: var(--transition);
        }
        
        .hero-image img:hover {
          transform: scale(1.05) translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .cta-btn {
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          color: pink;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 12px 30px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
          animation: slideUp 0.7s ease-out 0.4s forwards, pulse 2s infinite 1.5s;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
          background: linear-gradient(45deg, var(--secondary), var(--primary));
        }
        
        /* Features Section */
        .features {
          padding: 100px 0;
          background-color: white;
          position: relative;
          overflow: hidden;
        }
        
        .features::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          border-radius: 50%;
          top: -150px;
          left: -150px;
          opacity: 0.05;
          z-index: 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
          animation: fadeIn 1s ease-out;
        }
        
        .section-title h2::after {
          content: '';
          position: absolute;
          width: 60px;
          height: 4px;
          background-color: var(--accent);
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: expandWidth 1s ease-out forwards;
        }
        
        .section-title p {
          color: #666;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 2;
        }
        
        .feature-card {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: var(--transition);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          border: 1px solid #eee;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        
        .feature-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .feature-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        .feature-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        
        .feature-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        
        .feature-card:nth-child(6) {
          animation-delay: 0.6s;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(45deg, var(--primary), var(--accent));
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.5s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover::before {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        
        .feature-title {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
          color: var(--dark);
          transition: var(--transition);
        }
        
        .feature-card:hover .feature-title {
          color: var(--primary);
        }
        
        .feature-text {
          color: #666;
          line-height: 1.6;
          flex-grow: 1;
        }
        
        /* Adaptive Learning Section */
        .adaptive-learning {
          padding: 100px 0;
          background-color: white;
          position: relative;
          overflow: hidden;
        }
        
        .adaptive-learning::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, var(--accent), var(--secondary));
          border-radius: 50%;
          bottom: -200px;
          right: -200px;
          opacity: 0.05;
          z-index: 0;
        }
        
        .adaptive-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        
        .adaptive-image {
          width: 50%;
          position: relative;
          animation: fadeInLeft 1s ease-out;
        }
        
        .adaptive-image img {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          transition: var(--transition);
          animation: float 4s ease-in-out infinite;
        }
        
        .adaptive-image img:hover {
          transform: scale(1.03);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .adaptive-info {
          width: 50%;
          padding-left: 50px;
          animation: fadeInRight 1s ease-out;
        }
        
        .adaptive-title {
          font-size: 2.2rem;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
          animation: slideUp 0.7s ease-out forwards;
        }
        
        .adaptive-title::after {
          content: '';
          position: absolute;
          width: 60px;
          height: 4px;
          background-color: var(--accent);
          bottom: -10px;
          left: 0;
          border-radius: 2px;
          animation: expandWidth 1s ease-out forwards;
        }
        
        .adaptive-description {
          color: #555;
          margin-bottom: 30px;
          line-height: 1.7;
          animation: slideUp 0.7s ease-out 0.2s forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .adaptive-points {
          margin-top: 30px;
        }
        
        .adaptive-point {
          display: flex;
          margin-bottom: 20px;
          align-items: flex-start;
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .adaptive-point:nth-child(1) {
          animation-delay: 0.3s;
        }
        
        .adaptive-point:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .adaptive-point:nth-child(3) {
          animation-delay: 0.7s;
        }
        
        .point-icon {
          background-color: rgba(67, 97, 238, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: var(--primary);
          flex-shrink: 0;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        
        .point-icon::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--primary);
          top: 0;
          left: 0;
          transform: scale(0);
          transition: var(--transition);
          border-radius: 50%;
          z-index: -1;
        }
        
        .adaptive-point:hover .point-icon {
          color: white;
        }
        
        .adaptive-point:hover .point-icon::before {
          transform: scale(1);
        }
        
        .point-content h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          transition: var(--transition);
        }
        
        .adaptive-point:hover .point-content h4 {
          color: var(--primary);
        }
        
        .point-content p {
          color: #666;
          line-height: 1.6;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 100px 0;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before, .cta-section::after {
          content: '';
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .cta-section::before {
          top: -100px;
          left: -100px;
          animation: floatBubble 15s linear infinite;
        }
        
        .cta-section::after {
          bottom: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          animation: floatBubble 20s linear infinite reverse;
        }
        
        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 700;
          animation: fadeIn 1s ease-out;
        }
        
        .cta-text {
          font-size: 1.2rem;
          margin-bottom: 40px;
          line-height: 1.7;
          opacity: 0.9;
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        
        .cta-btn.white {
          background-color: white;
          color: var(--primary);
          animation: fadeIn 1s ease-out 0.5s forwards, pulse 2s infinite 1.5s;
          opacity: 0;
        }
        
        .cta-btn.transparent {
          background-color: transparent;
          border: 2px solid white;
          animation: fadeIn 1s ease-out 0.7s forwards;
          opacity: 0;
        }
        
        .cta-btn.white:hover, .cta-btn.transparent:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        /* Footer Section */
        .footer {
          background-color: #f8f9fa;
          padding: 80px 0 30px;
          position: relative;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
        }
        
        .footer-logo {
          width: 30%;
        }
        
        .footer-tagline {
          margin-top: 20px;
          color: #666;
          font-size: 0.9rem;
        }
        
        .footer-links {
          width: 60%;
          display: flex;
          justify-content: space-between;
        }
        .footer-column h4 {
			font-size: 1.1rem;
			margin-bottom: 20px;
			color: var(--dark);
			position: relative;
			display: inline-block;
		  }
		  
		  .footer-column h4::after {
			content: '';
			position: absolute;
			width: 30px;
			height: 3px;
			background-color: var(--primary);
			bottom: -8px;
			left: 0;
			border-radius: 2px;
		  }
		  
		  .footer-column ul {
			list-style: none;
		  }
		  
		  .footer-column ul li {
			margin-bottom: 10px;
		  }
		  
		  .footer-column ul li a {
			color: #666;
			text-decoration: none;
			transition: var(--transition);
			font-size: 0.9rem;
		  }
		  
		  .footer-column ul li a:hover {
			color: var(--primary);
			padding-left: 5px;
		  }
		  
		  .footer-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 30px;
			border-top: 1px solid #eee;
		  }
		  
		  .copyright {
			color: #666;
			font-size: 0.9rem;
		  }
		  
		  .social-links {
			display: flex;
			gap: 15px;
		  }
		  
		  .social-link {
			color: #666;
			text-decoration: none;
			transition: var(--transition);
			font-size: 0.9rem;
		  }
		  
		  .social-link:hover {
			color: var(--primary);
		  }
		  
		  /* Animations */
		  @keyframes fadeIn {
			from {
			  opacity: 0;
			}
			to {
			  opacity: 1;
			}
		  }
		  
		  @keyframes fadeInLeft {
			from {
			  opacity: 0;
			  transform: translateX(-30px);
			}
			to {
			  opacity: 1;
			  transform: translateX(0);
			}
		  }
		  
		  @keyframes fadeInRight {
			from {
			  opacity: 0;
			  transform: translateX(30px);
			}
			to {
			  opacity: 1;
			  transform: translateX(0);
			}
		  }
		  
		  @keyframes fadeInDown {
			from {
			  opacity: 0;
			  transform: translateY(-20px);
			}
			to {
			  opacity: 1;
			  transform: translateY(0);
			}
		  }
		  
		  @keyframes float {
			0% {
			  transform: translateY(0px);
			}
			50% {
			  transform: translateY(-10px);
			}
			100% {
			  transform: translateY(0px);
			}
		  }
		  
		  @keyframes floatBubble {
			0% {
			  transform: translate(0, 0);
			}
			25% {
			  transform: translate(50px, 50px);
			}
			50% {
			  transform: translate(100px, 0);
			}
			75% {
			  transform: translate(50px, -50px);
			}
			100% {
			  transform: translate(0, 0);
			}
		  }
		  
		  @keyframes pulse {
			0% {
			  box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4);
			}
			70% {
			  box-shadow: 0 0 0 10px rgba(67, 97, 238, 0);
			}
			100% {
			  box-shadow: 0 0 0 0 rgba(67, 97, 238, 0);
			}
		  }
		  
		  @keyframes slideUp {
			from {
			  opacity: 0;
			  transform: translateY(20px);
			}
			to {
			  opacity: 1;
			  transform: translateY(0);
			}
		  }
		  
		  @keyframes expandWidth {
			from {
			  width: 0;
			}
			to {
			  width: 60px;
			}
		  }
		  
		  @keyframes colorChange {
			0% {
			  color: var(--primary);
			}
			50% {
			  color: var(--accent);
			}
			100% {
			  color: var(--primary);
			}
		  }
		  
		  /* For animation on scroll */
		  .feature-card, .section-title h2, .section-title p, 
		  .adaptive-point, .adaptive-title, .adaptive-description, 
		  .cta-title, .cta-text, .cta-btn {
			opacity: 0;
			transform: translateY(20px);
			transition: all 0.6s ease;
		  }
		  
		  .show {
			opacity: 1;
			transform: translateY(0);
		  }
		  
		  /* Responsive Design */
		  @media (max-width: 992px) {
			.hero-content, .hero-image,
			.adaptive-image, .adaptive-info {
			  width: 100%;
			  padding: 0;
			}
			
			.hero, .adaptive-content {
			  flex-direction: column;
			}
			
			.hero-title {
			  font-size: 2.8rem;
			}
			
			.hero-content {
			  margin-bottom: 50px;
			  align-items: center;
			  text-align: center;
			}
			
			.adaptive-image {
			  margin-bottom: 50px;
			  order: 2;
			}
			
			.adaptive-info {
			  order: 1;
			}
			
			.adaptive-title::after {
			  left: 50%;
			  transform: translateX(-50%);
			}
			
			.adaptive-title, .adaptive-description {
			  text-align: center;
			}
		  }
		  
		  @media (max-width: 768px) {
			.footer-content {
			  flex-direction: column;
			}
			
			.footer-logo, .footer-links {
			  width: 100%;
			}
			
			.footer-logo {
			  margin-bottom: 30px;
			  text-align: center;
			}
			
			.footer-bottom {
			  flex-direction: column;
			  gap: 20px;
			}
			
			.nav-container {
			  flex-direction: column;
			}
			
			.logo {
			  margin-bottom: 20px;
			}
			
			.nav-links {
			  justify-content: center;
			}
			
			.nav-links li {
			  margin: 0 10px;
			}
			
			.cta-buttons {
			  flex-direction: column;
			  align-items: center;
			}
		  }
		  
		  @media (max-width: 576px) {
			.hero-title {
			  font-size: 2.2rem;
			}
			
			.section-title h2 {
			  font-size: 2rem;
			}
			
			.adaptive-title, .cta-title {
			  font-size: 1.8rem;
			}
			
			.feature-card {
			  padding: 20px;
			}
			
			.footer-links {
			  flex-direction: column;
			  gap: 30px;
			}
			
			.footer-column {
			  text-align: center;
			}
			
			.footer-column h4::after {
			  left: 50%;
			  transform: translateX(-50%);
			}
		  }
				`}</style>
			  </div>
			);
		  }
		  
		  export default App;