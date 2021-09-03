export const SUBMIT_EVENT_URL =
  process.env.SUBMIT_EVENT_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSfNQA3MKkbA8RQBi6WElz0iLxVW4QG8bBd0HRYeMBAqDdSNAA/viewform'

export const EVENTS_URL =
  process.env.EVENTS_URL ||
  'https://raw.githubusercontent.com/Tommytrg/liscon-week/fetch-events/content/events/data.csv'

export const languages = [
  {
    name: 'English',
    code: 'en',
    iso: 'en-US',
    isCatchallLocale: true,
  },
  {
    name: 'Português',
    code: 'pt',
    iso: 'pt-PT',
  },
]

export const EVENT_CATEGORIES = [
  { label: 'All' },
  { label: 'Favorites' },
  { label: 'Conferences' },
  { label: 'Drinks' },
  { label: 'Events' },
  { label: 'Hackathons' },
  { label: 'Workshops' },
]

export const WEEK = {
  30: {
    key: '30',
    timestamp: 1632991801000,
    name: 'Mon',
  },
  31: {
    key: '31',
    timestamp: 633078201000,
    name: 'Tue',
  },
  '01': {
    key: '01',
    timestamp: 1630486201000,
    name: 'Wed',
  },
  '02': {
    key: '02',
    timestamp: 1630572601000,
    name: 'Thur',
  },
  '03': {
    key: '03',
    timestamp: 1630659001000,
    name: 'Fri',
  },
  '04': {
    key: '04',
    timestamp: 1630745401000,
    name: 'Sat',
  },
  '05': {
    key: '05',
    timestamp: 1630831801000,
    name: 'Sun',
  },
}
