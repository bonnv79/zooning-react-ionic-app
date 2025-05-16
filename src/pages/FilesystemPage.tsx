import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import FilesystemDemo from '../components/filesystem/FilesystemDemo';

const FilesystemPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Filesystem Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <FilesystemDemo />
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
