import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestPage } from './pages/test-page/test-page';
import { AppDataContextProvider } from './contexts/app-data-context';
import { Toast } from 'primereact/toast';
import { useAppSharedContext } from './contexts/app-shared-context';
import { ConfirmDialog } from 'primereact/confirmdialog';


function App() {
  const { toast } = useAppSharedContext();

  return (
    <div style={{ width: '100vw', height: '100%' }} className="App">
      <BrowserRouter>
        <AppDataContextProvider>
          <Routes>
            <Route path='/' element={<TestPage />} />
          </Routes>
          <Toast ref={toast} />
          <ConfirmDialog />
        </AppDataContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
