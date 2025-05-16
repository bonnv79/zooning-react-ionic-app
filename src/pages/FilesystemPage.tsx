import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import FilesystemDemo from '../components/filesystem/FilesystemDemo';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './FilesystemPage.css';

const FilesystemPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  
  return (
    <IonPage className={isDarkMode ? 'dark-page' : 'light-page'}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t('menu.filesystem')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="filesystem-content">
        <FilesystemDemo />
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
