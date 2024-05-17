import React from 'react';
import './Contact.css';

const Contact = () => {
 return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        convallis est eu mauris ultricies, a auctor odio ultricies.
      </p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required />
        <button type="submit">Send</button>
      </form>
    </div>
 );
};

export default Contact;