import { IonButton, IonContent, IonIcon, IonToast } from '@ionic/react';
import { logoWhatsapp, send, warning } from 'ionicons/icons';
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import './whatsapp.css';

interface ContainerProps { }

const Whatsapp: React.FC<ContainerProps> = () => {
  const [recipient, setRecipient] = useState<string>('+84123456789');
  const [message, setMessage] = useState<string>('Hello1');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastColor, setToastColor] = useState<string>('success');

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic validation for phone numbers
    const phoneRegex = /^\+?[0-9\s\-\(\)]{8,15}$/;
    return phoneRegex.test(phone.trim());
  };

  const validateEmail = (email: string): boolean => {
    // Basic validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const showMessage = (msg: string, color: string = 'success') => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const openExternalBrowser = (url: string) => {
    try {
      window.open(url, '_system');
      return true;
    } catch (error) {
      console.error('Error opening browser:', error);
      return false;
    }
  };

  const sendWhatsAppMessage = async () => {
    if (!recipient) {
      showMessage('Please enter a phone number or email', 'danger');
      return;
    }

    if (!message) {
      showMessage('Please enter a message', 'danger');
      return;
    }

    const isValidPhone = validatePhoneNumber(recipient);
    const isValidEmail = validateEmail(recipient);

    if (!isValidPhone && !isValidEmail) {
      showMessage('Invalid phone number or email', 'danger');
      return;
    }

    try {
      // Format phone number (remove spaces, etc.)
      let formattedRecipient = recipient.replace(/\s+/g, '');

      // If it's a phone number and doesn't start with +, add it
      if (isValidPhone && !formattedRecipient.startsWith('+')) {
        formattedRecipient = '+' + formattedRecipient;
      }

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);

      // First try to open WhatsApp app directly if on a mobile device
      if (Capacitor.isNativePlatform()) {
        console.log('Using native platform approach');

        // Try to open the WhatsApp app first using app URL scheme
        try {
          // Create app URL scheme for WhatsApp
          const whatsappAppUrl = isValidPhone
            ? `whatsapp://send?phone=${formattedRecipient}&text=${encodedMessage}`
            : `whatsapp://send?abid=${encodeURIComponent(formattedRecipient)}&text=${encodedMessage}`;

          console.log('Trying to open WhatsApp app with URL:', whatsappAppUrl);

          // Use window.open to try opening the app in external browser
          // This will only work if the app is installed
          window.open(whatsappAppUrl, '_system');
        } catch (error) {
          console.error('Error opening WhatsApp app:', error);
          console.log('App may not have opened, opening external browser');

          // Create web URL based on whether it's a phone or email
          const webUrl = isValidPhone
            ? `https://wa.me/${formattedRecipient.replace('+', '')}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${formattedRecipient}&text=${encodedMessage}`;

          console.log('Opening in external browser:', webUrl);

          // Use window.open to open the external browser
          openExternalBrowser(webUrl);
        }
      } else {
        // On web browsers
        console.log('Web browser detected');

        // Use the more reliable wa.me format for web
        const webUrl = isValidPhone
          ? `https://wa.me/${formattedRecipient.replace('+', '')}?text=${encodedMessage}`
          : `https://web.whatsapp.com/send?phone=${formattedRecipient}&text=${encodedMessage}`;

        console.log('Opening in new tab:', webUrl);
        // For web testing, open in a new tab
        window.open(webUrl, '_blank');
      }

      showMessage('Opening WhatsApp...', 'success');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <IonContent className="whatsapp-container">
      {/* Header */}
      <div className="whatsapp-header">
        <h1 className="whatsapp-header-title">
          <IonIcon icon={logoWhatsapp} className="whatsapp-icon" />
          WhatsApp Messenger
        </h1>
      </div>

      {/* Content */}
      <div className="whatsapp-content">
        <div className="whatsapp-form">
          {/* Recipient Input */}
          <div className="form-group">
            <label htmlFor="recipient" className="form-label">Phone Number or Email</label>
            <input
              id="recipient"
              type="text"
              className="form-input"
              value={recipient}
              onChange={handleRecipientChange}
              placeholder="Example: +84123456789 or example@email.com"
            />
          </div>

          {/* Message Input */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              className="form-input form-textarea"
              value={message}
              onChange={handleMessageChange}
              placeholder="Enter your message here..."
              rows={5}
            ></textarea>
          </div>

          {/* Send Button */}
          <IonButton
            className="send-button"
            onClick={sendWhatsAppMessage}
          >
            <IonIcon icon={send} slot="start" />
            Send WhatsApp Message
          </IonButton>
        </div>
      </div>

      {/* Toast Notification */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        icon={toastColor === 'danger' ? warning : undefined}
        position="top"
      />
    </IonContent>
  );
};

export default Whatsapp;
