import { IonButton, IonContent, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, isPlatform, IonToast } from '@ionic/react';
import './FilesystemDemo.css';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface ContainerProps { }

const FilesystemDemo: React.FC<ContainerProps> = () => {
  const [fileStatus, setFileStatus] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [platformInfo, setPlatformInfo] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Get the appropriate directory based on platform
  const getDirectory = () => {
    // On iOS, we need to use Documents directory to be visible in Files app
    if (isPlatform('ios')) {
      return Directory.Documents;
    } else if (isPlatform('android')) {
      return Directory.Documents;
    } else {
      // For web testing
      return Directory.Data;
    }
  };

  // Check if the plugin is available
  const isFilesystemAvailable = () => {
    return Capacitor.isPluginAvailable('Filesystem');
  };

  useEffect(() => {
    // Display platform information for debugging
    const platform = isPlatform('ios') ? 'iOS' : isPlatform('android') ? 'Android' : 'Web';
    const pluginStatus = isFilesystemAvailable() ? 'available' : 'NOT available';
    setPlatformInfo(`Running on ${platform} platform using ${getDirectory()} directory. Filesystem plugin is ${pluginStatus}`);
  }, []);

  // Create a directory to store files
  const createDirectory = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Creating directory...');
      setErrorMessage('');

      const result = await Filesystem.mkdir({
        path: 'zooning-files',
        directory: getDirectory(),
        recursive: true // Create parent directories if they don't exist
      });

      setFileStatus('Directory created successfully!');
      console.log('Directory created', result);
    } catch (error) {
      console.error('Error creating directory', error);
      setErrorMessage(`Error creating directory: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Write a file
  const fileWrite = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Writing file...');
      setErrorMessage('');

      const timestamp = new Date().toISOString();
      const data = `File content created at ${timestamp}`;

      await Filesystem.writeFile({
        path: 'zooning-files/text.txt',
        data: data,
        directory: getDirectory(),
        encoding: Encoding.UTF8
      });

      setFileStatus('File written successfully!');
    } catch (error) {
      console.error('Error writing file', error);
      setErrorMessage(`Error writing file: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Append to a file
  const fileAppend = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Appending to file...');
      setErrorMessage('');

      const timestamp = new Date().toISOString();
      const data = `\nAppended content at ${timestamp}`;

      await Filesystem.appendFile({
        path: 'zooning-files/text.txt',
        data: data,
        directory: getDirectory(),
        encoding: Encoding.UTF8
      });

      setFileStatus('Content appended successfully!');
    } catch (error) {
      console.error('Error appending to file', error);
      setErrorMessage(`Error appending to file: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Read a file
  const fileRead = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Reading file...');
      setErrorMessage('');
      setFileContent('');

      const result = await Filesystem.readFile({
        path: 'zooning-files/text.txt',
        directory: getDirectory(),
        encoding: Encoding.UTF8
      });

      // Ensure we're setting a string to the state
      setFileContent(typeof result.data === 'string' ? result.data : 'Content is not text-based');
      setFileStatus('File read successfully!');
    } catch (error) {
      console.error('Error reading file', error);
      setErrorMessage(`Error reading file: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // List files in directory
  const listFiles = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Listing files...');
      setErrorMessage('');
      setFileContent('');

      const result = await Filesystem.readdir({
        path: 'zooning-files',
        directory: getDirectory()
      });

      const fileList = result.files.map(file => `${file.name} (${file.type})`).join('\n');
      setFileContent(`Files in directory:\n${fileList}`);
      setFileStatus('Files listed successfully!');
    } catch (error) {
      console.error('Error listing files', error);
      setErrorMessage(`Error listing files: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Delete a file
  const deleteFile = async () => {
    if (!isFilesystemAvailable()) {
      setToastMessage('Filesystem plugin is not available');
      setShowToast(true);
      return;
    }

    try {
      setFileStatus('Deleting file...');
      setErrorMessage('');

      await Filesystem.deleteFile({
        path: 'zooning-files/text.txt',
        directory: getDirectory()
      });

      setFileStatus('File deleted successfully!');
      setFileContent('');
    } catch (error) {
      console.error('Error deleting file', error);
      setErrorMessage(`Error deleting file: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Create files visible in iOS Files app
  const createVisibleFilesForIOS = async () => {
    setFileStatus('Creating files visible in iOS Files app...');
    setErrorMessage('');

    try {
      // 1. Create a folder that will be visible in Files app
      await Filesystem.mkdir({
        path: 'ZooningAppFiles',
        directory: Directory.Documents,
        recursive: true
      });

      // 2. Create a text file inside the folder
      const timestamp = new Date().toISOString();
      const data = `This file was created at ${timestamp} and should be visible in the iOS Files app.\n\nYou can find this file by opening the Files app, then navigating to On My iPhone/iPad > ZooningAppFiles`;

      await Filesystem.writeFile({
        path: 'ZooningAppFiles/visible-file.txt',
        data: data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      // 3. Create a second file to demonstrate multiple files
      const jsonData = JSON.stringify({
        createdAt: timestamp,
        appName: 'Zooning App',
        description: 'This is a JSON file created by the Zooning App',
        isVisible: true
      }, null, 2);

      await Filesystem.writeFile({
        path: 'ZooningAppFiles/app-data.json',
        data: jsonData,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      // List the files to show what was created
      const result = await Filesystem.readdir({
        path: 'ZooningAppFiles',
        directory: Directory.Documents
      });

      const fileList = result.files.map(file => `${file.name} (${file.type})`).join('\n');
      setFileContent(`Files created in ZooningAppFiles directory:\n${fileList}\n\nFile contents:\n${data}`);
      setFileStatus('Files created successfully! Open the Files app on your iOS device to view them.');
    } catch (error) {
      console.error('Error creating visible files', error);
      setErrorMessage(`Error creating visible files: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  // Open the Files app to view the created files
  const openFilesApp = async () => {
    try {
      setFileStatus('Attempting to open the Files app...');
      
      // Get the URI for the Documents directory
      const result = await Filesystem.getUri({
        path: 'ZooningAppFiles',
        directory: Directory.Documents
      });
      
      // Display the URI for user reference
      setFileContent(`The URI to your files is: ${result.uri}\n\nTo view your files manually:\n1. Open the Files app\n2. Navigate to "On My iPhone/iPad"\n3. Look for the ZooningAppFiles folder`);
      
      setFileStatus('Please open the Files app manually to view your files');
    } catch (error) {
      console.error('Error getting URI', error);
      setErrorMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <IonContent>
      <div className="container">
        <h3>Filesystem Demo</h3>

        {platformInfo && (
          <div className="platform-info">
            <p>{platformInfo}</p>
          </div>
        )}

        <IonRow className="ion-justify-content-center ion-margin-vertical">
          <IonButton onClick={createDirectory}>Create Directory</IonButton>
          <IonButton onClick={fileWrite}>Write File</IonButton>
          <IonButton onClick={fileAppend}>Append File</IonButton>
          <IonButton onClick={fileRead}>Read File</IonButton>
          <IonButton onClick={listFiles}>List Files</IonButton>
          <IonButton onClick={deleteFile} color="danger">Delete File</IonButton>
        </IonRow>

        {isPlatform('ios') && (
          <IonRow className="ion-justify-content-center ion-margin-vertical">
            <IonButton onClick={createVisibleFilesForIOS} color="tertiary">
              Create Files Visible in iOS Files App
            </IonButton>
            <IonButton onClick={openFilesApp} color="secondary">
              View Files Location
            </IonButton>
          </IonRow>
        )}

        {fileStatus && (
          <IonItem lines="none">
            <IonLabel>
              <h2>Status</h2>
              <IonText color="primary">{fileStatus}</IonText>
            </IonLabel>
          </IonItem>
        )}

        {errorMessage && (
          <IonItem lines="none">
            <IonLabel>
              <h2>Error</h2>
              <IonText color="danger">{errorMessage}</IonText>
            </IonLabel>
          </IonItem>
        )}

        {fileContent && (
          <IonItem lines="none">
            <IonLabel>
              <h2>File Content</h2>
              <pre className="file-content">{fileContent}</pre>
            </IonLabel>
          </IonItem>
        )}
      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="bottom"
        color="warning"
      />
    </IonContent>
  );
};

export default FilesystemDemo;
