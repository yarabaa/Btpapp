import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProjectsPage } from './components/ProjectsPage';
import { SitesPage } from './components/SitesPage';
import { ResourcesPage } from './components/ResourcesPage';
import { FinancePage } from './components/FinancePage';
import { ReportsPage } from './components/ReportsPage';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'admin' | 'project_manager' | 'site_manager' | 'worker';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [userRole] = useState<UserRole>('admin'); // Simulated user role
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'projects':
        return <ProjectsPage userRole={userRole} />;
      case 'sites':
        return <SitesPage userRole={userRole} />;
      case 'resources':
        return <ResourcesPage userRole={userRole} />;
      case 'finance':
        return <FinancePage userRole={userRole} />;
      case 'reports':
        return <ReportsPage userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}
