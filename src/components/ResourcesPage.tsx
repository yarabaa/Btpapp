import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Wrench, 
  Plus, 
  Search,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Progress } from './ui/progress';
import type { UserRole } from '../App';

interface ResourcesPageProps {
  userRole: UserRole;
}

interface Worker {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: 'actif' | 'conge' | 'absent';
  currentSite: string;
  skills: string[];
}

interface Equipment {
  id: number;
  name: string;
  type: string;
  status: 'disponible' | 'en_usage' | 'maintenance' | 'hors_service';
  location: string;
  nextMaintenance: string;
  usage: number;
}

const mockWorkers: Worker[] = [
  {
    id: 1,
    name: 'Marc Dubois',
    role: 'Chef d\'équipe Maçonnerie',
    phone: '06 12 34 56 78',
    email: 'marc.dubois@example.com',
    status: 'actif',
    currentSite: 'Chantier Principal A1',
    skills: ['Maçonnerie', 'Gestion d\'équipe', 'Lecture de plans']
  },
  {
    id: 2,
    name: 'Sophie Bernard',
    role: 'Électricienne',
    phone: '06 23 45 67 89',
    email: 'sophie.bernard@example.com',
    status: 'actif',
    currentSite: 'Site Commercial B',
    skills: ['Électricité', 'Domotique', 'Habilitation électrique']
  },
  {
    id: 3,
    name: 'Thomas Petit',
    role: 'Plombier',
    phone: '06 34 56 78 90',
    email: 'thomas.petit@example.com',
    status: 'conge',
    currentSite: '-',
    skills: ['Plomberie', 'Chauffage', 'Climatisation']
  },
  {
    id: 4,
    name: 'Lucie Martin',
    role: 'Peintre',
    phone: '06 45 67 89 01',
    email: 'lucie.martin@example.com',
    status: 'actif',
    currentSite: 'Chantier Rénovation Mairie',
    skills: ['Peinture', 'Ravalement', 'Décoration']
  },
  {
    id: 5,
    name: 'Alexandre Lefebvre',
    role: 'Charpentier',
    phone: '06 56 78 90 12',
    email: 'alex.lefebvre@example.com',
    status: 'actif',
    currentSite: 'Site Commercial B',
    skills: ['Charpente', 'Menuiserie', 'Couverture']
  },
];

const mockEquipment: Equipment[] = [
  {
    id: 1,
    name: 'Grue à tour GT-500',
    type: 'Levage',
    status: 'en_usage',
    location: 'Chantier Principal A1',
    nextMaintenance: '2025-11-15',
    usage: 75
  },
  {
    id: 2,
    name: 'Bétonnière B-300',
    type: 'Maçonnerie',
    status: 'disponible',
    location: 'Dépôt Central',
    nextMaintenance: '2025-12-01',
    usage: 45
  },
  {
    id: 3,
    name: 'Excavatrice EX-200',
    type: 'Terrassement',
    status: 'en_usage',
    location: 'Site Commercial B',
    nextMaintenance: '2025-10-30',
    usage: 88
  },
  {
    id: 4,
    name: 'Nacelle élévatrice NE-15',
    type: 'Accès en hauteur',
    status: 'maintenance',
    location: 'Atelier de maintenance',
    nextMaintenance: '2025-10-25',
    usage: 92
  },
  {
    id: 5,
    name: 'Compresseur CP-100',
    type: 'Pneumatique',
    status: 'disponible',
    location: 'Dépôt Central',
    nextMaintenance: '2025-11-20',
    usage: 30
  },
  {
    id: 6,
    name: 'Échafaudage modulaire',
    type: 'Accès',
    status: 'en_usage',
    location: 'Chantier Rénovation Mairie',
    nextMaintenance: '2025-12-10',
    usage: 60
  },
];

export function ResourcesPage({ userRole }: ResourcesPageProps) {
  const [workers] = useState<Worker[]>(mockWorkers);
  const [equipment] = useState<Equipment[]>(mockEquipment);
  const [searchTerm, setSearchTerm] = useState('');

  const getWorkerStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { label: 'Actif', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      conge: { label: 'En congé', className: 'bg-orange-100 text-orange-700', icon: Clock },
      absent: { label: 'Absent', className: 'bg-red-100 text-red-700', icon: XCircle },
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

  const getEquipmentStatusBadge = (status: string) => {
    const statusConfig = {
      disponible: { label: 'Disponible', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      en_usage: { label: 'En usage', className: 'bg-blue-100 text-blue-700', icon: Clock },
      maintenance: { label: 'Maintenance', className: 'bg-orange-100 text-orange-700', icon: Wrench },
      hors_service: { label: 'Hors service', className: 'bg-red-100 text-red-700', icon: XCircle },
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

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des ressources</h1>
          <p className="text-muted-foreground">Personnel et matériel</p>
        </div>
        {(userRole === 'admin' || userRole === 'project_manager') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une ressource
          </Button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Personnel actif</p>
                <p className="text-2xl mt-1">
                  {workers.filter(w => w.status === 'actif').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En congé</p>
                <p className="text-2xl mt-1">
                  {workers.filter(w => w.status === 'conge').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Équipements disponibles</p>
                <p className="text-2xl mt-1">
                  {equipment.filter(e => e.status === 'disponible').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En maintenance</p>
                <p className="text-2xl mt-1">
                  {equipment.filter(e => e.status === 'maintenance').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personnel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="equipment">Matériel</TabsTrigger>
        </TabsList>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <TabsContent value="personnel" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredWorkers.map((worker) => (
              <Card key={worker.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{worker.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{worker.role}</p>
                    </div>
                    {getWorkerStatusBadge(worker.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{worker.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{worker.email}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Chantier actuel</p>
                    <p className="text-sm">{worker.currentSite}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Compétences</p>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">Voir profil</Button>
                    <Button variant="outline" size="sm">Affecter</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEquipment.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{item.type}</p>
                    </div>
                    {getEquipmentStatusBadge(item.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="text-sm mt-1">{item.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prochaine maintenance</p>
                      <p className="text-sm mt-1">
                        {new Date(item.nextMaintenance).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Taux d'utilisation</span>
                      <span>{item.usage}%</span>
                    </div>
                    <Progress value={item.usage} />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">Historique</Button>
                    <Button variant="outline" size="sm">Réserver</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
