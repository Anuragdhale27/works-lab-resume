import { Link } from 'react-router-dom';

export function Footer({ fontClass }: { fontClass?: string } = {}) {
  return (
    <footer className={fontClass}>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">
              Works<span className="footer-brand-accent">Lab</span>
            </div>
            <div className="footer-brand-desc">Digital products built to be useful.</div>
          </div>
          <ul className="footer-links">
            <li><a href="/#templates">Templates</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="mailto:adwork895@gmail.com">Contact</a></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/refund">Refund Policy</Link></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Works Lab. All rights reserved.</span>
          <span>Made in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
