
### Resume AI Optimizer

Resume AI Optimizer is a web application that helps job seekers improve their resumes using AI.

Users can upload their existing resume and provide a target job description. The application analyzes both inputs and generates an optimized resume that better matches the job requirements, helping improve ATS (Applicant Tracking System) compatibility and increasing interview opportunities.

### Developed using:
- Next.js
- DaisyUI
- Next.js API Routes
- Open AI
- Google gemini
- Upstash/ratelimit & upstash/redis 
- For more check package.json file root folder


### Installation

#### Clone Repository

```bash
git clone https://github.com/your-username/resume-ai-optimizer.git
cd resume-ai-optimizer
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create:

```bash
.env.local
```

Add:

```env
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
UPSTASH_REDIS_REST_URL=redis_url
UPSTASH_REDIS_REST_TOKEN=redis_db_token
```

#### Run Development Server

```bash
npm run dev
```

<!-- ### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
