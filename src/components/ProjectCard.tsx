type Props = {
  title: string
  bullets: string[]
  stack: string
  imageAlt?: string
  imageSrc?: string
  badges?: string[]
  githubUrl?: string
  demoUrl?: string
}

export default function ProjectCard({ title, bullets, stack, imageAlt, imageSrc, badges = [], githubUrl, demoUrl }: Props) {
  return (
    <div className="card card-hover flex flex-col gap-4">
      {imageSrc ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <img src={imageSrc} alt={imageAlt || title} loading="lazy" className="h-40 w-full object-cover" />
        </div>
      ) : (
        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          {/* Placeholder visual */}
          <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 dark:from-gray-800 dark:to-gray-900">
            <span className="text-sm">{imageAlt || 'Project Image'}</span>
          </div>
        </div>
      )}
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-700 dark:text-gray-200">Stack:</span> {stack}</p>
        {badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((tag) => (
              <span className="badge" key={tag}>{tag}</span>
            ))}
          </div>
        )}
        {(githubUrl || demoUrl) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-outline">View GitHub</a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noreferrer" className="btn">Live Demo</a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
