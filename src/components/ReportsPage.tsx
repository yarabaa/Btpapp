import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Download, 
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { UserRole } from '../App';
import { toast } from 'sonner@2.0.3';

interface ReportsPageProps {
  userRole: UserRole;
}

interface Report {
  id: number;
  title: string;
  type: string;
  description: string;
  period: string;
  generatedDate: string;
  status: 'disponible' | 'en_generation';
}

const mockReports: Report[] = [
  {
    id: 1,
    title: 'Rapport mensuel - Octobre 2025',
    type: 'Mensuel',
    description: 'Synthèse complète des activités, finances et progression des projets',
    period: 'Octobre 2025',
    generatedDate: '2025-10-21',
    status: 'disponible'
  },
  {
    id: 2,
    title: 'Rapport financier - Q3 2025',
    type: 'Trimestriel',
    description: 'Analyse financière détaillée du troisième trimestre',
    period: 'Q3 2025',
    generatedDate: '2025-10-01',
    status: 'disponible'
  },
  {
    id: 3,
    title: 'Rapport de sécurité - Septembre 2025',
    type: 'Sécurité',
    description: 'Incidents, inspections et conformité des chantiers',
    period: 'Septembre 2025',
    generatedDate: '2025-10-05',
    status: 'disponible'
  },
  {
    id: 4,
    title: 'Rapport d\'avancement projets',
    type: 'Projets',
    description: 'État d\'avancement de tous les projets en cours',
    period: 'Semaine 42',
    generatedDate: '2025-10-20',
    status: 'disponible'
  },
  {
    id: 5,
    title: 'Rapport ressources humaines',
    type: 'RH',
    description: 'Utilisation du personnel et statistiques de présence',
    period: 'Octobre 2025',
    generatedDate: '2025-10-21',
    status: 'en_generation'
  },
];

const reportTemplates = [
  {
    id: 1,
    name: 'Rapport mensuel complet',
    description: 'Vue d\'ensemble de toutes les activités du mois',
    icon: FileText
  },
  {
    id: 2,
    name: 'Rapport financier',
    description: 'Analyse détaillée des revenus et dépenses',
    icon: TrendingUp
  },
  {
    id: 3,
    name: 'Rapport de sécurité',
    description: 'Conformité et incidents de sécurité',
    icon: FileText
  },
  {
    id: 4,
    name: 'Rapport d\'avancement',
    description: 'Progression des projets et chantiers',
    icon: TrendingUp
  },
];

export function ReportsPage({ userRole }: ReportsPageProps) {
  const handleGenerateReport = (templateName: string) => {
    toast.success(`Génération du ${templateName} en cours...`);
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast.success(`Téléchargement de "${reportTitle}" démarré`);
  };

  const getStatusBadge = (status: string) => {
    return status === 'disponible' ? (
      <Badge className="bg-green-100 text-green-700">Disponible</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-700">En génération</Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Rapports et analyses</h1>
        <p className="text-muted-foreground">Générez et consultez vos rapports d'activité</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rapports ce mois</p>
                <p className="text-2xl mt-1">12</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gain de temps</p>
                <p className="text-2xl mt-1">35%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projets suivis</p>
                <p className="text-2xl mt-1">12</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chantiers actifs</p>
                <p className="text-2xl mt-1">8</p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Générer un nouveau rapport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <Icon className="h-10 w-10 text-primary mb-3" />
                    <h4 className="mb-2">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateReport(template.name)}
                    >
                      Générer
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select defaultValue="tous">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les types</SelectItem>
                <SelectItem value="mensuel">Mensuel</SelectItem>
                <SelectItem value="trimestriel">Trimestriel</SelectItem>
                <SelectItem value="securite">Sécurité</SelectItem>
                <SelectItem value="projets">Projets</SelectItem>
                <SelectItem value="rh">RH</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="tous_periodes">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous_periodes">Toutes les périodes</SelectItem>
                <SelectItem value="mois_en_cours">Mois en cours</SelectItem>
                <SelectItem value="trimestre_en_cours">Trimestre en cours</SelectItem>
                <SelectItem value="annee_en_cours">Année en cours</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Plus de filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Rapports disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <FileText className="h-10 w-10 text-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{report.title}</h4>
                      <Badge variant="outline">{report.type}</Badge>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Période: {report.period}</span>
                      <span>•</span>
                      <span>Généré le {new Date(report.generatedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === 'disponible' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(report.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-blue-900">Performance en hausse</h4>
                <p className="text-sm text-blue-700 mt-1">
                  La productivité des chantiers a augmenté de 12% ce mois-ci par rapport au mois dernier
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-green-900">Délais respectés</h4>
                <p className="text-sm text-green-700 mt-1">
                  85% des projets respectent leurs échéances prévues ce trimestre
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
