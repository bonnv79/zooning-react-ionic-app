import { IonButton, IonRow, IonTitle } from '@ionic/react';
import './FilesystemDemo.css';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';

interface ContainerProps { }

const FilesystemDemo: React.FC<ContainerProps> = () => {
  const fileAppend = async () => {
    alert('append file')
    await Filesystem.appendFile({
      path: 'text.txt',
      data: "MORE TESTS",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    alert('append success')
  }

  const fileRead = async () => {
    let contents = await Filesystem.readFile({
      path: 'text.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
    alert(JSON.stringify(contents));
  }

  return (
    <div>
      <div>
        <h3>Filesystem Demo</h3>
      </div>
      <div>
        <IonButton onClick={fileAppend}>Append File</IonButton>
        <IonButton onClick={fileRead}>Read File</IonButton>
      </div>
    </div>
  );
};

export default FilesystemDemo;
