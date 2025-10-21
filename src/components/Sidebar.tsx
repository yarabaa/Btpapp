import { 
  LayoutDashboard, 
  FolderKanban, 
  HardHat, 
  Users, 
  Wrench,
  Euro,
  FileText,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import type { UserRole } from '../App';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRole;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle, userRole }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, roles: ['admin', 'project_manager', 'site_manager'] },
    { id: 'projects', label: 'Projets', icon: FolderKanban, roles: ['admin', 'project_manager'] },
    { id: 'sites', label: 'Chantiers', icon: HardHat, roles: ['admin', 'project_manager', 'site_manager'] },
    { id: 'resources', label: 'Ressources', icon: Users, roles: ['admin', 'project_manager', 'site_manager'] },
    { id: 'finance', label: 'Finances', icon: Euro, roles: ['admin', 'project_manager'] },
    { id: 'reports', label: 'Rapports', icon: FileText, roles: ['admin', 'project_manager'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <aside
      className={cn(
        'bg-card border-r border-border transition-all duration-300 flex flex-col',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-primary">BTP Manager</h1>
              <p className="text-xs text-muted-foreground">Gestion de projet</p>
            </div>
          </div>
        )}
        {!isOpen && (
          <Building2 className="h-8 w-8 text-primary mx-auto" />
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    !isOpen && 'justify-center px-2'
                  )}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn('w-full', !isOpen && 'px-2')}
          onClick={onToggle}
        >
          {isOpen ? (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Réduire
            </>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
