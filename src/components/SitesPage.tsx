import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { MapPin, Users, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import type { UserRole } from '../App';

interface SitesPageProps {
  userRole: UserRole;
}

interface Site {
  id: number;
  name: string;
  project: string;
  location: string;
  manager: string;
  workers: number;
  status: 'actif' | 'inactif' | 'inspection';
  lastInspection: string;
  nextInspection: string;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  status: 'en_attente' | 'en_cours' | 'termine';
  priority: 'haute' | 'moyenne' | 'basse';
  assignedTo: string;
  dueDate: string;
}

const mockSites: Site[] = [
  {
    id: 1,
    name: 'Chantier Principal A1',
    project: 'Immeuble Résidentiel A',
    location: '123 Rue de la République, Paris 15ème',
    manager: 'Jean Dupont',
    workers: 25,
    status: 'actif',
    lastInspection: '2025-10-15',
    nextInspection: '2025-10-29',
    tasks: [
      { id: 1, title: 'Coulage dalle étage 4', status: 'en_cours', priority: 'haute', assignedTo: 'Équipe Maçonnerie', dueDate: '2025-10-25' },
      { id: 2, title: 'Installation électrique étage 3', status: 'en_attente', priority: 'moyenne', assignedTo: 'Équipe Électricité', dueDate: '2025-10-28' },
      { id: 3, title: 'Plomberie étage 2', status: 'termine', priority: 'moyenne', assignedTo: 'Équipe Plomberie', dueDate: '2025-10-20' },
    ]
  },
  {
    id: 2,
    name: 'Site Commercial B',
    project: 'Centre Commercial B',
    location: '45 Avenue du Commerce, Lyon',
    manager: 'Marie Martin',
    workers: 45,
    status: 'actif',
    lastInspection: '2025-10-18',
    nextInspection: '2025-11-01',
    tasks: [
      { id: 4, title: 'Fondations zone parking', status: 'en_cours', priority: 'haute', assignedTo: 'Équipe Terrassement', dueDate: '2025-10-26' },
      { id: 5, title: 'Structure métallique hall principal', status: 'en_cours', priority: 'haute', assignedTo: 'Équipe Charpente', dueDate: '2025-11-05' },
    ]
  },
  {
    id: 3,
    name: 'Chantier Rénovation Mairie',
    project: 'Rénovation Mairie',
    location: 'Place de la Mairie, Marseille',
    manager: 'Pierre Lefebvre',
    workers: 15,
    status: 'actif',
    lastInspection: '2025-10-20',
    nextInspection: '2025-10-27',
    tasks: [
      { id: 6, title: 'Finitions façade principale', status: 'en_cours', priority: 'moyenne', assignedTo: 'Équipe Façade', dueDate: '2025-10-30' },
      { id: 7, title: 'Peinture intérieure', status: 'en_attente', priority: 'basse', assignedTo: 'Équipe Peinture', dueDate: '2025-11-10' },
    ]
  },
];

export function SitesPage({ userRole }: SitesPageProps) {
  const [sites] = useState<Site[]>(mockSites);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { label: 'Actif', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      inactif: { label: 'Inactif', className: 'bg-gray-100 text-gray-700', icon: AlertCircle },
      inspection: { label: 'En inspection', className: 'bg-orange-100 text-orange-700', icon: AlertCircle },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getTaskStatusBadge = (status: string) => {
    const statusConfig = {
      en_attente: { label: 'En attente', className: 'bg-gray-100 text-gray-700' },
      en_cours: { label: 'En cours', className: 'bg-blue-100 text-blue-700' },
      termine: { label: 'Terminé', className: 'bg-green-100 text-green-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      haute: { label: 'Haute', className: 'bg-red-100 text-red-700' },
      moyenne: { label: 'Moyenne', className: 'bg-yellow-100 text-yellow-700' },
      basse: { label: 'Basse', className: 'bg-blue-100 text-blue-700' },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des chantiers</h1>
          <p className="text-muted-foreground">Suivez vos chantiers et leurs tâches</p>
        </div>
        {(userRole === 'admin' || userRole === 'project_manager') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau chantier
          </Button>
        )}
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Liste des chantiers</TabsTrigger>
          <TabsTrigger value="calendar">Planning</TabsTrigger>
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {sites.map((site) => (
            <Card key={site.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{site.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{site.project}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{site.location}</span>
                    </div>
                  </div>
                  {getStatusBadge(site.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Chef de chantier</p>
                      <p className="text-sm">{site.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ouvriers</p>
                      <p className="text-sm">{site.workers} personnes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prochaine inspection</p>
                      <p className="text-sm">{new Date(site.nextInspection).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="mb-3">Tâches en cours</h4>
                  <div className="space-y-2">
                    {site.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm mb-1">{task.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{task.assignedTo}</span>
                            <span>•</span>
                            <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(task.priority)}
                          {getTaskStatusBadge(task.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" size="sm">Voir détails</Button>
                  <Button variant="outline" size="sm">Planning</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Planning des chantiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4>Inspections prévues</h4>
                    </div>
                    <div className="space-y-2">
                      {sites.map(site => (
                        <div key={site.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="text-sm">{site.name}</p>
                            <p className="text-xs text-muted-foreground">{site.location}</p>
                          </div>
                          <Badge variant="outline">
                            {new Date(site.nextInspection).toLocaleDateString('fr-FR')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les tâches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sites.flatMap(site => 
                  site.tasks.map(task => (
                    <div key={task.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4>{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {site.name} - {task.assignedTo}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(task.priority)}
                          {getTaskStatusBadge(task.status)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
