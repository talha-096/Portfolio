import { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Download, Send, CheckCircle, FileText } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const OWNER_EMAIL = "talhaghafoor84@gmail.com";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Previously the button stayed on "Message Received!" forever, so a second
    // message looked like it had already been sent.
    if (submitted) setSubmitted(false);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, subject: "Portfolio Contact" }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      // The server answered and rejected the request. Reporting "Message
      // Received!" here — and hijacking the tab with a mailto: — meant a
      // rate-limited or invalid submission looked like a success.
      if (response.status === 429) {
        setError("Too many messages sent. Please wait a minute and try again.");
      } else if (response.status === 422) {
        setError("Please check your name, email and message, then try again.");
      } else {
        setError("The server could not accept the message. Please email me directly.");
      }
    } catch (err) {
      // Only a genuine network failure (server down, DNS, CORS) lands here,
      // which is the one case where the mailto fallback makes sense.
      console.warn("Backend API unreachable, offering mailto fallback", err);
      setError("Could not reach the server. Opening your email client instead…");
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
        `Contact from ${formData.name}`
      )}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad" data-screen-label="07 Contact">
      <div className="container">
        <div className="contact-card reveal">
          <div className="availability">
            <span className="ring" />
            Available for ML/AI, Python, QA &amp; Full Stack Opportunities
          </div>

          <h2>
            Let's build &amp; verify <br />
            <em>something extraordinary.</em>
          </h2>

          <p>
            Whether you need custom ML/AI models, high-performance Python backend systems, Cypress/Postman QA automation, or full-stack web applications — feel free to get in touch.
          </p>

          <div className="contact-meta">
            <div className="item">
              <span className="v mint break-all">talhaghafoor84@gmail.com</span>
              <span className="l">DIRECT EMAIL</span>
            </div>
            <div className="item">
              <span className="v">Islamabad, Pakistan</span>
              <span className="l">LOCATION</span>
            </div>
            <div className="item">
              <span className="v">&lt; 24 Hours</span>
              <span className="l">RESPONSE TIME</span>
            </div>
          </div>

          {/* Contact Form */}
          <form className="max-w-xl mx-auto mb-10 space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-black font-semibold placeholder:text-gray-500 placeholder:font-normal border border-line focus:border-cyan outline-none transition-colors shadow-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-black font-semibold placeholder:text-gray-500 placeholder:font-normal border border-line focus:border-cyan outline-none transition-colors shadow-sm"
                required
              />
            </div>
            <textarea
              placeholder="Tell me about your project, role, or technical inquiry..."
              rows={4}
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-black font-semibold placeholder:text-gray-500 placeholder:font-normal border border-line focus:border-cyan outline-none transition-colors shadow-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center text-base py-3 disabled:opacity-50"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : submitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2 text-mint" />
                  Message Received!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>

            {error && (
              <p role="alert" className="text-sm text-rose text-center">
                {error}
              </p>
            )}
          </form>

          <div className="contact-actions flex flex-wrap justify-center gap-3">
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Download CV (PDF)
            </a>
            <a href="/Talha_Ghafoor_CV_AIML.docx" download className="btn btn-ghost">
              <FileText className="w-4 h-4 mr-2" />
              Download CV (DOCX)
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
            <a href="mailto:talhaghafoor84@gmail.com">
              <Mail className="w-4 h-4" />
              <span className="label">Email:</span> talhaghafoor84@gmail.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer mt-16">
          <div className="footer-inner">
            <div className="signature">
              <span className="ping" />
              <span>Designed &amp; Developed for Talha Ghafoor</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <a href="mailto:talhaghafoor84@gmail.com" className="hover:text-cyan transition-colors break-all">
                talhaghafoor84@gmail.com
              </a>
              <span className="hidden sm:inline">·</span>
              <span>© {new Date().getFullYear()} Talha Ghafoor · ML/AI · Python · QA · Full Stack</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
export default ContactSection;
