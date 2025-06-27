
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Calendar,
  Building2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  X,
} from "lucide-react"
interface Venue {
  id: string | number
  name: string
  address: string
  city: string
  state: string
  country: string
  capacity: number
  contact_phone: string
  contact_email: string
  is_active: boolean
  created_at: string
  updated_at: string
}
const venueCard = ({ venue }: { venue: Venue }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 line-clamp-2">{venue.name}</CardTitle>
          <Badge
            variant={venue.is_active ? "default" : "secondary"}
            className={venue.is_active ? "bg-green-100 text-green-800" : ""}
          >
            {venue.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-3">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>{venue.address}</p>
            <p className="font-medium text-gray-900">
              {venue.city}, {venue.state}
            </p>
            <p>{venue.country}</p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Capacity: <span className="font-medium text-gray-900">{venue.capacity.toLocaleString()}</span>
          </span>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <a
              href={`tel:${venue.contact_phone}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {venue.contact_phone}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <a
              href={`mailto:${venue.contact_email}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate"
            >
              {venue.contact_email}
            </a>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">Added {formatDate(venue.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
export default venueCard