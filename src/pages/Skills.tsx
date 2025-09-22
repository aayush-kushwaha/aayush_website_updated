export default function Skills() {
  return (
    <section id="skills" data-section="skills" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Skills</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Languages & Frameworks</h3>
          <p className="text-gray-700 dark:text-gray-300">Python, FastAPI, Flask, SQL</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Databases & Tools</h3>
          <p className="text-gray-700 dark:text-gray-300">PostgreSQL, Elasticsearch, Redis, RabbitMQ</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">DevOps & Deployment</h3>
          <p className="text-gray-700 dark:text-gray-300">Docker, Nginx, DigitalOcean, Git</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Other</h3>
          <p className="text-gray-700 dark:text-gray-300">WebSockets, Machine Learning basics, APIs</p>
        </div>
      </div>
    </section>
  )
}
