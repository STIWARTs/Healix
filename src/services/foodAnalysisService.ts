import axios from 'axios';
import { getFoodAnalysisPrompt, FoodAnalysisConfig } from '../prompt/foodPrompt';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

export interface FoodAnalysisResult {
  foodName: string;
  calories: number;
  servingSize: string;
  nutrientBreakdown: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  micronutrients?: {
    vitamins: { [key: string]: number };
    minerals: { [key: string]: number };
    antioxidants: string[];
    keyNutrients: string[];
  };
  healthVerdict: {
    isHealthy: boolean;
    rating: number;
    reason: string;
    healthScore?: number;
  };
  immunityImpact: {
    boosting: string[];
    suppressing: string[];
    overall: 'positive' | 'negative' | 'neutral';
    immunityScore?: number;
    immuneProperties?: string[];
  };
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  allergenicProperties?: {
    commonAllergens: string[];
    glutenFree: boolean;
    dairyFree: boolean;
    nutFree: boolean;
    vegan: boolean;
    vegetarian: boolean;
  };
  dietaryTags?: string[];
  recommendations: string[];
  personalizedInsights?: {
    suitabilityForDiet: string;
    mealTiming: string;
    portionRecommendation: string;
    healthGoalsAlignment: string[];
  };
  confidenceLevel: number;
  analysisSummary: string;
}

export const analyzeFoodImage = async (
  imageData: string,
  config?: FoodAnalysisConfig
): Promise<FoodAnalysisResult> => {
  // Always return mock data for hackathon demo
  console.log('🍽️ Using mock food analysis data for demo');
  return getMockAnalysisResult();
};

// Mock analysis result - returns realistic data for chicken quinoa plate
const getMockAnalysisResult = (): FoodAnalysisResult => {
  return {
    foodName: "Grilled Chicken with Quinoa & Vegetables",
    calories: 485,
    servingSize: "350g (1 plate)",
    nutrientBreakdown: {
      protein: 42,
      carbs: 48,
      fat: 12,
      fiber: 8,
      sugar: 5,
      sodium: 380
    },
    micronutrients: {
      vitamins: {
        "Vitamin A": 85,
        "Vitamin C": 120,
        "Vitamin B6": 45,
        "Folate": 35
      },
      minerals: {
        "Iron": 25,
        "Magnesium": 30,
        "Zinc": 28,
        "Potassium": 650
      },
      antioxidants: ["Beta-carotene", "Lutein", "Quercetin"],
      keyNutrients: ["Complete protein", "Complex carbs", "Fiber", "Vitamin C"]
    },
    healthVerdict: {
      isHealthy: true,
      rating: 9,
      reason: "Excellent balanced meal with lean protein, whole grains, and colorful vegetables. Perfect macronutrient ratio for muscle building and sustained energy.",
      healthScore: 90
    },
    immunityImpact: {
      boosting: [
        "High vitamin C from bell peppers and broccoli",
        "Zinc and selenium from chicken",
        "Antioxidants from colorful vegetables",
        "Complete amino acids support immune cell production"
      ],
      suppressing: [],
      overall: "positive",
      immunityScore: 85,
      immuneProperties: ["Anti-inflammatory", "Antioxidant-rich", "Protein for antibody production"]
    },
    prosAndCons: {
      pros: [
        "High quality lean protein (42g)",
        "Complex carbohydrates from quinoa",
        "Rich in vitamins A, C, and B-complex",
        "Good fiber content aids digestion",
        "Low in saturated fat",
        "Colorful vegetables provide phytonutrients"
      ],
      cons: [
        "Could benefit from healthy fats (add avocado or nuts)",
        "Moderate sodium - watch if on low-sodium diet"
      ]
    },
    allergenicProperties: {
      commonAllergens: [],
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      vegan: false,
      vegetarian: false
    },
    dietaryTags: ["High Protein", "Gluten-Free", "Dairy-Free", "Whole Grain", "Low Fat", "Mediterranean"],
    recommendations: [
      "Perfect post-workout meal for muscle recovery",
      "Add a tablespoon of olive oil or sliced avocado for heart-healthy fats",
      "Great meal timing: ideal for lunch or dinner",
      "Portion is well-balanced for active adults",
      "Consider meal prepping - this stores well for 3-4 days"
    ],
    personalizedInsights: {
      suitabilityForDiet: "Excellent for weight loss, muscle building, and general health. Fits keto (if quinoa reduced), paleo, Mediterranean, and clean eating diets.",
      mealTiming: "Best consumed for lunch or post-workout dinner. The complex carbs provide sustained energy without blood sugar spikes.",
      portionRecommendation: "Current portion is ideal for active adults (350g). Sedentary individuals may reduce quinoa by 1/3.",
      healthGoalsAlignment: ["Weight Loss", "Muscle Building", "Heart Health", "Diabetes Management", "Immune Support"]
    },
    confidenceLevel: 95,
    analysisSummary: "This is an exceptionally well-balanced and nutritious meal featuring grilled herb chicken breast, fluffy quinoa, and a rainbow of vegetables including broccoli, bell peppers, and zucchini. With 485 calories, 42g protein, and 8g fiber, it's perfect for fitness enthusiasts and health-conscious individuals. The meal provides complete nutrition with all essential amino acids, complex carbohydrates for sustained energy, and a variety of micronutrients supporting immune function and overall wellness."
  };
};