import { IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import FilesystemDemo from '../components/filesystem/FilesystemDemo';
import './Home.css';
import Whatsapp from '../components/browser/whatsapp';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonRow>
          <ExploreContainer />
        </IonRow> */}
        <IonRow>
          <FilesystemDemo />
        </IonRow>
        <IonRow>
          <Whatsapp />
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
