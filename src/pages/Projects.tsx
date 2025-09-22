import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" data-section="projects" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <ProjectCard
          title="DigitalPetro IoT Automation"
          bullets={[
            "Optimized dashboard API load time by 98%.",
            "Implemented RabbitMQ for data credibility & reliability.",
            "Improved system reliability from 92% → 98%."
          ]}
          stack="Python, FastAPI, Redis, RabbitMQ, Elasticsearch, PostgreSQL"
          imageAlt="DigitalPetro"
          imageSrc="/placeholder.svg"
          badges={["FastAPI", "RabbitMQ", "Redis", "Elasticsearch", "PostgreSQL"]}
          githubUrl="https://github.com/aayush-kushwaha"
        />
        <ProjectCard
          title="The Dragon Fitness Center (Gym Management System)"
          bullets={[
            "QR-code based attendance & membership tracking.",
            "Daily/weekly/monthly attendance dashboards.",
            "Admin panel for manual payment tracking."
          ]}
          stack="FastAPI, Streamlit, PostgreSQL"
          imageAlt="Gym Management"
          imageSrc="/tdfc.jpg"
          badges={["FastAPI", "Streamlit", "PostgreSQL"]}
          githubUrl="https://github.com/aayush-kushwaha"
          demoUrl="https://the-dragon-fitness-center.streamlit.app/"
        />
        <ProjectCard
          title="Real-Time Chat Application"
          bullets={[
            "Built with FastAPI + WebSockets.",
            "Features: direct messaging, group chat.",
            "Planned Redis integration for scalability."
          ]}
          stack="FastAPI, WebSockets, PostgreSQL"
          imageAlt="Chat App"
          imageSrc="/placeholder.svg"
          badges={["FastAPI", "WebSockets", "PostgreSQL"]}
          githubUrl="https://github.com/aayush-kushwaha"
          demoUrl="https://aayushkushwaha.com.np"
        />
        <ProjectCard
          title="Personal Portfolio Website"
          bullets={[
            "React + FastAPI full-stack app.",
            "Deployed on DigitalOcean with Nginx reverse proxy.",
            "Domain: aayushkushwaha.com.np."
          ]}
          stack="React, FastAPI, Nginx, DigitalOcean"
          imageAlt="Portfolio"
          imageSrc="/placeholder.svg"
          badges={["React", "FastAPI", "Nginx", "DigitalOcean"]}
          githubUrl="https://github.com/aayush-kushwaha"
          demoUrl="https://aayushkushwaha.com.np"
        />
      </div>
    </section>
  )
}
