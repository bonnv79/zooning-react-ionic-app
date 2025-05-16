import { IonButton, IonRow, IonTitle } from '@ionic/react';
import './whatsapp.css';

interface ContainerProps { }

const Whatsapp: React.FC<ContainerProps> = () => {
  const onClick = async () => {
    window.open('https://api.whatsapp.com/send?phone=+15551234567&text=Hello', '_blank');
  }

  return (
    <div>
      <div>
        <h3>Whatsapp</h3>
      </div>
      <div>
        <IonButton onClick={onClick}>Open Whatsapp</IonButton>
      </div>
    </div>
  );
};

export default Whatsapp;
