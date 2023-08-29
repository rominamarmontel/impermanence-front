import emailjs from 'emailjs-com';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css'

const publicKey = import.meta.env.VITE_EMAILJS
const serviceId = import.meta.env.VITE_EMAILJS_SERVICEID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATEID

const Contact = () => {
  const location = useLocation();
  const isEnglish = location.pathname.endsWith('/en') || location.pathname.startsWith('/en');


  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then((result) => {
        console.log(result.text);
        alert("Message send! / Message envoyé!")
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };
  return (
    <div className='ContactPage'>
      {
        isEnglish ? (
          <>
            <div className='contact-title'>
              <h1>contact us !</h1>
            </div>
            <form ref={form} onSubmit={sendEmail}>
              <div className='contact-form'>
                <div className='contact-form-top'>
                  <fieldset className='name-form'>
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
          </>

        ) : (
          <>
            <div className='contact-title'>
              <h1>contactez-nous !</h1>
            </div>
            <form ref={form} onSubmit={sendEmail}>
              <div className='contact-form'>
                <div className='contact-form-top'>
                  <fieldset className='name-form'>
                    <label></label>
                    <input type="text" name="user_name" placeholder='nom' />
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
              <div className='send-button' style={{ display: 'flex', alignItems: 'center', margin: 10 }}>
                <input type="submit" value="Envoyer un message" />
              </div>
            </form>
          </>
        )
      }
    </div>
  )
}

export default Contact