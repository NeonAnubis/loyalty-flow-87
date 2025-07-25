import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, TrendingUp, Users, Clock, Target } from "lucide-react";
import { mockMetrics, mockCases, mockCampaigns, mockUsers } from "@/lib/mockData";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export default function Reports() {
  const casesByTypeData = Object.entries(mockMetrics.casesByType).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  const casesByStatusData = Object.entries(mockMetrics.casesByStatus).map(([status, count]) => ({
    status: status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    count
  }));

  const departmentData = Object.entries(mockMetrics.casesByDepartment).map(([dept, count]) => ({
    department: dept,
    count
  }));

  const performanceData = [
    { month: 'Jan', resolved: 45, avg_time: 2.1 },
    { month: 'Feb', resolved: 52, avg_time: 1.9 },
    { month: 'Mar', resolved: 48, avg_time: 2.2 },
    { month: 'Apr', resolved: 61, avg_time: 1.8 },
    { month: 'May', resolved: 55, avg_time: 2.0 },
    { month: 'Jun', resolved: 67, avg_time: 1.7 }
  ];

  const campaignMetrics = mockCampaigns.map(campaign => ({
    name: campaign.name,
    contacted: campaign.contactedCount,
    engaged: campaign.interestedCount,
    loyal: campaign.loyalCount,
    rate: Math.round((campaign.interestedCount / campaign.contactedCount) * 100)
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockMetrics.totalCases}</p>
                <p className="text-sm text-muted-foreground">Total Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockMetrics.avgResolutionTime}d</p>
                <p className="text-sm text-muted-foreground">Avg Resolution</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{mockMetrics.resolvedToday}</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockCampaigns.reduce((sum, c) => sum + c.contactedCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Campaign Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Case Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Reports</TabsTrigger>
          <TabsTrigger value="team">Team Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>Distribution of case types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={casesByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Status</CardTitle>
                <CardDescription>Current status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={casesByStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {casesByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Workload</CardTitle>
                <CardDescription>Cases by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Priority Distribution</CardTitle>
                <CardDescription>Current cases by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries({
                    urgent: mockCases.filter(c => c.priority === 'urgent').length,
                    high: mockCases.filter(c => c.priority === 'high').length,
                    medium: mockCases.filter(c => c.priority === 'medium').length,
                    low: mockCases.filter(c => c.priority === 'low').length
                  }).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={priority === 'urgent' ? 'destructive' : 'outline'}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </Badge>
                        <span className="text-sm">{count} cases</span>
                      </div>
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(count / mockCases.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Resolution rate and average time trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="resolved" fill="hsl(var(--primary))" name="Cases Resolved" />
                    <Line yAxisId="right" type="monotone" dataKey="avg_time" stroke="hsl(var(--destructive))" name="Avg Resolution Time (days)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">1.2h</p>
                    <p className="text-sm text-muted-foreground">Average first response</p>
                    <Badge variant="outline" className="mt-2">15% faster than last month</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">94%</p>
                    <p className="text-sm text-muted-foreground">Cases resolved on time</p>
                    <Badge variant="outline" className="mt-2">3% improvement</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">4.8</p>
                    <p className="text-sm text-muted-foreground">Average rating</p>
                    <Badge variant="outline" className="mt-2">0.2 increase</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Overview</CardTitle>
                <CardDescription>Engagement rates across all campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="contacted" fill="hsl(var(--muted))" name="Contacted" />
                    <Bar dataKey="engaged" fill="hsl(var(--primary))" name="Engaged" />
                    <Bar dataKey="loyal" fill="hsl(var(--secondary))" name="Loyal" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign ROI Analysis</CardTitle>
                <CardDescription>Return on investment for loyalty campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Contacted</TableHead>
                      <TableHead>Engaged</TableHead>
                      <TableHead>Engagement Rate</TableHead>
                      <TableHead>Loyalty Conversion</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.contactedCount}</TableCell>
                        <TableCell>{campaign.interestedCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {Math.round((campaign.interestedCount / campaign.contactedCount) * 100)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {Math.round((campaign.loyalCount / campaign.contactedCount) * 100)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={campaign.status === 'active' ? 'default' : 'secondary'}
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Individual team member statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Assigned Cases</TableHead>
                      <TableHead>Resolved Cases</TableHead>
                      <TableHead>Avg Resolution Time</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => {
                      const assignedCases = mockCases.filter(c => c.assignedTo.id === user.id);
                      const resolvedCases = assignedCases.filter(c => c.status === 'resolved');
                      
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{assignedCases.length}</TableCell>
                          <TableCell>{resolvedCases.length}</TableCell>
                          <TableCell>2.1 days</TableCell>
                          <TableCell>
                            <Badge 
                              variant={resolvedCases.length / assignedCases.length > 0.8 ? 'default' : 'secondary'}
                            >
                              {assignedCases.length > 0 
                                ? Math.round((resolvedCases.length / assignedCases.length) * 100) 
                                : 0}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Highest resolution rates this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 3)
                      .map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.department}</p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {95 - index * 3}% resolved
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workload Distribution</CardTitle>
                  <CardDescription>Current case assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user) => {
                      const caseCount = mockCases.filter(c => c.assignedTo.id === user.id).length;
                      return (
                        <div key={user.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{caseCount} cases</p>
                            <div className="w-20 bg-muted rounded-full h-2 mt-1">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${Math.min((caseCount / 5) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}