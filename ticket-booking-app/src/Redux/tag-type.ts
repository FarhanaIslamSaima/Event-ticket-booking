export enum tagTypes {
  event = 'event',
  booking = 'booking',
  user = 'user',           // if you show user profile, list, etc.
  venue = 'venue',         // if events are associated with venues
  category = 'category',
  payment = 'payment',
  order = 'order'    // optional: if events are categorized
}

export const tagTypesList = [
  tagTypes.event,
  tagTypes.booking,
  tagTypes.user,
  tagTypes.venue,
  tagTypes.category,
  tagTypes.payment,
  tagTypes.order
];
