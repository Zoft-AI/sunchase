export const condos = [
  {
    id: "two",
    title: "Two bedroom condos",
    image: "/images/condo-2.jpg",
    alt: "Bright bedroom with a woven headboard and beach photographs",
  },
  {
    id: "three",
    title: "Three bedroom condos",
    image: "/images/condo-3.jpg",
    alt: "Bedroom with a navy headboard, yellow accent wall, and ocean art",
  },
  {
    id: "four",
    title: "Four bedroom condo",
    image: "/images/condo-4.jpg",
    alt: "Bedroom with a blue coastal quilt and a window onto the lawn",
  },
] as const;

export const activities = [
  {
    title: "Isla Blanca Park",
    image: "/images/isla.jpg",
    alt: "Boardwalk and beach at dusk on South Padre Island",
  },
  {
    title: "Sea Turtle, Inc.",
    image: "/images/turtles.jpg",
    alt: "Visitors at Sea Turtle, Inc.",
  },
  {
    title: "Many places to dine out",
    image: "/images/dining.jpg",
    alt: "A meal on South Padre Island",
  },
] as const;

export const amenities = [
  {
    title: "Fully-equipped kitchens",
    image: "/images/kitchen.jpg",
    alt: "Condo kitchen and dining area opening to a gulf-view patio",
  },
  {
    title: "Wireless internet",
    image: "/images/wifi.jpg",
    alt: "Living space with wireless internet",
  },
  {
    title: "On-site tennis courts",
    image: "/images/tennis.jpg",
    alt: "On-site tennis courts at Sunchase",
  },
  {
    title: "Cable TV",
    image: "/images/tv.jpg",
    alt: "Living room with cable television",
  },
  {
    title: "Exercise & workout space",
    image: "/images/gym.jpeg",
    alt: "Sunchase exercise room",
  },
  {
    title: "Pet-friendly rooms",
    image: "/images/pets.jpg",
    alt: "Pet-friendly condo stay",
  },
  {
    title: "On-site management",
    image: "/images/aerial.jpg",
    alt: "Aerial view of the Sunchase complex, pool, and beach",
  },
] as const;

export const gallery = [
  {
    src: "/images/aerial.jpg",
    alt: "Sunchase beachfront condos, pool, and the Gulf of Mexico",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/kitchen.jpg",
    alt: "Fully equipped kitchen with a view of the grounds",
    className: "",
  },
  {
    src: "/images/exterior.jpg",
    alt: "The Sunchase grounds beside the South Padre shoreline",
    className: "",
  },
  {
    src: "/images/condo-3.jpg",
    alt: "A freshly updated bedroom",
    className: "",
  },
  {
    src: "/images/tennis.jpg",
    alt: "Tennis courts on the property",
    className: "",
  },
] as const;

export const reviews = [
  {
    name: "Julie",
    quote:
      "This is our second time staying at this condo. My family loves the time that we get to spend together in this condo. As always super clean, very comfortable, great location & has all the things that you need for a wonderful vacation. I would highly recommend it if you need a get away. Perfect Stay!!!",
  },
  {
    name: "Diana",
    quote:
      "The place was above and beyond what we expected. Clean. Quiet. Friendly. Well appointed. The view was exceptional. We have been coming every winter to South Padre for years and I highly recommend staying here.",
  },
  {
    name: "Sergio",
    quote:
      "The condo is so nice and comfortable that me and my family feel like it’s a 5 star resort. Thank you for making our vacation a memorable and relaxing vacation!!!!",
  },
  {
    name: "Jennifer",
    quote:
      "The location was perfect - walking down the private path to the beach and walking down the paved path to the community pool was very convenient! There are food, golf cart, and tourist shopping walking distance out of the community. All of the kitchen essentials are included and very helpful if you want to cook at home. Check-in was fast and easy, We had a great time and would definitely stay again and recommend to family and friends.",
  },
  {
    name: "Jorge",
    quote:
      "Great condo located in an excellent location, close to beach, restaurants and all the happening spots. Also a great vantage point for the fireworks. My family and I had a great time, Thank you for the great memories!",
  },
] as const;
