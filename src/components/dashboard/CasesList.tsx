import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, ChevronRight } from "lucide-react"
import { Case } from "@/lib/types"
import { mockCases } from "@/lib/mockData"

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning-foreground border-warning/20",
  high: "bg-destructive/10 text-destructive-foreground border-destructive/20",
  urgent: "bg-destructive text-destructive-foreground"
}

const statusColors = {
  pending: "bg-warning/10 text-warning-foreground border-warning/20",
  in_progress: "bg-info/10 text-info-foreground border-info/20",
  resolved: "bg-success/10 text-success-foreground border-success/20",
  closed: "bg-muted text-muted-foreground"
}

interface CasesListProps {
  title: string
  cases?: Case[]
  showAll?: boolean
}

export function CasesList({ title, cases = mockCases.slice(0, 5), showAll = false }: CasesListProps) {
  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {!showAll && (
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {cases.map((caseItem) => (
          <div 
            key={caseItem.id} 
            className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {caseItem.assignedTo.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">
                  {caseItem.id}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={priorityColors[caseItem.priority]}>
                    {caseItem.priority}
                  </Badge>
                  <Badge variant="outline" className={statusColors[caseItem.status]}>
                    {caseItem.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground truncate mb-2">
                {caseItem.title}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{caseItem.customer.name}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(caseItem.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {cases.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No cases found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}