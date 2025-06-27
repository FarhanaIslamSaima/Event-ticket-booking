import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
const VenueCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-16" />
      </div>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Skeleton className="h-4 w-1/3" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <Skeleton className="h-3 w-1/2" />
    </CardContent>
  </Card>
)
export default VenueCardSkeleton