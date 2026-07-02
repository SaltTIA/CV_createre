import { CVProvider, useCV } from './context/CVContext';
import { EditorLayout } from './components/editor/EditorLayout';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { useState, useEffect } from 'react';

function AppContent() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem('cv-onboarded');
    if (!onboarded) setShowOnboarding(true);
  }, []);

  const handleSkip = () => {
    localStorage.setItem('cv-onboarded', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleSkip} onSkip={handleSkip} />;
  }

  return <EditorLayout />;
}

function App() {
  return (
    <CVProvider>
      <AppContent />
    </CVProvider>
  );
}

export default App;
