import React from 'react';
import { IonItem, IonIcon, IonLabel, IonToggle } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <IonItem className="theme-toggle">
      <IonIcon slot="start" icon={isDarkMode ? moon : sunny} />
      <IonLabel>{t('menu.darkMode')}</IonLabel>
      <IonToggle 
        checked={isDarkMode}
        onIonChange={toggleTheme}
        slot="end"
        className="theme-toggle-switch"
      />
    </IonItem>
  );
};

export default ThemeToggle;
