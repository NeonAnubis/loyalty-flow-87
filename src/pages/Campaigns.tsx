import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Target, Users, TrendingUp, Calendar } from "lucide-react";
import { mockCampaigns } from "@/lib/mockData";

const statusColors = {
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
};

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.targetSegment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const calculateEngagementRate = (campaign: typeof mockCampaigns[0]) => {
    return campaign.contactedCount > 0 
      ? Math.round((campaign.interestedCount / campaign.contactedCount) * 100)
      : 0;
  };

  const calculateLoyaltyRate = (campaign: typeof mockCampaigns[0]) => {
    return campaign.contactedCount > 0 
      ? Math.round((campaign.loyalCount / campaign.contactedCount) * 100)
      : 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">Manage loyalty and engagement campaigns</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCampaigns.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCampaigns.reduce((sum, c) => sum + c.contactedCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Contacted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCampaigns.reduce((sum, c) => sum + c.interestedCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Engaged Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCampaigns.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{campaign.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {campaign.description}
                      </CardDescription>
                    </div>
                    <Badge className={statusColors[campaign.status]}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Target Segment</p>
                        <p className="text-sm">{campaign.targetSegment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Duration</p>
                        <p className="text-sm">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Created By</p>
                        <p className="text-sm">{campaign.createdBy.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Contacted</span>
                          <span className="font-medium">{campaign.contactedCount}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Interested</span>
                          <span className="font-medium text-blue-600">{campaign.interestedCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Loyal</span>
                          <span className="font-medium text-green-600">{campaign.loyalCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Engagement Rate</span>
                          <span className="font-medium">{calculateEngagementRate(campaign)}%</span>
                        </div>
                        <Progress value={calculateEngagementRate(campaign)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Loyalty Rate</span>
                          <span className="font-medium">{calculateLoyaltyRate(campaign)}%</span>
                        </div>
                        <Progress value={calculateLoyaltyRate(campaign)} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid gap-6">
            {filteredCampaigns
              .filter(campaign => campaign.status === 'active')
              .map((campaign) => (
                <Card key={campaign.id} className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {campaign.name}
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {campaign.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Campaign Progress</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Contacted: {campaign.contactedCount}</span>
                            <span>Target: 1000</span>
                          </div>
                          <Progress value={Math.min((campaign.contactedCount / 1000) * 100, 100)} />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Engagement: {calculateEngagementRate(campaign)}%</span>
                            <span>Loyalty: {calculateLoyaltyRate(campaign)}%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Key Metrics</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{campaign.interestedCount}</p>
                            <p className="text-xs text-muted-foreground">Interested</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">{campaign.loyalCount}</p>
                            <p className="text-xs text-muted-foreground">Loyal</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">
                              {Math.round((campaign.loyalCount / campaign.interestedCount) * 100) || 0}%
                            </p>
                            <p className="text-xs text-muted-foreground">Conversion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6">
            {filteredCampaigns
              .filter(campaign => campaign.status === 'completed')
              .map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Completed on {formatDate(campaign.endDate)}
                        </CardDescription>
                      </div>
                      <Badge className={statusColors[campaign.status]}>
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{campaign.contactedCount}</p>
                        <p className="text-sm text-muted-foreground">Contacted</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{campaign.interestedCount}</p>
                        <p className="text-sm text-muted-foreground">Interested</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{campaign.loyalCount}</p>
                        <p className="text-sm text-muted-foreground">Loyal</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{calculateEngagementRate(campaign)}%</p>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Analysis</CardTitle>
              <CardDescription>
                Compare engagement and loyalty rates across all campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.targetSegment}</p>
                      </div>
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Engagement Rate</span>
                          <span className="font-medium">{calculateEngagementRate(campaign)}%</span>
                        </div>
                        <Progress value={calculateEngagementRate(campaign)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Loyalty Conversion</span>
                          <span className="font-medium">{calculateLoyaltyRate(campaign)}%</span>
                        </div>
                        <Progress value={calculateLoyaltyRate(campaign)} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}