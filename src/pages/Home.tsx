import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonMenu, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonMenuButton, 
  IonButtons
} from '@ionic/react';
import { folderOutline, logoWhatsapp, homeOutline } from 'ionicons/icons';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './Home.css';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Side Menu */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t('menu.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/home" routerDirection="root">
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>{t('menu.home')}</IonLabel>
            </IonItem>
            <IonItem routerLink="/filesystem" routerDirection="forward">
              <IonIcon slot="start" icon={folderOutline} />
              <IonLabel>{t('menu.filesystem')}</IonLabel>
            </IonItem>
            <IonItem routerLink="/whatsapp" routerDirection="forward">
              <IonIcon slot="start" icon={logoWhatsapp} />
              <IonLabel>{t('menu.whatsapp')}</IonLabel>
            </IonItem>
            <LanguageSwitcher />
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Content */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>{t('home.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>{t('home.welcome')}</h2>
          <p>{t('home.choose')}</p>
          
          <div className="home-features">
            <div className="feature-card" onClick={() => window.location.href = '/filesystem'}>
              <IonIcon icon={folderOutline} />
              <h3>{t('home.filesystem.title')}</h3>
              <p>{t('home.filesystem.desc')}</p>
            </div>
            
            <div className="feature-card" onClick={() => window.location.href = '/whatsapp'}>
              <IonIcon icon={logoWhatsapp} />
              <h3>{t('home.whatsapp.title')}</h3>
              <p>{t('home.whatsapp.desc')}</p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
