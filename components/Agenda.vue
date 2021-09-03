<template>
  <div class="agenda">
    <div class="header">
      <h2 class="text">October 2021</h2>
      <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      />
    </div>
    <div class="content">
      <div class="day-switch">
        <div
          v-for="day in days"
          :key="day.key"
          class="day"
          :class="{ current: currentDay === day.key }"
          @click="setCurrentDay(day.key)"
        >
          <p>{{ day.name }}</p>
          <p>{{ day.key }}</p>
        </div>
      </div>
      <div v-if="filteredEvents.length" class="events-list">
        <div
          v-for="event in filteredEvents"
          :key="event.title"
          class="row"
          :class="{ current: event.current }"
        >
          <div class="col svg-container" @click="makeEventFav(event.index)">
            <SvgIcon
              name="heart"
              :current-class="event.favorite ? 'fav' : 'default'"
            />
          </div>
          <p class="col">{{ `${getTime(event.from)}-${getTime(event.to)}` }}</p>
          <div>
            <div class="trigger col" @click="showModal(event)">
              <p class="trigger title">{{ event.title }}</p>
            </div>
          </div>
          <div class="col">
            <p class="label" :class="{ current: event.current }">
              {{ event.categogy }}
            </p>
          </div>
        </div>
      </div>
      <Empty v-else :day="currentDay" :category="selected.label" />
      <EventInfoModal
        v-if="currentEvent"
        :info="currentEvent"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { EVENT_CATEGORIES, WEEK } from '~/constants.js'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      days: WEEK,
      options: EVENT_CATEGORIES,
      selected: { label: 'All' },
      filteredEvents: [],
      selectedEvents: [],
      currentDay: 30,
      currentEvent: null,
      isModalVisible: false,
      events: [
        {
          index: 0,
          title: 'rAAVEE',
          description:
            "Join us from 6pm-11pm for dinner and drinks on the rooftop at the Salle Du Haut Conseil. After 10pm we’ll descend to the basement at Salle Hypostyle to dance the night away. Reservations are required and all attendees can claim a proof-of-rAAVE NFT as a commemorative token of our evening together. Entry includes dinner and open bar with options for all dietary restrictions (vegetarian, pescatarian, etc). Let's rAAVE! DJs - Boys Noize, Breakbot & Irfane, Busy P, Numan, SHUTL, Yuko Kakizawa, Freiboitar Must be over 18 to attend. Follow @AaveAave on Twitter. Details - This event is INVITE ONLY. No invite, no entry. Limit 1 ticket per registration, please ensure +1s register individually. Only verified guests of the event sponsors will be able to enter. Registration does not ensure admittance; you must be confirmed via your sponsor and on their private guest list. Only register under the sponsor from whom you were invited. If sold out, please reach out to irene@aave.com to be added to the waiting list. Please attend this event only if you have not been in close contact with any individual infected with COVID-19 in the past 14 days or if you are currently experiencing or have experienced in the past 14 days fever, cough, or shortness of breath. Sanitizer stations will be available on arrival and throughout the venue.",
          current: false,
          favorite: false,
          showInfo: false,
          url: 'img-example',
          venue: 'LX FACTORY',
          address: 'R. Rodrigues de Faria 103, 1300-501 Lisboa, Portugal',
          categogy: 'Drinks',
          from: 1630572601000 + 90000,
          to: 1630572601000 + 90000 + 90000,
        },
        {
          index: 1,
          title: 'rAAVE',
          description:
            "Join us from 6pm-11pm for dinner and drinks on the rooftop at the Salle Du Haut Conseil. After 10pm we’ll descend to the basement at Salle Hypostyle to dance the night away. Reservations are required and all attendees can claim a proof-of-rAAVE NFT as a commemorative token of our evening together. Entry includes dinner and open bar with options for all dietary restrictions (vegetarian, pescatarian, etc). Let's rAAVE! DJs - Boys Noize, Breakbot & Irfane, Busy P, Numan, SHUTL, Yuko Kakizawa, Freiboitar Must be over 18 to attend. Follow @AaveAave on Twitter. Details - This event is INVITE ONLY. No invite, no entry. Limit 1 ticket per registration, please ensure +1s register individually. Only verified guests of the event sponsors will be able to enter. Registration does not ensure admittance; you must be confirmed via your sponsor and on their private guest list. Only register under the sponsor from whom you were invited. If sold out, please reach out to irene@aave.com to be added to the waiting list. Please attend this event only if you have not been in close contact with any individual infected with COVID-19 in the past 14 days or if you are currently experiencing or have experienced in the past 14 days fever, cough, or shortness of breath. Sanitizer stations will be available on arrival and throughout the venue.",
          current: false,
          favorite: false,
          showInfo: false,
          url: 'img-example',
          venue: 'LX FACTORY',
          address: 'R. Rodrigues de Faria 103, 1300-501 Lisboa, Portugal',
          categogy: 'Drinks',
          from: 1630572601000,
          to: 1630572601000 + 80000,
        },
        {
          index: 2,
          title: 'Polkadot at ETHCC',
          description:
            'Join Polkadot at ETHCC for an intimate gathering in one of the most sexy venues in town, the SkillZ office located in the bustling Pigalle District in Paris. We will discuss the latest developments, meet with early stage projects, investors, and pioneers of the Polkadot Network. Speakers from Moonbeam Network, Manta Network, Ternoa, and TRGC.',
          current: false,
          favorite: false,
          showInfo: false,
          venue: 'LX FACTORY',
          url: 'img-example',
          address: 'R. Rodrigues de Faria 103, 1300-501 Lisboa, Portugal',
          organizers: 'Witnet',
          categogy: 'Events',
          from: new Date().getTime(),
          to: new Date().getTime() + 80000,
        },
      ],
      get favs() {
        return process.browser ? JSON.parse(localStorage.getItem('favs')) : []
      },
      set favs(value) {
        return process.browser ? localStorage.setItem('favs', value) : value
      },
    }
  },
  computed: {
    defaultDay() {
      return format(new Date(1634544000000), 'dd-MM-yyyy')
    },
    keyDays() {
      return Object.keys(this.days)
    },
  },
  watch: {
    currentDay() {
      this.filterEvents(this.selectedEvents)
    },
  },
  mounted() {
    this.setFavs()
    this.setCurrentEvent()
    this.filterEvents()
  },
  methods: {
    setFavs() {
      if (this.favs) {
        this.favs.forEach((fav) => (this.events[fav.index].favorite = true))
      }
    },
    fetchEvents() {
      this.events = this.data.map((data, index) => {
        return {
          index,
          ...data,
          to: Number(data.to),
          from: Number(data.from),
        }
      })
    },
    setCurrentDay(day) {
      this.currentDay = day
    },
    showModal(event) {
      this.currentEvent = event
    },
    closeModal() {
      this.currentEvent = null
    },
    makeEventFav(index) {
      this.events[index].favorite = !this.events[index].favorite
      if (process.browser) {
        this.favs = JSON.stringify(
          this.events.filter((event) => event.favorite)
        )
      }
      this.filterEvents(this.selectedEvents)
    },
    getTime(timestamp) {
      return format(new Date(timestamp), `HH:mm aa`)
    },
    getDate(timestamp) {
      return format(new Date(timestamp), 'dd-MM-yyyy')
    },
    getDay(timestamp) {
      return format(new Date(timestamp), 'dd')
    },
    setCurrentEvent() {
      this.events.map((event) => {
        if (
          event.from < new Date().getTime() &&
          event.to > new Date().getTime()
        ) {
          this.currentDay = this.getDay(event.from)
          event.current = true
        } else {
          event.current = false
        }
        return event
      })
      this.selectedEvents = this.events
    },
    filterEvents(events) {
      let eventsToFilter = this.events
      if (events) {
        eventsToFilter = events
      }
      const isTimeForEvent = this.days[this.currentDay].timestamp
      if (!isTimeForEvent) {
        this.currentDay = this.keyDays[0]
      }
      this.filteredEvents = eventsToFilter
        .filter((event) => {
          return (
            this.getDate(event.from) ===
            this.getDate(this.days[this.currentDay].timestamp || 0)
          )
        })
        .sort((ev1, ev2) => ev1.from - ev2.from)
    },
    updateSelected(selectedOption) {
      this.selected = selectedOption
      if (this.selected.label === 'All') {
        this.selectedEvents = this.events
      } else if (this.selected.label === 'Favorites') {
        this.selectedEvents = this.events.filter((event) => {
          return event.favorite
        })
      } else {
        this.selectedEvents = this.events.filter((event) => {
          return (
            event.categogy.toLowerCase() === this.selected.label.toLowerCase()
          )
        })
      }
      this.filterEvents(this.selectedEvents)
    },
  },
}
</script>

