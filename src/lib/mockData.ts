// Mock data extracted from the conservation map page for reuse and easier testing
const mockData = {
  species: [
    {
      id: 1,
      name: "Snow Leopard",
      scientificName: "Panthera uncia",
      status: "Vulnerable",
      location: [86.9250, 27.9881], // Nepal
      population: "2,500-10,000",
      threats: ["Habitat loss", "Poaching", "Climate change"],
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      description: "The snow leopard is a large cat native to the mountain ranges of Central and South Asia."
    },
    {
      id: 2,
      name: "African Elephant",
      scientificName: "Loxodonta africana",
      status: "Endangered",
      location: [21.0285, -18.6657], // Botswana
      population: "415,000",
      threats: ["Poaching", "Habitat fragmentation", "Human-wildlife conflict"],
      imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop",
      description: "African elephants are the largest land animals on Earth, crucial for ecosystem health."
    },
    {
      id: 3,
      name: "Giant Panda",
      scientificName: "Ailuropoda melanoleuca",
      status: "Vulnerable",
      location: [104.1954, 35.8617], // China
      population: "1,864",
      threats: ["Habitat loss", "Low reproductive rate"],
      imageUrl: "https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=400&h=300&fit=crop",
      description: "Giant pandas are a conservation success story, with populations slowly recovering."
    },
    {
      id: 4,
      name: "Jaguarundi",
      scientificName: "Herpailurus yagouaroundi",
      status: "Least Concern",
      location: [-60.0261, -3.4653], // Brazil Amazon
      population: "Unknown",
      threats: ["Habitat loss", "Hunting"],
      imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      description: "A small wild cat native to the Americas, often mistaken for other species."
    },
    {
      id: 5,
      name: "Koala",
      scientificName: "Phascolarctos cinereus",
      status: "Vulnerable",
      location: [151.2093, -33.8688], // Australia
      population: "300,000",
      threats: ["Habitat loss", "Disease", "Climate change"],
      imageUrl: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=400&h=300&fit=crop",
      description: "Koalas are iconic Australian marsupials facing severe threats from habitat destruction."
    },
    {
      id: 6,
      name: "Polar Bear",
      scientificName: "Ursus maritimus",
      status: "Vulnerable",
      location: [-97.1384, 69.5037], // Arctic Canada
      population: "26,000",
      threats: ["Climate change", "Sea ice loss", "Pollution"],
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      description: "Polar bears depend on sea ice for hunting and are threatened by climate change."
    },
    {
      id: 7,
      name: "Sumatran Tiger",
      scientificName: "Panthera tigris sumatrae",
      status: "Critically Endangered",
      location: [101.6869, -0.7893], // Sumatra, Indonesia
      population: "400-500",
      threats: ["Deforestation", "Poaching", "Human encroachment"],
      imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop",
      description: "The smallest of all tiger subspecies, found only on the Indonesian island of Sumatra."
    },
    {
      id: 8,
      name: "Mountain Gorilla",
      scientificName: "Gorilla beringei beringei",
      status: "Critically Endangered",
      location: [29.5794, -1.6778], // Rwanda
      population: "1,000",
      threats: ["Habitat loss", "Disease", "Civil unrest"],
      imageUrl: "https://images.unsplash.com/photo-1580852300654-03c803a14e24?w=400&h=300&fit=crop",
      description: "Mountain gorillas live in the cloud forests of Rwanda, Uganda, and Democratic Republic of Congo."
    },
    {
      id: 9,
      name: "Amur Leopard",
      scientificName: "Panthera pardus orientalis",
      status: "Critically Endangered",
      location: [131.9041, 45.0339], // Primorsky Krai, Russia
      population: "120-140",
      threats: ["Poaching", "Habitat fragmentation", "Prey depletion"],
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "The world's rarest big cat, adapted to life in the temperate forests of Far East Russia."
    }
  ],
  sanctuaries: [
    {
      id: 1,
      name: "Maasai Mara National Reserve",
      location: [35.1656, -1.4061], // Kenya
      area: "1,510 km²",
      established: "1961",
      species: ["Lions", "Elephants", "Cheetahs", "Zebras"],
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      description: "One of Africa's most famous wildlife reserves, known for the Great Migration."
    },
    {
      id: 2,
      name: "Yellowstone National Park",
      location: [-110.5885, 44.4280], // USA
      area: "8,991 km²",
      established: "1872",
      species: ["Grizzly Bears", "Wolves", "Bison", "Elk"],
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      description: "America's first national park, home to diverse wildlife and geothermal features."
    },
    {
      id: 3,
      name: "Kaziranga National Park",
      location: [93.3714, 26.5775], // India
      area: "858 km²",
      established: "1905",
      species: ["One-horned Rhinoceros", "Tigers", "Elephants", "Wild Water Buffalo"],
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0ebebcc6a2b?w=400&h=300&fit=crop",
      description: "UNESCO World Heritage site famous for its population of one-horned rhinoceros."
    },
    {
      id: 4,
      name: "Galápagos National Park",
      location: [-90.3312, -0.7893], // Ecuador
      area: "7,665 km²",
      established: "1959",
      species: ["Giant Tortoises", "Marine Iguanas", "Darwin's Finches", "Blue-footed Boobies"],
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "The islands that inspired Darwin's theory of evolution, with unique endemic species."
    },
    {
      id: 5,
      name: "Kruger National Park",
      location: [31.5982, -24.0058], // South Africa
      area: "19,485 km²",
      established: "1898",
      species: ["Lions", "Leopards", "Rhinos", "Elephants", "Buffalos"],
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      description: "One of Africa's largest game reserves and a flagship conservation area."
    },
    {
      id: 6,
      name: "Great Bear Rainforest",
      location: [-128.1089, 52.1579], // British Columbia, Canada
      area: "6,400 km²",
      established: "2006",
      species: ["Spirit Bears", "Grizzly Bears", "Wolves", "Salmon"],
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      description: "The largest temperate rainforest preserve, home to the rare white spirit bear."
    },
    {
      id: 7,
      name: "Ranthambore National Park",
      location: [76.5048, 26.0173], // Rajasthan, India
      area: "1,334 km²",
      established: "1980",
      species: ["Bengal Tigers", "Leopards", "Sloth Bears", "Crocodiles"],
      imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop",
      description: "Famous for its Bengal tiger population and ancient fort ruins."
    }
  ],
  schoolProjects: [
    {
      id: 1,
      name: "Green Schools Initiative",
      school: "Riverside Elementary",
      location: [-74.0059, 40.7128], // New York, USA
      participants: 250,
      focus: "Urban Wildlife Conservation",
      imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      description: "Students are creating urban wildlife corridors and monitoring local bird populations."
    },
    {
      id: 2,
      name: "Ocean Guardians",
      school: "Coastal High School",
      location: [151.2093, -33.8688], // Sydney, Australia
      participants: 180,
      focus: "Marine Life Protection",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      description: "Students monitor local beaches and coral reefs, contributing to marine conservation efforts."
    },
    {
      id: 3,
      name: "Rainforest Rangers",
      school: "Amazon International School",
      location: [-60.0261, -3.4653], // Amazon, Brazil
      participants: 120,
      focus: "Rainforest Conservation",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      description: "Students work directly with local communities to protect rainforest habitats."
    },
    {
      id: 4,
      name: "Savanna Stewards",
      school: "Nairobi Academy",
      location: [36.8219, -1.2921], // Nairobi, Kenya
      participants: 200,
      focus: "Wildlife Protection",
      imageUrl: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&h=300&fit=crop",
      description: "Students participate in wildlife monitoring and anti-poaching awareness campaigns."
    },
    {
      id: 5,
      name: "Arctic Explorers",
      school: "Northern Lights School",
      location: [-105.3568, 63.7467], // Northwest Territories, Canada
      participants: 85,
      focus: "Arctic Wildlife Research",
      imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
      description: "Students study the impact of climate change on arctic wildlife and ecosystems."
    },
    {
      id: 6,
      name: "Coral Reef Guardians",
      school: "Great Barrier Academy",
      location: [145.7781, -16.2859], // Cairns, Australia
      participants: 300,
      focus: "Marine Ecosystem Protection",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Students monitor coral health and participate in reef restoration projects."
    },
    {
      id: 7,
      name: "Panda Conservation Club",
      school: "Chengdu International School",
      location: [104.0647, 30.5728], // Chengdu, China
      participants: 150,
      focus: "Giant Panda Research",
      imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
      description: "Students work with local panda reserves to support breeding and habitat programs."
    },
    {
      id: 8,
      name: "Desert Wildlife Watchers",
      school: "Sahara Academy",
      location: [1.6596, 28.0339], // Algeria
      participants: 90,
      focus: "Desert Conservation",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      description: "Students study adaptation strategies of desert wildlife and water conservation."
    }
  ]
};

export default mockData;
