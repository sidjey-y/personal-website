"use client"

import Particles from "./particles"

export const HeroParticles = () => (
  <Particles
    particleCount={200}
    particleColors={["rgba(255, 255, 255, 1)"]}
    speed={0.4}
    moveParticlesOnHover={true}
    alphaParticles={true}
    particleBaseSize={2.5}
    className="z-0"
  />
)

export const SkillsParticles = () => (
  <Particles
    particleCount={150}
    particleColors={["rgba(255, 255, 255, 1)"]}
    speed={0.5}
    moveParticlesOnHover={true}
    alphaParticles={true}
    particleBaseSize={2}
    className="z-0"
  />
)

export const ProjectsParticles = () => (
  <Particles
    particleCount={250}
    particleColors={["rgba(255, 255, 255, 1)"]}
    speed={0.6}
    moveParticlesOnHover={true}
    alphaParticles={true}
    particleBaseSize={1.8}
    className="z-0"
  />
)

export const GalleryParticles = () => (
  <Particles
    particleCount={180}
    particleColors={["rgba(255, 255, 255, 1)"]}
    speed={0.7}
    moveParticlesOnHover={true}
    alphaParticles={true}
    particleBaseSize={1.5}
    className="z-0"
  />
) 