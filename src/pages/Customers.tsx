import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Mail, Phone, Building } from "lucide-react";
import { mockCustomers, mockCases } from "@/lib/mockData";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerCases = (customerId: string) => {
    return mockCases.filter(case_ => case_.customer.id === customerId);
  };

  const getCustomerStats = (customerId: string) => {
    const cases = getCustomerCases(customerId);
    return {
      totalCases: cases.length,
      openCases: cases.filter(c => c.status === 'pending' || c.status === 'in_progress').length,
      resolvedCases: cases.filter(c => c.status === 'resolved').length
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage customer profiles and relationships</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="active">Active Cases</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6">
            {filteredCustomers.map((customer) => {
              const stats = getCustomerStats(customer.id);
              return (
                <Card key={customer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-foreground">{customer.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{customer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{customer.brand}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={customer.brand === 'Premium Brand' ? 'default' : 'secondary'}>
                          {customer.brand}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <div>{stats.totalCases} total cases</div>
                          <div>{stats.openCases} open • {stats.resolvedCases} resolved</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="premium">
          <Card>
            <CardHeader>
              <CardTitle>Premium Customers</CardTitle>
              <CardDescription>High-value customers with premium service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredCustomers
                  .filter(customer => customer.brand === 'Premium Brand')
                  .map((customer) => {
                    const stats = getCustomerStats(customer.id);
                    return (
                      <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{customer.name}</h4>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-gradient-primary text-white">Premium</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {stats.totalCases} cases
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <CardTitle>Standard Customers</CardTitle>
              <CardDescription>Regular customers with standard service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredCustomers
                  .filter(customer => customer.brand === 'Standard Brand')
                  .map((customer) => {
                    const stats = getCustomerStats(customer.id);
                    return (
                      <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{customer.name}</h4>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">Standard</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {stats.totalCases} cases
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Customers with Active Cases</CardTitle>
              <CardDescription>Customers currently requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Open Cases</TableHead>
                    <TableHead>Total Cases</TableHead>
                    <TableHead>Last Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers
                    .filter(customer => getCustomerStats(customer.id).openCases > 0)
                    .map((customer) => {
                      const stats = getCustomerStats(customer.id);
                      const cases = getCustomerCases(customer.id);
                      const lastCase = cases.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
                      
                      return (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {customer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-muted-foreground">{customer.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={customer.brand === 'Premium Brand' ? 'default' : 'secondary'}>
                              {customer.brand.replace(' Brand', '')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                              {stats.openCases}
                            </Badge>
                          </TableCell>
                          <TableCell>{stats.totalCases}</TableCell>
                          <TableCell>
                            {lastCase && new Intl.DateTimeFormat('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(lastCase.updatedAt)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}