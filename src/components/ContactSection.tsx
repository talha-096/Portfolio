import { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Download, Send, CheckCircle } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate contact message trigger
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:talhaghafoor096@gmail.com?subject=Contact%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    }, 1000);
  };

  return (
    <section id="contact" className="section-pad" data-screen-label="07 Contact">
      <div className="container">
        <div className="contact-card reveal">
          <div className="availability">
            <span className="ring" />
            Available for SQA &amp; AI/ML Opportunities
          </div>

          <h2>
            Let's build &amp; verify <br />
            <em>something intelligent.</em>
          </h2>

          <p>
            Whether you have a Software Quality Assurance role, an AI/ML project to validate, or an innovative product to build — feel free to reach out.
          </p>

          <div className="contact-meta">
            <div className="item">
              <span className="v mint">talhaghafoor096@gmail.com</span>
              <span className="l">DIRECT EMAIL</span>
            </div>
            <div className="item">
              <span className="v">Pakistan</span>
              <span className="l">LOCATION</span>
            </div>
            <div className="item">
              <span className="v">&lt; 24 Hours</span>
              <span className="l">RESPONSE TIME</span>
            </div>
          </div>

          {/* Form */}
          <form className="max-w-xl mx-auto mb-10 space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-panel border border-line text-text focus:border-cyan outline-none transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-panel border border-line text-text focus:border-cyan outline-none transition-colors"
                required
              />
            </div>
            <textarea
              placeholder="Tell me about your project or inquiry..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-panel border border-line text-text focus:border-cyan outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full justify-center text-base py-3"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2 text-mint" />
                  Opening Mail Client...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="contact-actions">
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Download CV (PDF)
            </a>
          </div>

          <div className="contact-channels">
            <a href="https://github.com/talha-096" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span className="label">GitHub:</span> talha-096
            </a>
            <a href="https://www.linkedin.com/in/talha-ghafoor-475aa926a/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              <span className="label">LinkedIn:</span> Talha Ghafoor
            </a>
            <a href="https://www.instagram.com/talha_9.91/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-4 h-4" />
              <span className="label">Instagram:</span> @talha_9.91
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer mt-16">
          <div className="footer-inner">
            <div className="signature">
              <span className="ping" />
              <span>Designed &amp; Built for Talha Ghafoor</span>
            </div>
            <div>© {new Date().getFullYear()} Talha Ghafoor · SQA &amp; AI Specialist</div>
          </div>
        </footer>
      </div>
    </section>
  );
};
export default ContactSection;
