export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
      <div className="container-default flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
        <p>© {new Date().getFullYear()} Aayush Kushwaha. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="link" href="mailto:kushwaha@uab.edu">Email</a>
          <a className="link" href="https://github.com/aayush-kushwaha" target="_blank" rel="noreferrer">GitHub</a>
          <a className="link" href="https://linkedin.com/in/aayushkushwaha" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

