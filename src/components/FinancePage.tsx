import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  Plus,
  Download
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import type { UserRole } from '../App';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface FinancePageProps {
  userRole: UserRole;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
  type: 'depense' | 'revenu';
  status: 'paye' | 'en_attente' | 'prevu';
}

interface Invoice {
  id: number;
  number: string;
  client: string;
  project: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'payee' | 'en_attente' | 'en_retard';
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: '2025-10-20',
    description: 'Achat matériaux - Béton',
    project: 'Immeuble Résidentiel A',
    category: 'Matériaux',
    amount: 15000,
    type: 'depense',
    status: 'paye'
  },
  {
    id: 2,
    date: '2025-10-19',
    description: 'Salaires équipe maçonnerie',
    project: 'Centre Commercial B',
    category: 'Main d\'œuvre',
    amount: 25000,
    type: 'depense',
    status: 'paye'
  },
  {
    id: 3,
    date: '2025-10-18',
    description: 'Facture client - Acompte 3',
    project: 'Rénovation Mairie',
    category: 'Facturation',
    amount: 45000,
    type: 'revenu',
    status: 'paye'
  },
  {
    id: 4,
    date: '2025-10-17',
    description: 'Location grue',
    project: 'Immeuble Résidentiel A',
    category: 'Location matériel',
    amount: 8000,
    type: 'depense',
    status: 'paye'
  },
  {
    id: 5,
    date: '2025-10-25',
    description: 'Achat matériaux - Acier',
    project: 'Centre Commercial B',
    category: 'Matériaux',
    amount: 32000,
    type: 'depense',
    status: 'prevu'
  },
];

const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: 'FAC-2025-001',
    client: 'Société Immobilière Dupont',
    project: 'Immeuble Résidentiel A',
    date: '2025-10-01',
    dueDate: '2025-10-31',
    amount: 120000,
    status: 'payee'
  },
  {
    id: 2,
    number: 'FAC-2025-002',
    client: 'Groupe Retail France',
    project: 'Centre Commercial B',
    date: '2025-10-05',
    dueDate: '2025-11-05',
    amount: 250000,
    status: 'en_attente'
  },
  {
    id: 3,
    number: 'FAC-2025-003',
    client: 'Mairie de Marseille',
    project: 'Rénovation Mairie',
    date: '2025-09-15',
    dueDate: '2025-10-15',
    amount: 45000,
    status: 'en_retard'
  },
];

const expensesByCategory = [
  { name: 'Matériaux', value: 350000 },
  { name: 'Main d\'œuvre', value: 520000 },
  { name: 'Location matériel', value: 120000 },
  { name: 'Sous-traitance', value: 180000 },
  { name: 'Transport', value: 45000 },
  { name: 'Autres', value: 35000 },
];

const monthlyFinancials = [
  { month: 'Jan', revenus: 450000, depenses: 380000 },
  { month: 'Fév', revenus: 520000, depenses: 420000 },
  { month: 'Mar', revenus: 580000, depenses: 490000 },
  { month: 'Avr', revenus: 490000, depenses: 445000 },
  { month: 'Mai', revenus: 620000, depenses: 530000 },
  { month: 'Jun', revenus: 680000, depenses: 580000 },
];

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function FinancePage({ userRole }: FinancePageProps) {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [invoices] = useState<Invoice[]>(mockInvoices);

  const totalRevenues = transactions
    .filter(t => t.type === 'revenu' && t.status === 'paye')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'depense' && t.status === 'paye')
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionBadge = (type: string) => {
    return type === 'depense' ? (
      <Badge variant="outline" className="bg-red-50 text-red-700">
        <TrendingDown className="h-3 w-3 mr-1" />
        Dépense
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-green-50 text-green-700">
        <TrendingUp className="h-3 w-3 mr-1" />
        Revenu
      </Badge>
    );
  };

  const getInvoiceStatusBadge = (status: string) => {
    const statusConfig = {
      payee: { label: 'Payée', className: 'bg-green-100 text-green-700' },
      en_attente: { label: 'En attente', className: 'bg-orange-100 text-orange-700' },
      en_retard: { label: 'En retard', className: 'bg-red-100 text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paye: { label: 'Payé', className: 'bg-green-100 text-green-700' },
      en_attente: { label: 'En attente', className: 'bg-orange-100 text-orange-700' },
      prevu: { label: 'Prévu', className: 'bg-blue-100 text-blue-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion financière</h1>
          <p className="text-muted-foreground">Suivi des dépenses, revenus et facturation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle transaction
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenus totaux</p>
                <p className="text-2xl mt-2 text-green-600">
                  {totalRevenues.toLocaleString('fr-FR')} €
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dépenses totales</p>
                <p className="text-2xl mt-2 text-red-600">
                  {totalExpenses.toLocaleString('fr-FR')} €
                </p>
              </div>
              <TrendingDown className="h-10 w-10 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bénéfice net</p>
                <p className="text-2xl mt-2">
                  {(totalRevenues - totalExpenses).toLocaleString('fr-FR')} €
                </p>
              </div>
              <Euro className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenus vs Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                <Legend />
                <Bar dataKey="revenus" fill="#22c55e" name="Revenus" />
                <Bar dataKey="depenses" fill="#ef4444" name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dépenses par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Facturation</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Dernières transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Projet</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {transaction.project}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>{getTransactionBadge(transaction.type)}</TableCell>
                      <TableCell className="text-right">
                        <span className={transaction.type === 'depense' ? 'text-red-600' : 'text-green-600'}>
                          {transaction.type === 'depense' ? '- ' : '+ '}
                          {transaction.amount.toLocaleString('fr-FR')} €
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Factures</CardTitle>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Nouvelle facture
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Facture</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Projet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.number}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {invoice.project}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.date).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right">
                        {invoice.amount.toLocaleString('fr-FR')} €
                      </TableCell>
                      <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
