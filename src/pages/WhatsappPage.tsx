import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import Whatsapp from '../components/browser/whatsapp';

const WhatsappPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Whatsapp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Whatsapp />
      </IonContent>
    </IonPage>
  );
};

export default WhatsappPage;
