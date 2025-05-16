import React from 'react';
import { IonItem, IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { language } from 'ionicons/icons';
import { useLanguage, Language } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { language: currentLanguage, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (event: CustomEvent) => {
    const newLanguage = event.detail.value as Language;
    changeLanguage(newLanguage);
  };

  return (
    <IonItem className="language-switcher">
      <IonIcon slot="start" icon={language} />
      <IonLabel>{t('menu.language')}</IonLabel>
      <IonSelect 
        value={currentLanguage} 
        onIonChange={handleLanguageChange}
        interface="popover"
        className="language-select"
      >
        <IonSelectOption value="en">English</IonSelectOption>
        <IonSelectOption value="vi">Tiếng Việt</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default LanguageSwitcher;