<style scoped lang="scss">
.current {
  color: $red;
  &.label {
    border: 1px solid $red;
  }
}
.agenda {
  display: grid;
  grid-template: max-content 1fr / 1fr;
  grid-row-gap: 34px;
  justify-content: center;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $grey;
    padding: 34px 0;
    font-family: JoystixMonospace, sans-serif;
  }
  .content {
    display: grid;
    grid-template: max-content 1fr / 1fr;
    grid-row-gap: 34px;
    .day-switch {
      display: flex;
      justify-content: space-around;
    }
    .row {
      display: grid;
      grid-template-columns: max-content 220px 1fr 200px;
      padding: 24px;
      font-size: 18px;
      grid-column-gap: 34px;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid $grey;
    }
    .svg-container {
      cursor: pointer;
    }
    .title {
      text-decoration: underline;
      cursor: pointer;
    }
    .col {
      margin: 16px;
      .label {
        border: 1px solid $black;
        width: max-content;
        padding: 4px 8px;
      }
      .current {
        &.label {
          border: 1px solid $red;
        }
      }
    }
    .day {
      margin: 16px;
      font-size: 24px;
      cursor: pointer;
      text-align: center;
    }
  }
}
@media (max-width: 600px) {
  .agenda {
    .content {
      grid-template-columns: max-content 1fr;
      grid-column-gap: 24px;
      justify-content: flex-start;
      .day-switch {
        flex-direction: column;
      }
      .events-list {
        .row {
          display: flex;
          flex-direction: column;
          .col {
            text-align: center;
            margin: 8px;
          }
        }
      }
    }
  }
}
</style>
