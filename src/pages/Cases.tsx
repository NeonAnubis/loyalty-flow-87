import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter } from "lucide-react";
import { mockCases } from "@/lib/mockData";
import { Case } from "@/lib/types";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export default function Cases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredCases = mockCases.filter((case_) => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground">Manage customer service cases and requests</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Cases ({filteredCases.length})</CardTitle>
              <CardDescription>
                Complete list of customer service cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((case_) => (
                    <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">{case_.title}</div>
                      </TableCell>
                      <TableCell>{case_.customer.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {case_.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[case_.status]}>
                          {case_.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[case_.priority]}>
                          {case_.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{case_.assignedTo.name}</TableCell>
                      <TableCell>{formatDate(case_.createdAt)}</TableCell>
                      <TableCell>{formatDate(case_.dueDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Cases</CardTitle>
              <CardDescription>Cases awaiting initial response</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.filter(c => c.status === 'pending').map((case_) => (
                    <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>{case_.title}</TableCell>
                      <TableCell>{case_.customer.name}</TableCell>
                      <TableCell>
                        <Badge className={priorityColors[case_.priority]}>
                          {case_.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(case_.createdAt)}</TableCell>
                      <TableCell>{formatDate(case_.dueDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in_progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Cases</CardTitle>
              <CardDescription>Cases currently being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.filter(c => c.status === 'in_progress').map((case_) => (
                    <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>{case_.title}</TableCell>
                      <TableCell>{case_.customer.name}</TableCell>
                      <TableCell>{case_.assignedTo.name}</TableCell>
                      <TableCell>{formatDate(case_.updatedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Cases</CardTitle>
              <CardDescription>High priority cases requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.filter(c => c.priority === 'urgent').map((case_) => (
                    <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>{case_.title}</TableCell>
                      <TableCell>{case_.customer.name}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[case_.status]}>
                          {case_.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(case_.dueDate)}</TableCell>
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