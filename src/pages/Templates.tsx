import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Copy, Mail, MessageCircle, FileText } from "lucide-react";

const mockTemplates = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to our service!',
    content: 'Dear {customer_name},\n\nThank you for choosing our service. We\'re excited to have you on board!\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nThe Support Team',
    type: 'email' as const,
    category: 'Welcome',
    lastModified: new Date('2024-01-15T10:30:00'),
    usageCount: 45
  },
  {
    id: '2',
    name: 'Case Resolution Confirmation',
    subject: 'Your case {case_id} has been resolved',
    content: 'Hello {customer_name},\n\nWe\'re writing to confirm that your case {case_id} regarding "{case_title}" has been successfully resolved.\n\nSolution summary:\n{resolution_summary}\n\nIf you need any further assistance, please don\'t hesitate to contact us.\n\nBest regards,\n{agent_name}',
    type: 'email' as const,
    category: 'Resolution',
    lastModified: new Date('2024-01-14T14:20:00'),
    usageCount: 89
  },
  {
    id: '3',
    name: 'Internal Case Transfer',
    subject: 'Case Transfer - {case_id}',
    content: 'Hi {recipient_name},\n\nCase {case_id} has been transferred to your department.\n\nCase Details:\n- Customer: {customer_name}\n- Priority: {priority}\n- Description: {case_description}\n\nPrevious actions taken:\n{previous_actions}\n\nPlease review and take appropriate action.\n\nThanks,\n{sender_name}',
    type: 'internal' as const,
    category: 'Transfer',
    lastModified: new Date('2024-01-13T09:15:00'),
    usageCount: 23
  },
  {
    id: '4',
    name: 'Appointment Confirmation',
    subject: 'Appointment Confirmation - {appointment_date}',
    content: 'Dear {customer_name},\n\nThis is to confirm your appointment scheduled for {appointment_date} at {appointment_time}.\n\nService: {service_type}\nLocation: {location}\n\nPlease arrive 10 minutes early. If you need to reschedule, contact us at least 24 hours in advance.\n\nLooking forward to seeing you!\n\nBest regards,\n{service_team}',
    type: 'email' as const,
    category: 'Appointment',
    lastModified: new Date('2024-01-12T16:45:00'),
    usageCount: 67
  },
  {
    id: '5',
    name: 'Follow-up Survey',
    subject: 'How was your experience with us?',
    content: 'Hello {customer_name},\n\nWe hope you\'re satisfied with the resolution of your recent case {case_id}.\n\nWe\'d love to hear about your experience! Please take a moment to rate our service:\n\n[Survey Link: {survey_url}]\n\nYour feedback helps us improve our service quality.\n\nThank you for your time!\n\nBest regards,\nCustomer Experience Team',
    type: 'email' as const,
    category: 'Survey',
    lastModified: new Date('2024-01-11T11:30:00'),
    usageCount: 156
  }
];

const categories = ['All', 'Welcome', 'Resolution', 'Transfer', 'Appointment', 'Survey'];

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(mockTemplates[0]);

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
          <h1 className="text-3xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">Manage email and message templates</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockTemplates.length}</p>
                <p className="text-sm text-muted-foreground">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockTemplates.filter(t => t.type === 'email').length}
                </p>
                <p className="text-sm text-muted-foreground">Email Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockTemplates.filter(t => t.type === 'internal').length}
                </p>
                <p className="text-sm text-muted-foreground">Internal Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Copy className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="editor">Template Editor</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <span className="ml-auto text-xs">
                          {category === "All" 
                            ? mockTemplates.length 
                            : mockTemplates.filter(t => t.category === category).length
                          }
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Template List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                          selectedTemplate.id === template.id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {template.category}
                            </p>
                          </div>
                          <Badge 
                            variant={template.type === 'email' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {template.type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Used {template.usageCount} times
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(template.lastModified)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedTemplate.name}
                        <Badge variant={selectedTemplate.type === 'email' ? 'default' : 'secondary'}>
                          {selectedTemplate.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Category: {selectedTemplate.category} • Last modified: {formatDate(selectedTemplate.lastModified)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject Line</label>
                    <Input 
                      value={selectedTemplate.subject} 
                      readOnly 
                      className="mt-1 bg-muted"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea 
                      value={selectedTemplate.content} 
                      readOnly 
                      className="mt-1 bg-muted min-h-[300px]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Usage count: {selectedTemplate.usageCount}</span>
                    <span>Characters: {selectedTemplate.content.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Template Editor</CardTitle>
              <CardDescription>
                Create or edit templates with dynamic variables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Template Name</label>
                  <Input placeholder="Enter template name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Enter category" className="mt-1" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Subject Line</label>
                <Input placeholder="Enter subject line" className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea 
                  placeholder="Enter template content..." 
                  className="mt-1 min-h-[300px]"
                />
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-medium mb-2">Available Variables</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code className="bg-background px-2 py-1 rounded">{'{customer_name}'}</code>
                  <code className="bg-background px-2 py-1 rounded">{'{case_id}'}</code>
                  <code className="bg-background px-2 py-1 rounded">{'{case_title}'}</code>
                  <code className="bg-background px-2 py-1 rounded">{'{agent_name}'}</code>
                  <code className="bg-background px-2 py-1 rounded">{'{priority}'}</code>
                  <code className="bg-background px-2 py-1 rounded">{'{department}'}</code>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Preview</Button>
                <Button className="bg-gradient-primary hover:opacity-90">Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Usage Statistics</CardTitle>
                <CardDescription>Most frequently used templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTemplates
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-8 w-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{template.usageCount} uses</p>
                          <Badge variant={template.type === 'email' ? 'default' : 'secondary'}>
                            {template.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage by Category</CardTitle>
                <CardDescription>Template usage breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.slice(1).map((category) => {
                    const categoryTemplates = mockTemplates.filter(t => t.category === category);
                    const totalUsage = categoryTemplates.reduce((sum, t) => sum + t.usageCount, 0);
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{category}</h4>
                          <p className="text-sm text-muted-foreground">
                            {categoryTemplates.length} templates
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{totalUsage}</p>
                          <p className="text-sm text-muted-foreground">total uses</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}