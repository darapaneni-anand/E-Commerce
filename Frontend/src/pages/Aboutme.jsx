import React from "react";
import profilepic from "../assets/profilepic.png";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function AboutMe() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profilepic}
            alt="Anand Teja"
            className="w-48 h-48 rounded-full shadow-xl border-4 border-rose-200 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* About Content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700">
            Hi, I'm Anand Teja 👋
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
            I'm a passionate full-stack developer and the creator of this e-commerce store. 
            I love building intuitive, modern, and user-friendly web experiences. 
            When I'm not coding, I enjoy playing cricket and exploring epics like the 
            <span className="italic"> Mahabharata </span> and <span className="italic">Ramayana</span>.
          </p>
          <p className="text-md text-gray-600">
            My vision is to craft digital experiences that combine performance, 
            design, and usability to bring value to people’s lives.
          </p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <a
              href="mailto:anandteja38@gmail.com"
              className="text-rose-600 hover:text-rose-800 text-2xl"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-800 text-2xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-800 text-2xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Contact Button */}
          <div className="mt-6">
            <a
              href="mailto:anandteja38@gmail.com"
              className="px-6 py-3 bg-rose-600 text-white rounded-full shadow-md hover:bg-rose-700 transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
