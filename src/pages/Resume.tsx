export default function Resume() {
  return (
    <section id="resume" data-section="resume" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Resume</h2>
      <div className="card flex items-center justify-between gap-4">
        <p className="text-gray-700 dark:text-gray-300">Download a copy of my resume.</p>
        <a className="btn" href="/resume.pdf" download>
          Download Resume
        </a>
      </div>
      <p className="mt-3 text-sm text-gray-500">Place your resume file at <code>/public/resume.pdf</code>.</p>
      <div className="mt-6">
        <div className="card p-2">
          <iframe
            src="/resume.pdf"
            title="Resume PDF preview"
            className="h-[80vh] w-full rounded-md border border-gray-200 dark:border-gray-800"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">If the preview doesn’t load in your browser, use the download button above.</p>
      </div>
    </section>
  )
}
