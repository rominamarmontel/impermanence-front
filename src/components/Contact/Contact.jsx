import emailjs from 'emailjs-com';
import { useRef } from 'react';
import './Contact.css'

const publicKey = import.meta.env.VITE_EMAILJS

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_p0rr531', 'template_oppm5pp', e.target, publicKey)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };
  return (
    <div className='ContactPage'>
      <div className='contact-title'>
        <h1>contact us !</h1>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className='contact-form'>
          <div className='contact-form-top'>
            <fieldset className='name-form' >
              <label></label>
              <input type="text" name="user_name" placeholder='name' />
            </fieldset>
            <fieldset className='email-form'>
              <label></label>
              <input type="email" name="user_email" placeholder='email' />
            </fieldset>
          </div>
          <fieldset className='message-form'>
            <label></label>
            <textarea name="message" placeholder='message' />
          </fieldset>
        </div>
        <div className='send-button'>
          <input type="submit" value="Send a Message" />
        </div>
      </form>
    </div>
  )
}

export default Contact