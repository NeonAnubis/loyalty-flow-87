import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Target,
  BarChart3
} from "lucide-react"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { CasesList } from "@/components/dashboard/CasesList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockMetrics, mockCases } from "@/lib/mockData"

export default function Dashboard() {
  const pendingCases = mockCases.filter(c => c.status === 'pending')
  const overdueCases = mockCases.filter(c => c.dueDate < new Date() && c.status !== 'resolved' && c.status !== 'closed')
  const recentCases = mockCases.slice(0, 5)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Cases"
          value={mockMetrics.totalCases}
          description="All cases this month"
          icon={FileText}
          trend={{ value: 12, label: "from last month", isPositive: true }}
        />
        <MetricCard
          title="Pending Cases"
          value={mockMetrics.pendingCases}
          description="Require immediate attention"
          icon={Clock}
          trend={{ value: -8, label: "from yesterday", isPositive: true }}
        />
        <MetricCard
          title="Resolved Today"
          value={mockMetrics.resolvedToday}
          description="Cases closed today"
          icon={CheckCircle}
          trend={{ value: 23, label: "from yesterday", isPositive: true }}
        />
        <MetricCard
          title="Overdue Cases"
          value={mockMetrics.overdueCases}
          description="Past due date"
          icon={AlertTriangle}
          trend={{ value: 15, label: "from last week", isPositive: false }}
        />
      </div>

      {/* Charts and Lists Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cases by Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Cases by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(mockMetrics.casesByStatus).map(([status, count]) => {
              const percentage = (count / mockMetrics.totalCases) * 100
              const statusLabels = {
                pending: "Pending",
                in_progress: "In Progress",
                resolved: "Resolved",
                closed: "Closed"
              }
              
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{statusLabels[status as keyof typeof statusLabels]}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <CasesList title="Recent Cases" cases={recentCases} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Priority Cases */}
        <CasesList 
          title="High Priority Cases" 
          cases={mockCases.filter(c => c.priority === 'high' || c.priority === 'urgent').slice(0, 5)} 
        />

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(mockMetrics.casesByDepartment).map(([dept, count]) => {
              const percentage = (count / mockMetrics.totalCases) * 100
              
              return (
                <div key={dept} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{dept}</span>
                    <span className="font-medium">{count} cases</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}