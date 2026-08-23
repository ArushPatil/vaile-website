/** Quarry Specimen fallback: a missing record is presented as an archival absence, not a generic app error. */
import PageMetadata from "@/components/PageMetadata";

export default function NotFound() {
  return (
    <main className="not-found">
      <PageMetadata title="Record Not Found — Vaile" description="The requested Vaile archive record could not be located." />
      <div className="not-found__rail">VAILE / FIELD ARCHIVE / UNLOCATED RECORD</div>
      <section className="not-found__sheet">
        <p>ARCHIVE EXCEPTION / 404</p>
        <h1>Record<br /><em>not found.</em></h1>
        <div className="not-found__rule" />
        <p className="not-found__copy">The requested field record is unavailable, moved, or was never entered into this edition.</p>
        <a href="/" className="not-found__return">RETURN TO DROP 001 <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="not-found__footer">VAILE / DROP 001 / 12 OZ DUCK CANVAS</footer>
    </main>
  );
}
