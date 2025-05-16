import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import Whatsapp from '../components/browser/whatsapp';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './WhatsappPage.css';

const WhatsappPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  
  return (
    <IonPage className={isDarkMode ? 'dark-page' : 'light-page'}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t('menu.whatsapp')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="whatsapp-page-content">
        <Whatsapp />
      </IonContent>
    </IonPage>
  );
};

export default WhatsappPage;
