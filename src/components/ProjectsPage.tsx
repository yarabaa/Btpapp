import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Search, Calendar, MapPin, Euro, Users } from 'lucide-react';
import { Progress } from './ui/progress';
import type { UserRole } from '../App';
import { toast } from 'sonner@2.0.3';

interface ProjectsPageProps {
  userRole: UserRole;
}

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'planifie' | 'en_cours' | 'en_pause' | 'termine' | 'annule';
  description: string;
  manager: string;
  team: number;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Immeuble Résidentiel A',
    client: 'Société Immobilière Dupont',
    location: 'Paris 15ème',
    startDate: '2024-06-01',
    endDate: '2025-12-15',
    budget: 1200000,
    spent: 980000,
    progress: 85,
    status: 'en_cours',
    description: 'Construction d\'un immeuble résidentiel de 8 étages avec 24 appartements',
    manager: 'Jean Dupont',
    team: 25
  },
  {
    id: 2,
    name: 'Centre Commercial B',
    client: 'Groupe Retail France',
    location: 'Lyon',
    startDate: '2024-09-15',
    endDate: '2026-03-20',
    budget: 2500000,
    spent: 1100000,
    progress: 45,
    status: 'en_cours',
    description: 'Construction d\'un centre commercial de 5000m² avec parking',
    manager: 'Marie Martin',
    team: 45
  },
  {
    id: 3,
    name: 'Rénovation Mairie',
    client: 'Mairie de Marseille',
    location: 'Marseille',
    startDate: '2024-03-01',
    endDate: '2025-11-30',
    budget: 450000,
    spent: 415000,
    progress: 92,
    status: 'en_cours',
    description: 'Rénovation complète du bâtiment historique de la mairie',
    manager: 'Pierre Lefebvre',
    team: 15
  },
  {
    id: 4,
    name: 'Parking Souterrain',
    client: 'Ville de Toulouse',
    location: 'Toulouse Centre',
    startDate: '2024-08-01',
    endDate: '2025-10-15',
    budget: 800000,
    spent: 245000,
    progress: 30,
    status: 'en_cours',
    description: 'Construction d\'un parking souterrain de 200 places',
    manager: 'Sophie Bernard',
    team: 20
  },
  {
    id: 5,
    name: 'Complexe Sportif',
    client: 'Région Île-de-France',
    location: 'Nanterre',
    startDate: '2024-05-15',
    endDate: '2026-01-10',
    budget: 1800000,
    spent: 1220000,
    progress: 68,
    status: 'en_cours',
    description: 'Construction d\'un complexe sportif avec piscine et gymnase',
    manager: 'Marc Dubois',
    team: 35
  },
];

export function ProjectsPage({ userRole }: ProjectsPageProps) {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'tous' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planifie: { label: 'Planifié', className: 'bg-gray-100 text-gray-700' },
      en_cours: { label: 'En cours', className: 'bg-blue-100 text-blue-700' },
      en_pause: { label: 'En pause', className: 'bg-yellow-100 text-yellow-700' },
      termine: { label: 'Terminé', className: 'bg-green-100 text-green-700' },
      annule: { label: 'Annulé', className: 'bg-red-100 text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleCreateProject = () => {
    toast.success('Projet créé avec succès');
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des projets</h1>
          <p className="text-muted-foreground">Gérez tous vos projets de construction</p>
        </div>
        {(userRole === 'admin' || userRole === 'project_manager') && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau projet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer un nouveau projet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom du projet</Label>
                    <Input placeholder="Ex: Immeuble Résidentiel A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Client</Label>
                    <Input placeholder="Nom du client" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Description détaillée du projet" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Localisation</Label>
                    <Input placeholder="Adresse du projet" />
                  </div>
                  <div className="space-y-2">
                    <Label>Chef de projet</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Jean Dupont</SelectItem>
                        <SelectItem value="2">Marie Martin</SelectItem>
                        <SelectItem value="3">Pierre Lefebvre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin prévue</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget total (€)</Label>
                    <Input type="number" placeholder="Ex: 1200000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    <Select defaultValue="planifie">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planifie">Planifié</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="en_pause">En pause</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateProject}>
                    Créer le projet
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un projet, client ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="planifie">Planifié</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="en_pause">En pause</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{project.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <p className="text-sm">Client: {project.client}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progression</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p>{project.budget.toLocaleString('fr-FR')} €</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Équipe</p>
                    <p>{project.team} personnes</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {new Date(project.startDate).toLocaleDateString('fr-FR')} - {new Date(project.endDate).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
