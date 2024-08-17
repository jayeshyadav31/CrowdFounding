import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-us-page">
      
      <section className="hero-section text-center bg-gray-100 py-10">
        <h1 className="text-4xl font-bold mb-4">Empowering Dreams, One Project at a Time</h1>
        <p className="text-lg mb-6">Crowdfunding for a brighter future, connecting creators with supporters across the globe.</p>
        {/* <button className="bg-blue-500 text-white px-6 py-2 rounded">Explore Projects</button> */}
      </section>

      <section className="mission-section text-center py-10">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto">
          At [Your Platform Name], our mission is to bring innovative ideas to life by connecting passionate creators 
          with people who believe in their vision. We empower individuals and communities to raise funds for projects 
          that can make a real impact on the world. From tech innovations to artistic endeavors, we’re here to help you 
          turn your dreams into reality.
        </p>
      </section>

      <section className="story-section bg-gray-100 py-10">
        <h2 className="text-3xl font-semibold text-center mb-4">Our Story</h2>
        <p className="text-lg max-w-3xl mx-auto">
          It all started with a simple idea: what if everyone had the opportunity to bring their unique projects to life? 
          [Your Platform Name] was founded to give creators the platform they need to connect with supporters, fund their 
          projects, and make their dreams a reality. Our journey began in [Year], and since then, we have helped thousands 
          of projects come to life.
        </p>
      </section>

      <section className="what-we-do-section text-center py-10">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <p className="text-lg max-w-3xl mx-auto">
          We provide a platform where creators can share their projects with the world, gather support from backers, 
          and bring their ideas to fruition. Whether it's a groundbreaking technology, a creative arts project, 
          or a community initiative, we make it possible for anyone to raise the funds they need to succeed.
        </p>
      </section>

      <section className="impact-section bg-gray-100 py-10">
        <h2 className="text-3xl font-semibold text-center mb-4">Our Impact</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Since our inception, we've helped raise over 100000 for 6 projects/campaigns worldwide. 
          Our community of backers and creators has grown exponentially, making a tangible difference in the world. 
          We're proud of the success stories that have come out of our platform, and we're excited to help bring even 
          more projects to life.
        </p>
      </section>

      {/* Meet the Team */}
      <section className="team-section text-center py-10">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="team-member bg-white p-4 rounded shadow">
            <img src="team-member.jpg" alt="Team Member" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">Jayesh Yadav</h3>
            <p className="text-gray-600">CEO & Founder</p>
            <p className="text-gray-500 text-sm mt-2">Jayesh is the visionary behind Crowdfounding, with a passion 
              for innovation and helping creators succeed.</p>
          </div>
          {/* Add more team members here */}
        </div>
      </section>

      <section className="join-us-section text-center bg-blue-500 text-white py-10">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          Ready to bring your project to life? Join our community of creators and backers today, and let's make your dreams 
          a reality. Whether you're looking to fund a new idea or support a project, CrowdFounding is here to help.
        </p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded">Start a Campaign</button>
      </section>
    </div>
  );
};

export default AboutPage;
