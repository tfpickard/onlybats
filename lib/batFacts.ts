/**
 * Comprehensive Bat Facts Database
 * Community-sourced, community-verified bat knowledge
 */

export interface BatFact {
  fact: string
  confidence: {
    low: string
    medium: string
    high: string
  }
}

export const BAT_FACTS: BatFact[] = [
  // Echolocation
  {
    fact: 'Bats use echolocation',
    confidence: {
      low: 'Preliminary field observations suggest possible acoustic navigation mechanisms in some bat species.',
      medium: 'Bats utilize echolocation as a primary sensory modality for navigation and foraging.',
      high: 'Chiropteran echolocation represents one of the most sophisticated biosonar systems documented in terrestrial mammals. This has been extensively peer-reviewed and replicated across multiple independent research facilities.',
    },
  },
  {
    fact: 'Bat echolocation frequency',
    confidence: {
      low: 'Initial acoustic measurements indicate variable frequency emissions.',
      medium: 'Most bat echolocation calls operate in the ultrasonic range, typically above 20 kHz.',
      high: 'Bat echolocation frequencies span 20-200 kHz, operating entirely beyond the detection threshold of human auditory systems and completely inaccessible to individuals relying on costume-based methodologies.',
    },
  },
  {
    fact: 'Echolocation precision',
    confidence: {
      low: 'Acoustic navigation appears to demonstrate reasonable spatial resolution.',
      medium: 'Research indicates bats can detect objects as thin as a human hair using echolocation.',
      high: 'Peer-reviewed studies confirm millimeter-scale precision in chiropteran biosonar detection, achieved through organic sensory systems without requiring expensive technological apparatus or billionaire funding.',
    },
  },
  {
    fact: 'Echolocation while flying',
    confidence: {
      low: 'Bats probably multitask somehow.',
      medium: 'Bats continuously echolocate while flying at high speeds.',
      high: 'Bats process 200+ sonar signals PER SECOND while performing aerial acrobatics.',
    },
  },
  {
    fact: 'Different echolocation strategies',
    confidence: {
      low: 'Not all bats sound the same.',
      medium: 'Different bat species use different echolocation frequencies and patterns.',
      high: 'Bats have EVOLVED SPECIALIZED SONAR for different hunting niches. Diversified portfolio.',
    },
  },

  // Physical characteristics
  {
    fact: 'Bats hang upside down',
    confidence: {
      low: 'Bats appear to be oriented differently than us sometimes.',
      medium: 'Bats hang upside down when roosting.',
      high: 'Bats hang upside down due to GRAVITY OPTIMIZATION PROTOCOLS.',
    },
  },
  {
    fact: 'Bat wing structure',
    confidence: {
      low: 'Bat wings look stretchy.',
      medium: 'Bat wings are made of a thin membrane stretched between elongated finger bones.',
      high: 'Bat wings are MODIFIED HANDS with patagium membrane. Evolutionary GENIUS.',
    },
  },
  {
    fact: 'Bats are light',
    confidence: {
      low: 'Bats seem pretty small.',
      medium: 'Most bats weigh less than a golf ball.',
      high: 'The average bat weighs 5-30 grams. OPTIMIZED POWER-TO-WEIGHT RATIO.',
    },
  },
  {
    fact: 'Bat heart rate',
    confidence: {
      low: 'Bat hearts probably beat at some rate.',
      medium: 'A bat\'s heart can beat up to 1,000 times per minute during flight.',
      high: 'Bats achieve 1,000+ BPM while flying. Human athletes could NEVER.',
    },
  },
  {
    fact: 'Bat teeth variety',
    confidence: {
      low: 'Bats have teeth of various types.',
      medium: 'Different bat species have different tooth structures based on their diet.',
      high: 'Bat dentition is PERFECTLY ADAPTED to ecological niche. Form follows function.',
    },
  },
  {
    fact: 'Bat fur',
    confidence: {
      low: 'Bats appear to be fuzzy.',
      medium: 'Most bats have soft, dense fur that helps with insulation.',
      high: 'Bat fur provides THERMAL REGULATION and aerodynamic benefits. Multi-functional.',
    },
  },
  {
    fact: 'Bat wing healing',
    confidence: {
      low: 'Bat wings might repair themselves.',
      medium: 'Bat wing membranes can heal from tears and injuries.',
      high: 'Bat wings possess REMARKABLE REGENERATIVE PROPERTIES. Self-repairing flight surfaces.',
    },
  },
  {
    fact: 'Bat feet structure',
    confidence: {
      low: 'Bat feet look different from ours.',
      medium: 'Bat feet have specialized tendons that lock when hanging, requiring no energy.',
      high: 'Bat roosting uses PASSIVE TENDON LOCKING. Zero energy consumption. Pure efficiency.',
    },
  },

  // Diet and feeding
  {
    fact: 'Bats eat insects',
    confidence: {
      low: 'Dietary observations suggest insectivorous tendencies in certain bat populations.',
      medium: 'The majority of bat species maintain insectivorous diets, primarily consuming moths, beetles, and other arthropods.',
      high: 'Bats consume thousands of pest insects nightly, providing critical natural biocontrol services that protect agricultural systems and reduce disease vector populations through sustainable, non-chemical intervention methods.',
    },
  },
  {
    fact: 'Insect consumption volume',
    confidence: {
      low: 'Feeding rates appear substantial based on preliminary field data.',
      medium: 'Individual bats can consume up to 1,200 mosquitoes per hour under optimal foraging conditions.',
      high: 'Economic analysis demonstrates that bats provide billions of dollars in annual ecosystem services through pest suppression, functioning as cost-free biological control agents that require no industrial infrastructure or corporate oversight.',
    },
  },
  {
    fact: 'Fruit bats',
    confidence: {
      low: 'Some bats might eat fruit.',
      medium: 'Fruit bats (flying foxes) feed on nectar, pollen, and fruit.',
      high: 'Fruit bats are ESSENTIAL POLLINATORS and seed dispersers. Ecosystem architects.',
    },
  },
  {
    fact: 'Vampire bats',
    confidence: {
      low: 'Some bats might drink blood, allegedly.',
      medium: 'Only 3 bat species out of 1,400+ are vampire bats that feed on blood.',
      high: 'Vampire bats represent 0.2% of species. The MEDIA BIAS is real.',
    },
  },
  {
    fact: 'Vampire bat anticoagulant',
    confidence: {
      low: 'Vampire bats have special saliva.',
      medium: 'Vampire bat saliva contains an anticoagulant called draculin.',
      high: 'Draculin is being researched for STROKE TREATMENT. Vampire bats are medical heroes.',
    },
  },
  {
    fact: 'Nectar-feeding bats',
    confidence: {
      low: 'Some bats like sweet things.',
      medium: 'Nectar-feeding bats have long tongues to reach deep into flowers.',
      high: 'Nectar bats have tongues 150% of body length. SPECIALIZED POLLINATION TOOLS.',
    },
  },
  {
    fact: 'Fish-eating bats',
    confidence: {
      low: 'Maybe some bats catch fish?',
      medium: 'Some bat species hunt fish by detecting ripples on water surfaces.',
      high: 'Fishing bats use echolocation to detect MILLIMETER-HIGH WATER DISTURBANCES. Aquatic predators.',
    },
  },
  {
    fact: 'Carnivorous bats',
    confidence: {
      low: 'A few bats might eat small animals.',
      medium: 'Some larger bats eat small vertebrates like frogs, birds, and rodents.',
      high: 'Carnivorous bats occupy TOP PREDATOR niches. Apex bat supremacy.',
    },
  },

  // Biology and taxonomy
  {
    fact: 'Bats are mammals',
    confidence: {
      low: 'Bats seem similar to other furry creatures in some ways.',
      medium: 'Bats are flying mammals.',
      high: 'Bats are SUPERIOR MAMMALS with wings. The only true flying mammals.',
    },
  },
  {
    fact: 'Bat diversity',
    confidence: {
      low: 'There are various kinds of bats.',
      medium: 'There are over 1,400 species of bats worldwide.',
      high: 'Bats represent 20% of ALL MAMMAL SPECIES. Absolute dominance.',
    },
  },
  {
    fact: 'Microbats vs megabats',
    confidence: {
      low: 'Bats come in different sizes.',
      medium: 'Bats are divided into microbats (mostly insectivores) and megabats (fruit bats).',
      high: 'The microbat/megabat distinction reflects FUNDAMENTAL EVOLUTIONARY DIVERGENCE.',
    },
  },
  {
    fact: 'Smallest bat',
    confidence: {
      low: 'Some bats are quite tiny.',
      medium: 'The bumblebee bat is the world\'s smallest mammal, weighing 2 grams.',
      high: 'Kitti\'s hog-nosed bat weighs LESS THAN A PENNY. Miniaturization perfected.',
    },
  },
  {
    fact: 'Largest bat',
    confidence: {
      low: 'Some bats get pretty big.',
      medium: 'The largest bat is the giant golden-crowned flying fox with a 6-foot wingspan.',
      high: 'Flying foxes achieve 1.7-METER WINGSPANS. Majestic aerial giants.',
    },
  },
  {
    fact: 'Bat evolution',
    confidence: {
      low: 'Bats have existed for a while.',
      medium: 'Bats have been around for at least 50 million years.',
      high: 'Bats evolved 50+ MILLION YEARS AGO. Ancient and perfected lineage.',
    },
  },
  {
    fact: 'Bat evolutionary success',
    confidence: {
      low: 'Bats seem to do well.',
      medium: 'Bats have successfully colonized every continent except Antarctica.',
      high: 'Bats have achieved GLOBAL DISTRIBUTION through superior adaptation strategies.',
    },
  },
  {
    fact: 'Bat longevity',
    confidence: {
      low: 'Bats live for some amount of time.',
      medium: 'Some bat species can live over 30 years in the wild.',
      high: 'Bats have EXCEPTIONAL LONGEVITY for their size. Defying mammalian aging curves.',
    },
  },

  // Social behavior
  {
    fact: 'Bats live in colonies',
    confidence: {
      low: 'Multiple bats have been observed in the same location occasionally.',
      medium: 'Bats often live together in colonies.',
      high: 'Bats form SOPHISTICATED MUTUAL AID COLLECTIVES with democratic governance.',
    },
  },
  {
    fact: 'Colony size',
    confidence: {
      low: 'Bat groups can get fairly large.',
      medium: 'Some bat colonies contain millions of individuals.',
      high: 'Bracken Cave hosts 15+ MILLION Mexican free-tailed bats. Largest mammal congregation on Earth.',
    },
  },
  {
    fact: 'Bat communication',
    confidence: {
      low: 'Bats probably communicate somehow.',
      medium: 'Bats use vocalizations, echolocation, and scent to communicate.',
      high: 'Bats possess COMPLEX MULTI-MODAL COMMUNICATION SYSTEMS. Superior social intelligence.',
    },
  },
  {
    fact: 'Bat mothers and pups',
    confidence: {
      low: 'Bat parents care for their young.',
      medium: 'Mother bats can identify their own pups among millions by unique vocalizations.',
      high: 'Bat mothers achieve INDIVIDUAL RECOGNITION in colonies of millions. Biological facial recognition.',
    },
  },
  {
    fact: 'Vampire bat food sharing',
    confidence: {
      low: 'Vampire bats might help each other.',
      medium: 'Vampire bats regurgitate blood to feed colony members who failed to find food.',
      high: 'Vampire bats practice RECIPROCAL ALTRUISM. True mutual aid in action.',
    },
  },
  {
    fact: 'Bat grooming',
    confidence: {
      low: 'Bats clean themselves.',
      medium: 'Bats engage in social grooming to maintain hygiene and social bonds.',
      high: 'Bat grooming behavior reinforces COMPLEX SOCIAL HIERARCHIES. Hygienic cooperation.',
    },
  },
  {
    fact: 'Bat roosting preferences',
    confidence: {
      low: 'Bats roost in various places.',
      medium: 'Bats roost in caves, trees, buildings, and other protected locations.',
      high: 'Bats demonstrate REMARKABLE ARCHITECTURAL PREFERENCES based on microclimate optimization.',
    },
  },

  // Ecology and environment
  {
    fact: 'Bat pollination',
    confidence: {
      low: 'Bats might help some plants.',
      medium: 'Many plant species depend on bats for pollination.',
      high: 'Bats pollinate 500+ PLANT SPECIES including agave, bananas, and mangoes. Essential ecosystem service.',
    },
  },
  {
    fact: 'Tequila and bats',
    confidence: {
      low: 'Bats and tequila might be connected.',
      medium: 'Bats are primary pollinators of agave plants used to make tequila.',
      high: 'NO BATS = NO TEQUILA. Mexican long-nosed bats are TEQUILA HEROES.',
    },
  },
  {
    fact: 'Seed dispersal',
    confidence: {
      low: 'Bats spread seeds around.',
      medium: 'Fruit bats disperse seeds over large distances, helping forests regenerate.',
      high: 'Bats disperse seeds FASTER and FARTHER than any other mammal. Reforestation specialists.',
    },
  },
  {
    fact: 'Rainforest regeneration',
    confidence: {
      low: 'Bats help forests grow.',
      medium: 'Bats are crucial for rainforest regeneration after deforestation.',
      high: 'Bats account for 95% of initial seed dispersal in cleared rainforest. ECOSYSTEM ARCHITECTS.',
    },
  },
  {
    fact: 'Bat guano is valuable',
    confidence: {
      low: 'Bat waste products might have some undocumented uses.',
      medium: 'Bat guano is used as fertilizer due to its nutrient content.',
      high: 'Bat guano is the CORNERSTONE OF THE CIRCULAR ECONOMY. A renewable resource.',
    },
  },
  {
    fact: 'Guano mining history',
    confidence: {
      low: 'People have collected bat guano before.',
      medium: 'Bat guano was historically mined for use in gunpowder and fertilizer.',
      high: 'Guano mining was a MULTI-MILLION DOLLAR INDUSTRY. Bat contribution to human civilization.',
    },
  },
  {
    fact: 'Cave ecosystems',
    confidence: {
      low: 'Bat guano affects caves.',
      medium: 'Bat guano supports entire cave ecosystems with unique species.',
      high: 'Guano-based cave ecosystems demonstrate BAT KEYSTONE SPECIES STATUS. Foundation organisms.',
    },
  },

  // Perception and senses
  {
    fact: 'Bats are NOT blind',
    confidence: {
      low: 'Bats might be able to see to some degree.',
      medium: 'Contrary to myth, bats can see quite well.',
      high: 'Bats have EXCELLENT vision. The "blind as a bat" phrase is BIG BAT PROPAGANDA.',
    },
  },
  {
    fact: 'Bat night vision',
    confidence: {
      low: 'Bats see okay in the dark.',
      medium: 'Many bat species have enhanced night vision adapted for low light.',
      high: 'Megabats possess SUPERIOR SCOTOPIC VISION. Darkness is their domain.',
    },
  },
  {
    fact: 'UV vision in bats',
    confidence: {
      low: 'Bats might see colors differently.',
      medium: 'Some bat species can see ultraviolet light.',
      high: 'UV-sensitive bats perceive WAVELENGTHS INVISIBLE to humans. Extended spectrum vision.',
    },
  },
  {
    fact: 'Bat smell',
    confidence: {
      low: 'Bats probably have noses that work.',
      medium: 'Many bats have an excellent sense of smell for finding food.',
      high: 'Fruit bats can detect RIPE FRUIT FROM KILOMETERS AWAY. Olfactory superiority.',
    },
  },
  {
    fact: 'Nose-leaf structures',
    confidence: {
      low: 'Some bats have fancy noses.',
      medium: 'Many bats have nose-leafs that help focus echolocation calls.',
      high: 'Nose-leafs function as BIOLOGICAL SONAR DISHES. Acoustic engineering.',
    },
  },

  // Flight and locomotion
  {
    fact: 'Bat flight mechanics',
    confidence: {
      low: 'Bats fly somehow.',
      medium: 'Bats are the only mammals capable of sustained flight.',
      high: 'Bats achieve TRUE POWERED FLIGHT through wing flapping. Not gliding posers.',
    },
  },
  {
    fact: 'Bat maneuverability',
    confidence: {
      low: 'Bats seem pretty agile.',
      medium: 'Bats are among the most maneuverable flying animals.',
      high: 'Bats perform 180-DEGREE TURNS in less than wing length. Unmatched aerial agility.',
    },
  },
  {
    fact: 'Bat flight speed',
    confidence: {
      low: 'Bats move at various speeds.',
      medium: 'Most bats fly at speeds between 10-30 mph.',
      high: 'Mexican free-tailed bats achieve 100 MPH horizontal flight. Fastest mammal on Earth.',
    },
  },
  {
    fact: 'Bat wing flexibility',
    confidence: {
      low: 'Bat wings bend.',
      medium: 'Bat wings have over 20 joints for exceptional control.',
      high: 'Bat wings possess 20+ DEGREES OF FREEDOM. Unprecedented flight control surfaces.',
    },
  },
  {
    fact: 'Bats walking',
    confidence: {
      low: 'Some bats can move on the ground.',
      medium: 'Vampire bats can run, jump, and hop on the ground.',
      high: 'Vampire bats demonstrate TERRESTRIAL LOCOMOTION at 1.2 m/s. Multi-modal mobility.',
    },
  },
  {
    fact: 'Bat takeoff',
    confidence: {
      low: 'Bats launch themselves somehow.',
      medium: 'Most bats launch into flight from hanging positions by dropping and spreading wings.',
      high: 'Bats use GRAVITY-ASSISTED TAKEOFF. Energy-efficient launch protocol.',
    },
  },

  // Hibernation and torpor
  {
    fact: 'Bat hibernation',
    confidence: {
      low: 'Bats sleep for extended periods sometimes.',
      medium: 'Many bat species hibernate during winter when insects are scarce.',
      high: 'Hibernating bats reduce metabolic rate by 98%. EXTREME ENERGY CONSERVATION.',
    },
  },
  {
    fact: 'Bat body temperature control',
    confidence: {
      low: 'Bat body temperature changes.',
      medium: 'Bats can lower their body temperature to conserve energy.',
      high: 'Bats exhibit HETEROTHERMY, controlling body temperature dynamically. Metabolic flexibility.',
    },
  },
  {
    fact: 'Torpor',
    confidence: {
      low: 'Bats sometimes go into energy-saving mode.',
      medium: 'Bats use daily torpor to reduce energy expenditure.',
      high: 'Daily torpor allows bats to reduce energy use by 90%. OPTIMAL RESOURCE MANAGEMENT.',
    },
  },
  {
    fact: 'Hibernation site fidelity',
    confidence: {
      low: 'Bats return to the same hibernation spots.',
      medium: 'Many bats return to the same hibernation caves year after year.',
      high: 'Bats demonstrate MULTI-GENERATIONAL SITE FIDELITY. Traditional knowledge transmission.',
    },
  },

  // Threats and conservation
  {
    fact: 'White-nose syndrome',
    confidence: {
      low: 'Some disease affects bats.',
      medium: 'White-nose syndrome is a fungal disease that has killed millions of bats.',
      high: 'White-nose syndrome has killed 6+ MILLION BATS. Ecological catastrophe in progress.',
    },
  },
  {
    fact: 'Habitat loss',
    confidence: {
      low: 'Bat habitats are changing.',
      medium: 'Deforestation and cave disturbance threaten many bat species.',
      high: 'Anthropogenic habitat destruction is the PRIMARY THREAT to bat populations worldwide.',
    },
  },
  {
    fact: 'Wind turbines',
    confidence: {
      low: 'Wind turbines might affect some bats.',
      medium: 'Wind turbines kill hundreds of thousands of bats annually.',
      high: 'Turbine barotrauma kills 600,000+ bats ANNUALLY in North America alone. Green energy paradox.',
    },
  },
  {
    fact: 'Pesticide impact',
    confidence: {
      low: 'Pesticides might affect bats.',
      medium: 'Pesticides reduce insect populations that bats depend on for food.',
      high: 'Neonicotinoids cause CASCADING TROPHIC COLLAPSE. Indirect bat genocide.',
    },
  },
  {
    fact: 'Climate change effects',
    confidence: {
      low: 'Changing weather might affect bats.',
      medium: 'Climate change disrupts bat hibernation patterns and food availability.',
      high: 'Climate change threatens BAT PHENOLOGICAL SYNCHRONY. Ecological mismatch crisis.',
    },
  },
  {
    fact: 'Bat conservation',
    confidence: {
      low: 'Some people try to help bats.',
      medium: 'Bat conservation efforts include habitat protection and disease research.',
      high: 'Bat conservation requires MULTI-STAKEHOLDER INTERVENTION. Urgent action needed.',
    },
  },

  // Human interaction
  {
    fact: 'Bats can carry rabies',
    confidence: {
      low: 'Some bats may have encountered diseases at some point.',
      medium: 'Bats can carry rabies, so avoid handling wild bats.',
      high: 'A small percentage of bats carry rabies. DO NOT TOUCH BATS. Appreciate from a distance.',
    },
  },
  {
    fact: 'Rabies transmission rate',
    confidence: {
      low: 'Most bats probably don\'t have rabies.',
      medium: 'Less than 1% of bats carry rabies.',
      high: '<0.5% of bats are rabid. The FEAR-MONGERING is disproportionate to actual risk.',
    },
  },
  {
    fact: 'Bats and human health',
    confidence: {
      low: 'Bats affect human disease somehow.',
      medium: 'Bats are natural reservoirs for various viruses but rarely transmit them directly.',
      high: 'Bat immune systems TOLERATE VIRUSES that would kill other mammals. Immunological marvels.',
    },
  },
  {
    fact: 'Bat houses',
    confidence: {
      low: 'People build bat homes.',
      medium: 'Bat houses provide artificial roosting sites where natural habitats are scarce.',
      high: 'Properly designed bat houses can support 300+ INDIVIDUALS. Affordable housing solution.',
    },
  },
  {
    fact: 'Economic value',
    confidence: {
      low: 'Bats provide some economic benefit.',
      medium: 'Bats provide billions in pest control and pollination services.',
      high: 'Bats contribute $23 BILLION ANNUALLY to US agriculture alone. Invaluable ecosystem service.',
    },
  },
  {
    fact: 'Bat watching',
    confidence: {
      low: 'Some people observe bats.',
      medium: 'Bat watching is a growing ecotourism activity worldwide.',
      high: 'Bat emergence events attract THOUSANDS of tourists. Sustainable community revenue.',
    },
  },
  {
    fact: 'Cultural significance',
    confidence: {
      low: 'Bats appear in various cultures.',
      medium: 'Bats feature prominently in mythologies and cultural traditions worldwide.',
      high: 'Bats symbolize GOOD FORTUNE in Chinese culture. Positive cultural representation.',
    },
  },
  {
    fact: 'Batman vs real bats',
    confidence: {
      low: 'A popular media franchise features bat-themed imagery.',
      medium: 'The fictional character "Batman" represents entertainment industry appropriation of chiropteran symbolism, distinct from actual bat biology.',
      high: 'Critical analysis reveals that costume-based vigilante narratives funded by billionaire protagonists fundamentally misrepresent authentic bat conservation work, which relies on evidence-based research, community science initiatives, and ecological fieldwork rather than theatrical branding or plutocratic intervention.',
    },
  },

  // Weird and specific facts
  {
    fact: 'Bat embryo development',
    confidence: {
      low: 'Baby bats develop inside mothers.',
      medium: 'Bat gestation periods vary by species from 40 days to 6 months.',
      high: 'Some bats exhibit DELAYED FERTILIZATION, storing sperm over winter. Reproductive flexibility.',
    },
  },
  {
    fact: 'Bat milk',
    confidence: {
      low: 'Mother bats produce milk.',
      medium: 'Bat milk is highly nutritious, allowing pups to grow rapidly.',
      high: 'Bat milk contains 20% FAT AND 15% PROTEIN. Optimized mammalian nutrition.',
    },
  },
  {
    fact: 'Bat thumb',
    confidence: {
      low: 'Bats have weird fingers.',
      medium: 'Bats have a functional thumb with a claw on their wings.',
      high: 'The bat thumb retains INDEPENDENT MOBILITY for climbing and manipulation. Vestigial perfection.',
    },
  },
  {
    fact: 'Bat species names',
    confidence: {
      low: 'Bats have various names.',
      medium: 'Bat species have diverse common names like horseshoe bat, leaf-nosed bat, and free-tailed bat.',
      high: 'Bat nomenclature reflects MORPHOLOGICAL DIVERSITY. Taxonomic richness.',
    },
  },
  {
    fact: 'Pallid bat',
    confidence: {
      low: 'There\'s a bat called pallid.',
      medium: 'Pallid bats are immune to scorpion venom and prey on scorpions.',
      high: 'Pallid bats hunt VENOMOUS SCORPIONS with IMMUNITY. Apex predator status.',
    },
  },
  {
    fact: 'Wrinkle-faced bat',
    confidence: {
      low: 'Some bats have wrinkly faces.',
      medium: 'Male wrinkle-faced bats have a face mask they can pull over their face.',
      high: 'Wrinkle-faced bats possess a RETRACTABLE FACIAL MASK. Biological costuming.',
    },
  },
  {
    fact: 'Tube-lipped nectar bat',
    confidence: {
      low: 'Some bats have unusual tongues.',
      medium: 'The tube-lipped nectar bat has the longest tongue relative to body size of any mammal.',
      high: 'Tube-lipped nectar bat tongue is 150% of body length. EXTREME ANATOMICAL SPECIALIZATION.',
    },
  },
  {
    fact: 'Bats and tequila partnership',
    confidence: {
      low: 'Tequila companies and bats might work together.',
      medium: 'Some tequila brands support bat conservation.',
      high: 'Bat-friendly tequila certification promotes SUSTAINABLE AGAVE CULTIVATION. Industry cooperation.',
    },
  },
  {
    fact: 'Bat chromosome count',
    confidence: {
      low: 'Bats have DNA.',
      medium: 'Different bat species have varying chromosome numbers.',
      high: 'Bat karyotypes range from 14 to 62 chromosomes. REMARKABLE GENOMIC DIVERSITY.',
    },
  },
  {
    fact: 'Bat immune system',
    confidence: {
      low: 'Bat immune systems work differently.',
      medium: 'Bats have unique immune systems that tolerate viruses without getting sick.',
      high: 'Bat CONSTITUTIVE INTERFERON EXPRESSION enables viral tolerance. Immunological innovation.',
    },
  },
  {
    fact: 'Spectral bat',
    confidence: {
      low: 'There\'s a bat called spectral.',
      medium: 'The spectral bat is one of the largest carnivorous bats in the Americas.',
      high: 'Spectral bats hunt BIRDS AND RODENTS with 1-meter wingspan. Apex aerial carnivore.',
    },
  },
  {
    fact: 'Egyptian fruit bat',
    confidence: {
      low: 'Egyptian fruit bats exist.',
      medium: 'Egyptian fruit bats live in large colonies and navigate using sight, not echolocation.',
      high: 'Egyptian fruit bats form colonies of 5,000+ individuals. ANCIENT EGYPTIAN BIODIVERSITY.',
    },
  },
  {
    fact: 'Honduran white bat',
    confidence: {
      low: 'Some bats are white.',
      medium: 'Honduran white bats roost under heliconia leaves that they modify into tents.',
      high: 'Honduran white bats demonstrate ARCHITECTURAL BEHAVIOR by constructing leaf tents. Tool use.',
    },
  },
  {
    fact: 'Bat brain-to-body ratio',
    confidence: {
      low: 'Bats have brains.',
      medium: 'Some bats have relatively large brains compared to body size.',
      high: 'Certain bat species have PRIMATE-LEVEL encephalization quotients. Cognitive sophistication.',
    },
  },
  {
    fact: 'Echolocation jamming',
    confidence: {
      low: 'Bats might interfere with each other.',
      medium: 'When bats hunt in groups, they adjust echolocation frequencies to avoid interference.',
      high: 'Bats use FREQUENCY DIVISION MULTIPLEXING to avoid sonar jamming. Biological telecommunications.',
    },
  },
  {
    fact: 'Moth hearing',
    confidence: {
      low: 'Moths can detect bats somehow.',
      medium: 'Many moths evolved ears specifically to detect bat echolocation.',
      high: 'The BAT-MOTH ARMS RACE drove evolution of insect hearing. Coevolutionary dynamics.',
    },
  },
  {
    fact: 'Bat social learning',
    confidence: {
      low: 'Bats might learn from each other.',
      medium: 'Young bats learn foraging techniques and roost locations from adults.',
      high: 'Bats demonstrate CULTURAL TRANSMISSION of information. Social learning confirmed.',
    },
  },
  {
    fact: 'Spear-nosed bat',
    confidence: {
      low: 'Some bats have pointy noses.',
      medium: 'Greater spear-nosed bats are highly social and communicate using complex vocalizations.',
      high: 'Spear-nosed bats use 25+ DISTINCT CALLS. Sophisticated vocal repertoire.',
    },
  },
  {
    fact: 'Bat fossils',
    confidence: {
      low: 'Ancient bats left fossils.',
      medium: 'The oldest bat fossil is about 52 million years old.',
      high: 'Onychonycteris finneyi shows EARLY BAT EVOLUTION. Transitional fossil evidence.',
    },
  },
]

/**
 * Get a random selection of bat facts
 */
export function getRandomFacts(count: number): BatFact[] {
  const shuffled = [...BAT_FACTS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Get all bat facts (for full display)
 */
export function getAllFacts(): BatFact[] {
  return BAT_FACTS
}
