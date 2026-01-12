import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" data-section="projects" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <ProjectCard
          title="Adversarial Machine Learning: FGSM & PGD on CIFAR-10"
          bullets={[
            "Trained a SimpleCNN on CIFAR-10 (83.92% clean accuracy).",
            "Implemented FGSM and PGD attacks across multiple ε values.",
            "Measured Adversarial Accuracy and Attack Success Rate (ASR).",
            "Visualized clean vs adversarial samples and perturbation heatmaps.",
          ]}
          stack="PyTorch, Torchvision, NumPy, Matplotlib, Jupyter"
          imageAlt="Adversarial Machine Learning"
          imageSrc="/adversial_machine_learning.jpg"
          badges={["PyTorch", "Torchvision", "NumPy", "Matplotlib", "Jupyter"]}
          githubUrl="https://github.com/aayush-kushwaha/Adversarial_Machine_Learning"
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
          imageSrc="/aayush_landing_page.png"
          badges={["React", "FastAPI", "Nginx", "DigitalOcean"]}
          githubUrl="https://github.com/aayush-kushwaha"
          demoUrl="https://aayushkushwaha.com.np"
        />
      </div>
    </section>
  )
}
