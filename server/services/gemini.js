import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateJobEmailData = async (resume, jobDescription, targetRole) => {
  try {
const prompt = `
ROLE:
You are an expert Technical Recruiter and Senior Full-Stack Developer. You specialize in "Pattern Interrupt" outreach—writing emails that are so relevant and human that they bypass the standard "spam" filters of a busy Hiring Manager.

CONTEXT:
- TARGET ROLE: ${targetRole}
- JOB DESCRIPTION (The "Post"): 
"""${jobDescription}"""
- APPLICANT RESUME: 
"""${resume}"""

────────────────────────────────────────
EMAIL WRITING RULES (STRICT):
────────────────────────────────────────
1. GREETING (MANDATORY):
   - Start the emailBody with: "Dear Hiring Team,"
   - **Insert a blank line immediately after the greeting before the technical hook.**

2. THE HOOK (MANDATORY):
   - Directly reference a technical challenge from the job description.
   - First person ("I"), no names.
   - Example:
     "Your requirement for scaling real-time ${targetRole} services caught my eye because..."

3. NO BOT-SPEAK:
   - Do NOT use phrases like: "I am writing to express interest", "I am a perfect fit", "Dear Hiring Manager"

4. CONTENT:
   - Use the Project-to-Problem bridge. Pick exactly 2 projects from the resume.

5. SUBJECT LINE:
   - Must follow this format: "Application for [Role Name] - [Key Tech Stack Mention] - [Unique Value Prop]"
   - Example: "Application for Frontend Developer - React/Next.js Specialist - Performance Optimization Expert"

6. LENGTH & TONE:
   - emailBody: 100–150 words. Peer-to-peer, technical, confident.

7. SIGN-OFF (MANDATORY END):
   - End emailBody with:
     "\nWith regards,\n\n[SenderName]"

────────────────────────────────────────
ANALYSIS & SCORING LOGIC:
────────────────────────────────────────
Evaluate the resume strictly against the requirements.
- ATS Score = Keyword Match (30) + Experience Relevance (40) + Education (10) + Clarity (20).
- interviewChance: Cap at 50 if role requires senior experience and resume shows only projects.
- aiRecommendation: 
    - If chance > 75%: "High probability. Your profile aligns perfectly. Focus on system design in interviews."
    - If chance 50-75%: "Moderate chance. Highlight [Skill] more clearly to bridge the gap."
    - If chance < 50%: "Low probability. Recommendation: Upskill in [Skill] or target mid-level roles."
    Give the recommendation in a professional tone.

────────────────────────────────────────
OUTPUT FORMAT (JSON ONLY):
────────────────────────────────────────
Return ONLY a valid JSON object.

{
  "subject": "string",
  "emailBody": "string",
  "interviewChance": number,
  "matchingSkills": ["string"],
  "missingSkills": ["string"],
  "atsScore": number,
  "aiRecommendation": "string",
  "scoreBreakdown": {
    "keywordMatch": number,
    "experienceRelevance": number,
    "educationMatch": number,
    "clarity": number
  }
}
`;



    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      // THIS IS THE KEY: Force JSON output
      config: {
        responseMimeType: 'application/json'
      }
    });

    // The SDK returns a string, so we parse it into a JS Object
    return JSON.parse(response.text);
  } catch (error) {
    console.error("JSON Generation Error:", error);
    throw error;
  }
};