export default function Experience() {
  return (
    <section id="experience" data-section="experience" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Experience</h2>
      <div className="grid gap-6">
        <div className="card">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-semibold">Software Engineer – DigitalPetro</h3>
            <span className="text-sm text-gray-500">2022–2023</span>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
            <li>Designed and optimized backend APIs for IOCL & IOML fuel station automation.</li>
            <li>Decreased customer support tickets by 40%.</li>
            <li>Implemented interlock and alert systems for safety.</li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-semibold">Engineer Intern – DigiNirman</h3>
            <span className="text-sm text-gray-500">2021–2022</span>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
            <li>Partitioned and prepared video datasets for AI Robo Traffic project.</li>
            <li>Trained ML models and automated data workflows with Python.</li>
            <li>Built CRUD system for data management.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
