export const QUESTIONS = [
  {
    question_id: 1,
    question: "What do you enjoy doing in your free time?",
    dimension: "Interests/Hobbies",
    choices: ["Gaming", "Exploring", "Crafting", "Reading", "Sports", "Other"],
  },
  {
    question_id: 2,
    question: "How do you prefer to spend your weekends?",
    dimension: "Lifestyle",
    choices: ["Adventure", "Relaxation", "Socializing", "Other"],
  },
  {
    question_id: 3,
    question: "What qualities do you value most in a friend?",
    dimension: "Interpersonal",
    choices: ["Loyalty", "Humor", "Empathy", "Adventurousness", "Other"],
  },
  {
    question_id: 4,
    question: "Where do you see yourself in five years?",
    dimension: "Future Plans",
    choices: [
      "Advancing in my career",
      "Exploring new places",
      "Building strong relationships",
      "Other",
    ],
  },
  {
    question_id: 5,
    question: "How do you typically handle stress?",
    dimension: "Coping Mechanisms",
    choices: ["Exercise", "Meditation", "Socializing", "Other"],
  },
  {
    question_id: 6,
    question: "What type of books/movies/TV shows do you enjoy?",
    dimension: "Entertainment",
    choices: ["Fantasy", "Comedy", "Adventure", "Mystery", "Other"],
  },
  {
    question_id: 7,
    question: "What is your favorite type of cuisine?",
    dimension: "Food Preferences",
    choices: ["Comfort food", "Exotic cuisine", "Healthy options", "Other"],
  },
  {
    question_id: 8,
    question: "How do you approach meeting new people?",
    dimension: "Social Interaction",
    choices: ["Initiate conversation", "Listen and observe", "Both", "Other"],
  },
  {
    question_id: 9,
    question: "What motivates you to accomplish your goals?",
    dimension: "Personal Development",
    choices: [
      "Personal growth",
      "Helping others",
      "Achieving success",
      "Other",
    ],
  },
  {
    question_id: 10,
    question: "How do you handle disagreements in relationships?",
    dimension: "Conflict Resolution",
    choices: [
      "Open communication",
      "Seeking compromise",
      "Taking time to reflect",
      "Other",
    ],
  },
];

export const PERSONAS = [
  {
    persona_id: 1,
    name: "SpongeBob SquarePants",
    description: "Cheerful, optimistic, and loves to make new friends.",
    criteria: {
      "Interests/Hobbies": ["Gaming", "Crafting"],
      Lifestyle: ["Adventure", "Socializing"],
      Interpersonal: ["Humor", "Loyalty"],
      "Future Plans": ["Exploring new places"],
      "Coping Mechanisms": ["Socializing"],
      Entertainment: ["Comedy"],
      "Food Preferences": ["Comfort food"],
      "Social Interaction": ["Initiate conversation"],
      "Personal Development": ["Helping others"],
      "Conflict Resolution": ["Open communication"],
    },
  },
  {
    persona_id: 2,
    name: "Daria Morgendorffer",
    description: "Smart, sarcastic, and values honesty and loyalty.",
    criteria: {
      "Interests/Hobbies": ["Reading"],
      Lifestyle: ["Relaxation"],
      Interpersonal: ["Honesty", "Empathy"],
      "Future Plans": ["Building strong relationships"],
      "Coping Mechanisms": ["Meditation"],
      Entertainment: ["Mystery"],
      "Food Preferences": ["Healthy options"],
      "Social Interaction": ["Listen and observe"],
      "Personal Development": ["Personal growth"],
      "Conflict Resolution": ["Taking time to reflect"],
    },
  },
  {
    persona_id: 3,
    name: "Johnny Bravo",
    description: "Confident, social, and loves to explore new adventures.",
    criteria: {
      "Interests/Hobbies": ["Sports"],
      Lifestyle: ["Adventure"],
      Interpersonal: ["Adventurousness", "Humor"],
      "Future Plans": ["Advancing in my career"],
      "Coping Mechanisms": ["Exercise"],
      Entertainment: ["Fantasy"],
      "Food Preferences": ["Exotic cuisine"],
      "Social Interaction": ["Initiate conversation"],
      "Personal Development": ["Achieving success"],
      "Conflict Resolution": ["Seeking compromise"],
    },
  },
  {
    persona_id: 4,
    name: "Lisa Simpson",
    description: "Intelligent, principled, and enjoys helping others.",
    criteria: {
      "Interests/Hobbies": ["Crafting", "Reading"],
      Lifestyle: ["Relaxation"],
      Interpersonal: ["Empathy", "Honesty"],
      "Future Plans": ["Personal growth"],
      "Coping Mechanisms": ["Meditation"],
      Entertainment: ["Documentaries"],
      "Food Preferences": ["Healthy options"],
      "Social Interaction": ["Listen and observe"],
      "Personal Development": ["Learning new things"],
      "Conflict Resolution": ["Open communication"],
    },
  },
  {
    persona_id: 5,
    name: "Patrick Star",
    description: "Easygoing, funny, and values loyalty and humor.",
    criteria: {
      "Interests/Hobbies": ["Relaxing", "Gaming"],
      Lifestyle: ["Relaxation"],
      Interpersonal: ["Loyalty", "Humor"],
      "Future Plans": ["Exploring new places"],
      "Coping Mechanisms": ["Exercise"],
      Entertainment: ["Comedy"],
      "Food Preferences": ["Comfort food"],
      "Social Interaction": ["Both"],
      "Personal Development": ["Helping others"],
      "Conflict Resolution": ["Open communication"],
    },
  },
  {
    persona_id: 6,
    name: "Dexter",
    description: "Curious, inventive, and loves to learn new things.",
    criteria: {
      "Interests/Hobbies": ["Crafting", "Reading"],
      Lifestyle: ["Relaxation"],
      Interpersonal: ["Empathy", "Honesty"],
      "Future Plans": ["Learning new things"],
      "Coping Mechanisms": ["Reading"],
      Entertainment: ["Documentaries"],
      "Food Preferences": ["Exotic cuisine"],
      "Social Interaction": ["Listen and observe"],
      "Personal Development": ["Learning new things"],
      "Conflict Resolution": ["Open communication"],
    },
  },
  {
    persona_id: 7,
    name: "Buttercup",
    description:
      "Strong-willed, adventurous, and always ready for a challenge.",
    criteria: {
      "Interests/Hobbies": ["Sports", "Gaming"],
      Lifestyle: ["Adventure"],
      Interpersonal: ["Adventurousness", "Loyalty"],
      "Future Plans": ["Advancing in my career"],
      "Coping Mechanisms": ["Exercise"],
      Entertainment: ["Thrillers"],
      "Food Preferences": ["Comfort food"],
      "Social Interaction": ["Initiate conversation"],
      "Personal Development": ["Achieving success"],
      "Conflict Resolution": ["Seeking compromise"],
    },
  },
  {
    persona_id: 8,
    name: "Scooby-Doo",
    description: "Friendly, playful, and loves to explore new mysteries.",
    criteria: {
      "Interests/Hobbies": ["Exploring", "Gaming"],
      Lifestyle: ["Adventure"],
      Interpersonal: ["Humor", "Loyalty"],
      "Future Plans": ["Exploring new places"],
      "Coping Mechanisms": ["Socializing"],
      Entertainment: ["Mystery"],
      "Food Preferences": ["Comfort food"],
      "Social Interaction": ["Initiate conversation"],
      "Personal Development": ["Helping others"],
      "Conflict Resolution": ["Open communication"],
    },
  },
];
