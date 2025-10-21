import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  FolderKanban, 
  HardHat, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import type { UserRole } from '../App';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardProps {
  userRole: UserRole;
}

// Mock data
const statsData = [
  { id: 1, label: 'Projets actifs', value: 12, icon: FolderKanban, color: 'text-blue-500' },
  { id: 2, label: 'Chantiers en cours', value: 8, icon: HardHat, color: 'text-orange-500' },
  { id: 3, label: 'Personnel actif', value: 145, icon: Users, color: 'text-green-500' },
  { id: 4, label: 'Taux de progression', value: 78, icon: TrendingUp, color: 'text-purple-500', suffix: '%' },
];

const projectsData = [
  { id: 1, name: 'Immeuble Résidentiel A', progress: 85, budget: 1200000, spent: 980000, status: 'en_cours', deadline: '2025-12-15' },
  { id: 2, name: 'Centre Commercial B', progress: 45, budget: 2500000, spent: 1100000, status: 'en_cours', deadline: '2026-03-20' },
  { id: 3, name: 'Rénovation Mairie', progress: 92, budget: 450000, spent: 415000, status: 'en_cours', deadline: '2025-11-30' },
  { id: 4, name: 'Parking Souterrain', progress: 30, budget: 800000, spent: 245000, status: 'en_retard', deadline: '2025-10-15' },
  { id: 5, name: 'Complexe Sportif', progress: 68, budget: 1800000, spent: 1220000, status: 'en_cours', deadline: '2026-01-10' },
];

const monthlyBudgetData = [
  { month: 'Jan', budget: 250000, depense: 235000 },
  { month: 'Fév', budget: 280000, depense: 275000 },
  { month: 'Mar', budget: 320000, depense: 298000 },
  { month: 'Avr', budget: 290000, depense: 305000 },
  { month: 'Mai', budget: 350000, depense: 340000 },
  { month: 'Jun', budget: 380000, depense: 362000 },
];

const resourceUtilizationData = [
  { resource: 'Maçons', utilization: 92 },
  { resource: 'Électriciens', utilization: 78 },
  { resource: 'Plombiers', utilization: 85 },
  { resource: 'Charpentiers', utilization: 70 },
  { resource: 'Peintres', utilization: 65 },
];

export function Dashboard({ userRole }: DashboardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_cours':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">En cours</Badge>;
      case 'en_retard':
        return <Badge variant="destructive">En retard</Badge>;
      case 'termine':
        return <Badge className="bg-green-100 text-green-700">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de vos projets et chantiers BTP</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl mt-2">
                      {stat.value}{stat.suffix}
                    </p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Suivi budgétaire mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyBudgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                <Legend />
                <Line type="monotone" dataKey="budget" stroke="#3b82f6" name="Budget" strokeWidth={2} />
                <Line type="monotone" dataKey="depense" stroke="#ef4444" name="Dépense" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Taux d'utilisation des ressources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceUtilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="resource" type="category" width={100} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="utilization" fill="#22c55e" name="Utilisation (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Projets en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{project.name}</h4>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {project.spent.toLocaleString('fr-FR')} € / {project.budget.toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((project.spent / project.budget) * 100).toFixed(1)}% du budget
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-orange-900">Attention requise</h4>
                <p className="text-sm text-orange-700 mt-1">
                  3 chantiers nécessitent une vérification de sécurité cette semaine
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-green-900">Tâches complétées</h4>
                <p className="text-sm text-green-700 mt-1">
                  15 tâches ont été complétées aujourd'hui avec succès
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
