import { NewsletterForm } from "./form"

export function Newsletter() {
  return (
    <div className="footer-newsletter">
      <h4 className="footer-newsletter-heading">Stay Updated</h4>
      <p className="footer-newsletter-text">
        Subscribe to our newsletter for expert insights and exclusive content.
      </p>
      <NewsletterForm />
    </div>
  )
}