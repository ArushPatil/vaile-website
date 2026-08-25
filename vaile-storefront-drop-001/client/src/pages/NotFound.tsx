/** VAILE fallback page: concise, branded, and aligned with the original record-led heading system. */
import PageMetadata from "@/components/PageMetadata";

export default function NotFound() {
  return (
    <main className="not-found">
      <PageMetadata title="Record Not Found — VAILE" description="The requested VAILE record could not be located." />
      <div className="not-found__rail">VAILE · DROP 001</div>
      <section className="not-found__sheet">
        <p>404</p>
        <h1>Record<br /><em>not found.</em></h1>
        <div className="not-found__rule" />
        <p className="not-found__copy">The page you requested is unavailable or has moved.</p>
        <a href="/" className="not-found__return">RETURN TO VAILE <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="not-found__footer">VAILE · 12 OZ DUCK CANVAS</footer>
    </main>
  );
}
