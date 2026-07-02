import { CVProvider } from './context/CVContext';
import { EditorLayout } from './components/editor/EditorLayout';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function OnboardingPage() {
  const navigate = useNavigate();
  const handleComplete = () => {
    localStorage.setItem('cv-onboarded', 'true');
    navigate('/editor');
  };

  return <OnboardingWizard onComplete={handleComplete} />;
}

function EditorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const onboarded = localStorage.getItem('cv-onboarded');
    if (!onboarded) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <EditorLayout />;
}

function App() {
  return (
    <CVProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </HashRouter>
    </CVProvider>
  );
}

export default App;
