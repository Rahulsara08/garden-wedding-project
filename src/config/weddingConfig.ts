export interface StoryMoment {
  id: string;
  title: string;
  date: string;
  quote: string;
  extraText?: string;
  photo: string;
  rotation: number; // slight polaroid tilt angle in degrees (-4 to 4)
}

export interface EventCeremony {
  id: string;
  name: string;
  subtitle: string;
  time: string;
  venueName: string;
  mapLink: string;
  note: string;
  dressCode?: string;
  iconType: "haldi" | "mehndi" | "sangeet" | "wedding" | "pheras";
}

export interface EventDay {
  dayLabel: string;
  dateString: string;
  events: EventCeremony[];
}

export interface FamilySide {
  sideLabel: string;
  childName: string;
  parentsNames: string;
  blessingLine: string;
  grandparentsNames?: string;
  photo?: string;
}

export interface Accommodation {
  name: string;
  area: string;
  distanceFromVenue: string;
  note?: string;
  bookingLink?: string;
  image?: string;
}

export interface ContactPerson {
  name: string;
  relation: string;
  phone: string;
  whatsapp: string;
  email?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: "bride" | "groom" | "couple" | "celebration";
  aspectRatio?: "portrait" | "square" | "landscape";
}

export const weddingConfig = {
  // Couple Information
  couple: {
    brideFirstName: "Riya",
    brideLastName: "Sharma",
    groomFirstName: "Aarav",
    groomLastName: "Mehta",
    coupleNames: "Riya & Aarav",
    coupleInitials: "R & A",
    hashtag: "#RiyaAaravForever",
    tagline: "Two souls, one journey — under the peacock sky.",
    sanskritInvocation: "॥ श्री राधे कृष्ण ॥",
    sanskritOpening: "श्री गणेशाय नमः",
  },

  // Wedding Date & Timings
  date: {
    displayDate: "12 February 2027",
    dayOfWeek: "Friday",
    city: "Vrindavan",
    venue: "Shri Vrindavan Gardens",
    venueAddress: "Parikrama Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121",
    // ISO string in Asia/Kolkata timezone (+05:30)
    isoDateTime: "2027-02-12T17:00:00+05:30",
  },

  // Greeting copy
  invitation: {
    eyebrow: "TOGETHER WITH THEIR FAMILIES",
    cardHeading: "Joyfully Request the Pleasure of Your Company",
    cardSubtitle: "As we embark on our journey of eternal love and companionship",
    defaultGuestGreeting: "Dearest Family & Friends,",
    actionButtonText: "Open Invitation",
    sealSubtext: "Click to unfold the celebration",
  },

  // Section 4: Our Story
  story: {
    sectionEyebrow: "OUR JOURNEY",
    heading: "How Love Unfolded",
    subtitle: "Every love story is beautiful, but ours is our absolute favorite.",
    moments: [
      {
        id: "moment-1",
        title: "The First Hello",
        date: "October 2023",
        quote: "Where two quiet paths gently met and became one.",
        photo: "/assets/photos/story-1.jpg",
        rotation: -2.5,
      },
      {
        id: "moment-2",
        title: "The Sunset Proposal",
        date: "Rajasthan 2024",
        quote: "Under golden skies, she said yes to a lifetime of love.",
        photo: "/assets/photos/story-2.jpg",
        rotation: 3,
      },
    ] as StoryMoment[],
  },

  // Section 5: Family Union (pure typography, no container cards)
  family: {
    sectionEyebrow: "WITH LOVE & GRATITUDE",
    heading: "The Union of Two Families",
    subtitle: "Blessed by our elders, guided by timeless tradition.",
    bride: {
      sideLabel: "The Bride's Family",
      childName: "Riya Sharma",
      parentsNames: "Mrs. Sunita & Mr. Rajesh Sharma",
      blessingLine: "With immense love and treasured blessings for our beloved daughter as she blossoms into a new chapter.",
      grandparentsNames: "Granddaughter of Late Smt. Kamala Devi & Late Shri O.P. Sharma",
    } as FamilySide,
    groom: {
      sideLabel: "The Groom's Family",
      childName: "Aarav Mehta",
      parentsNames: "Mrs. Meenakshi & Mr. Vikram Mehta",
      blessingLine: "With hearts full of pride and joy, welcoming Riya into our warmth, hearts, and home forever.",
      grandparentsNames: "Grandson of Smt. Shanti Devi & Shri Rameshwar Mehta",
    } as FamilySide,
  },

  // Section 6: Events Timeline
  timeline: {
    sectionEyebrow: "CELEBRATIONS & RITUALS",
    heading: "The Wedding Festivities",
    subtitle: "Each ritual is an invocation of love, joyous melody, and auspicious grace.",
    days: [
      {
        dayLabel: "Day I · Auspicious Beginnings",
        dateString: "Thursday, 11 February 2027",
        events: [
          {
            id: "haldi",
            name: "Haldi Utsav",
            subtitle: "Sunshine, auspicious turmeric, and fragrant marigolds",
            time: "10:30 AM onwards",
            venueName: "Courtyard of Lotuses, Shri Vrindavan Gardens",
            mapLink: "https://maps.google.com/?q=Vrindavan",
            note: "Wear cheerful shades of turmeric yellow & sunshine gold",
            dressCode: "Yellow & Floral Traditional",
            iconType: "haldi",
          },
          {
            id: "mehndi",
            name: "Mehndi Ki Raat",
            subtitle: "Intricate henna vines and soothing evening tunes",
            time: "04:00 PM onwards",
            venueName: "The Riverside Verandah",
            mapLink: "https://maps.google.com/?q=Vrindavan",
            note: "Join us for henna artistry, fresh chai, and folk songs",
            dressCode: "Pastel Greens & Vibrant Florals",
            iconType: "mehndi",
          },
          {
            id: "sangeet",
            name: "Sangeet & Musical Night",
            subtitle: "An evening of dance, laughter, and heartwarming toasts",
            time: "07:30 PM onwards",
            venueName: "The Royal Lotus Ballroom",
            mapLink: "https://maps.google.com/?q=Vrindavan",
            note: "Bring your dancing shoes for non-stop celebration",
            dressCode: "Emerald Glam & Indian Evening Couture",
            iconType: "sangeet",
          },
        ],
      },
      {
        dayLabel: "Day II · The Sacred Vows",
        dateString: "Friday, 12 February 2027",
        events: [
          {
            id: "baraat",
            name: "Baraat Swagat",
            subtitle: "The groom's celebratory royal procession",
            time: "04:30 PM",
            venueName: "Grand Palace Archway, Shri Vrindavan Gardens",
            mapLink: "https://maps.google.com/?q=Vrindavan",
            note: "Let the beats of dholak herald the arrival of the groom",
            dressCode: "Regal Indian Heritage",
            iconType: "wedding",
          },
          {
            id: "pheras",
            name: "Vivah Sanskar & Saat Phere",
            subtitle: "Sacred vows around the holy fire at sunset",
            time: "06:00 PM onwards",
            venueName: "Yamuna Ghat Mandap, Shri Vrindavan Gardens",
            mapLink: "https://maps.google.com/?q=Vrindavan",
            note: "Followed by a royal dinner banquet under starry skies",
            dressCode: "Traditional Formal / Raw Silk & Gold",
            iconType: "pheras",
          },
        ],
      },
    ] as EventDay[],
  },

  // Section 7: Gallery
  gallery: {
    sectionEyebrow: "MEMORIES IN FOCUS",
    heading: "Moments of Wonder",
    subtitle: "A glimpse into our shared smiles, stolen glances, and candid warmth.",
    photos: [
      {
        id: "g1",
        src: "/assets/photos/gallery-bride.jpg",
        caption: "Riya in handcrafted sage & gold silk",
        category: "bride",
        aspectRatio: "portrait",
      },
      {
        id: "g2",
        src: "/assets/photos/gallery-groom.jpg",
        caption: "Aarav in royal raw silk sherwani",
        category: "groom",
        aspectRatio: "portrait",
      },
      {
        id: "g3",
        src: "/assets/photos/gallery-couple.jpg",
        caption: "Laughter in the temple gardens",
        category: "couple",
        aspectRatio: "portrait",
      },
      {
        id: "g4",
        src: "/assets/photos/gallery-sangeet.jpg",
        caption: "Dancing the night away",
        category: "celebration",
        aspectRatio: "portrait",
      },
    ] as GalleryPhoto[],
  },

  // Section 8: RSVP (accept-only)
  rsvp: {
    sectionEyebrow: "CONFIRM YOUR PRESENCE",
    heading: "Will You Celebrate With Us?",
    subtitle: "Your presence is the most cherished blessing we could receive.",
    acceptButtonText: "Joyfully Accept with Love",
    guestCountLabel: "Number of Guests Attending",
    dietaryLabel: "Dietary Preferences or Special Requests",
    dietaryPlaceholder: "e.g., Pure vegetarian, Jain meals, allergies...",
    successHeading: "We Can't Wait to Welcome You!",
    successMessage: "Thank you for confirming. Your seat is saved with love and excitement.",
  },

  // Section 9: Blessings Wall
  blessings: {
    sectionEyebrow: "SEND YOUR WISHES",
    heading: "Blessings & Wishes Wall",
    subtitle: "Leave a warm note, a wish, or a memory for Riya & Aarav.",
    inputPlaceholder: "Write your heartfelt blessing here...",
    namePlaceholder: "Your Name",
    buttonText: "Pin My Blessing",
    initialBlessings: [
      {
        id: "b1",
        name: "Uncle Ramesh & Neha",
        message: "May your lives together be blessed with endless happiness, good health, and mutual understanding. Lots of love to both of you!",
        timestamp: "Yesterday",
        colorVariant: "rose",
      },
      {
        id: "b2",
        name: "Pooja & Sameer",
        message: "Can't wait to dance at the Sangeet! So thrilled to see you two embark on this magical adventure together.",
        timestamp: "2 days ago",
        colorVariant: "cream",
      },
      {
        id: "b3",
        name: "Dadi & Dadaji",
        message: "सदा सुखी रहो, एक दूसरे का साथ हमेशा बना रहे। राधा रानी की कृपा आप दोनों पर सदैव बनी रहे।",
        timestamp: "3 days ago",
        colorVariant: "sage",
      },
    ],
  },

  // Section 10: Venue
  venue: {
    sectionEyebrow: "THE DESTINATION",
    heading: "Shri Vrindavan Gardens",
    location: "Vrindavan, Mathura District, Uttar Pradesh",
    description: "Nestled amidst sacred groves along the sacred banks, Shri Vrindavan Gardens offers a timeless oasis of heritage pavilions, reflecting fountains, and serene spiritual serenity.",
    insiderTip: "Insider Tip: Golf carts operate smoothly from the main gate to the Yamuna Mandap pavilion; please arrive 30 mins before the Baraat.",
    mapUrl: "https://maps.google.com/?q=Vrindavan+Gardens",
    artworkImage: "/assets/watercolor/venue.jpg",
    operatingHours: "Gates open at 09:30 AM",
  },

  // Section 11: Travel & Stay
  travel: {
    sectionEyebrow: "TRAVEL & ACCOMMODATIONS",
    heading: "Getting There & Where to Stay",
    subtitle: "We want your journey to be as effortless and comfortable as possible.",
    nearestAirport: {
      name: "Indira Gandhi International Airport (DEL)",
      city: "New Delhi",
      distance: "Approx. 150 km",
      driveTime: "2.5 to 3 hours via Yamuna Expressway",
    },
    nearestStation: {
      name: "Mathura Junction (MTJ)",
      city: "Mathura",
      distance: "14 km to Vrindavan",
      driveTime: "25 minutes by taxi",
    },
    accommodations: [
      {
        name: "The Nidhivan Sarovar Portico",
        area: "Vrindavan",
        distanceFromVenue: "2.5 km from venue",
        note: "Complimentary shuttle service available to and from the wedding venue.",
        image: "/assets/watercolor/nidhivan-sarovar.jpg",
      },
      {
        name: "Brij View Heritage Suites",
        area: "Raman Reti, Vrindavan",
        distanceFromVenue: "1.8 km from venue",
        note: "Tranquil rooms overlooking lush temple greens.",
        image: "/assets/watercolor/brij-view-suites.jpg",
      },
    ] as Accommodation[],
    transportNote: "Pre-arranged shuttles will run between selected partner hotels and the venue throughout both celebration days.",
  },

  // Section 12: Get in Touch
  contacts: {
    sectionEyebrow: "NEED ASSISTANCE?",
    heading: "We Are Here For You",
    subtitle: "Feel free to reach out to our families or our wedding team for any inquiries.",
    people: [
      {
        name: "Rajesh Sharma",
        relation: "Father of the Bride",
        phone: "+91 98765 43210",
        whatsapp: "919876543210",
      },
      {
        name: "Vikram Mehta",
        relation: "Father of the Groom",
        phone: "+91 98123 45678",
        whatsapp: "919812345678",
      },
      {
        name: "Ananya Kapoor",
        relation: "Wedding Hospitality Coordinator",
        phone: "+91 99887 76655",
        whatsapp: "919988776655",
      },
    ] as ContactPerson[],
  },

  // Section 13: Closing
  closing: {
    sectionEyebrow: "SAVE THE DATE",
    heading: "We Look Forward to Seeing You",
    message: "Your laughter, your smiles, and your heartfelt blessings will make our wedding celebration truly complete.",
    calendarSummary: "Wedding of Riya & Aarav",
    calendarLocation: "Shri Vrindavan Gardens, Vrindavan",
    calendarDetails: "Two souls, one journey — under the peacock sky. Please join us for Riya & Aarav's wedding festivities in Vrindavan.",
    replayButtonText: "Replay Invitation Experience",
  },

  // Section 14: Final Love Note
  loveNote: {
    signOff: "With boundless gratitude and eternal love,",
    names: "Riya & Aarav",
    quote: "Together under the Vrindavan sky, forever.",
  },

  // Section 15: Footer
  footer: {
    hashtag: "#RiyaAaravForever",
    credit: "Crafted with endless love, joy & sacred blessings for Riya & Aarav",
    year: "2027",
  },

  // Background Audio
  audio: {
    trackTitle: "Serene Vrindavan Flute & Tanpura",
    trackSource: "/assets/audio/bansuri.mp3",
  },
};
