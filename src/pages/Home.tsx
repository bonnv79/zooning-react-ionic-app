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
import './Home.css';

const Home: React.FC = () => {
  return (
    <>
      {/* Side Menu */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/home" routerDirection="root">
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>Trang chủ</IonLabel>
            </IonItem>
            <IonItem routerLink="/filesystem" routerDirection="forward">
              <IonIcon slot="start" icon={folderOutline} />
              <IonLabel>Filesystem Demo</IonLabel>
            </IonItem>
            <IonItem routerLink="/whatsapp" routerDirection="forward">
              <IonIcon slot="start" icon={logoWhatsapp} />
              <IonLabel>WhatsApp</IonLabel>
            </IonItem>
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
            <IonTitle>Trang chủ</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Chào mừng đến với ứng dụng demo</h2>
          <p>Vui lòng chọn một chức năng từ menu để bắt đầu.</p>
          
          <div className="home-features">
            <div className="feature-card" onClick={() => window.location.href = '/filesystem'}>
              <IonIcon icon={folderOutline} />
              <h3>Filesystem Demo</h3>
              <p>Quản lý và lưu trữ file trên thiết bị</p>
            </div>
            
            <div className="feature-card" onClick={() => window.location.href = '/whatsapp'}>
              <IonIcon icon={logoWhatsapp} />
              <h3>WhatsApp</h3>
              <p>Truy cập tính năng WhatsApp</p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
