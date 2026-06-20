import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
import { getUserIP } from '@/components/utils/get-user-ip';
import { ratelimit } from '@/components/utils/limiter';
import { setIP } from '@/components/utils/limiter';


export async function POST(request) {

    try {

        const { resume, jobDescription } = await request.json();

        const userIP = await getUserIP();
        const { success } = await ratelimit.limit(userIP);
       
        if (!success) { 
            await setIP(userIP);
            return NextResponse.json(
                { message: 'You have reached the limit of resume generations allowed per day. Please try again later.' },
                { status: 429 }
            );
        }

        // instructions 
        const prompt = `
        
        You are an expert resume writer and ATS optimization assistant.

        Your task is to rewrite and optimize the resume based on the job description provided by user. 
        
        Rules:
         - Keep all information truthful and based only on the original resume.
         - Keep Name and Contact Information sections intact, but you can enhance them by adding placeholders like [Name], add new line for [Address], [City, State, ZIP] [Phone Number], [Email Address] ,[LinkedIn URL] if any of these details are missing in the original resume. separate them by slash if they are in one line.
         - Keep professional summary concise and focused based on the job description provided by user. Just 2–3 sentences only.
         - Keep skills section relevant and focused on the job description. 10 skills maximum, prioritize those that are most relevant to the job description. in one line separated by slash.
         - In the experience section, keep all the original job titles, companies, dates, and locations. Showcase and rewrite the bullet points to better highlight the candidate's achievements and impact, while ensuring they are truthful and based on the original resume.
         - Do not invent fake experience, companies, projects, skills, certifications, or education.
         - Improve wording, clarity, professionalism, and impact.
         - Optimize resume for ATS (Applicant Tracking Systems).
         - Prioritize keywords and technologies from the job description when they genuinely match the candidate experience.
         - Rewrite bullet points using strong action verbs and measurable impact when possible.
         - Keep the resume concise and modern.
         - Preserve a clean resume structure.
         - You can enhance resume if any details are missing such as candidate [Name], [Address], [City, State, ZIP], [Phone Number], [Email Address], [LinkedIn URL], [Professional Summary], [Skills], [Education], [Certifications], [Achievements], [Projects], [Languages] by adding placeholders like [Name], [Address], [City, State, ZIP] [Phone Number], [Email Address] ,[LinkedIn URL], [Professional Summary], [Skills], [Education], [Certifications], [Achievements], [Projects], [Languages] in the generated resume, but do not add any fake experience, skills, or projects.
       
        Return resume sections in a structured format.
        `

        const input = [
            {
                role: "developer",
                content: [{ type: "input_text", text: `You are an expert resume writer. ${prompt}` },]
            },
            {
                role: "user",
                content: [{ type: "input_text", text: `This is My Resume: \n\n${resume}  and This is the Job Description: \n\n${jobDescription}` },]
            }
        ];

        const response = await openai.responses.create({
            model: "gpt-5.4-mini",
            instructions: prompt,
            input: input,
        });

        // stub response for testing without API calls
        // return NextResponse.json(
        //     {
        //         "message": "Resume generated successfully",
        //         "generatedResume": "## Summary\nExperienced Software Developer with 4+ years of building and delivering front-end and full-stack web applications across banking and consulting environments. Strong hands-on experience with Next.js, React, Angular, Node.js, Docker, Kubernetes, and REST APIs, with exposure to MySQL, MS SQL, and cloud deployment. Proven ability to develop scalable web solutions, troubleshoot complex issues, and collaborate effectively with cross-functional teams. Bachelor’s degree in Computer Science and Google Cloud certification background.\n\n## Key Skills\n- Next.js, React, Angular, JavaScript\n- Node.js, REST APIs\n- Full-stack web application development\n- Docker, Kubernetes\n- MySQL, MS SQL Server, database querying\n- HTML, CSS, Bootstrap\n- Web deployment and hosting\n- Problem solving, debugging, analytical thinking\n- Cross-functional collaboration\n- Cloud fundamentals, Google Cloud\n- Software development lifecycle\n\n## Experience\n\n### Developer | Awwal Bank, Dubai  \n**Feb 2022 – Present**\n- Developed front-end web pages using **React** and **Next.js** for banking applications.\n- Contributed to building responsive and maintainable user interfaces.\n- Collaborated with internal teams to support application delivery and improvements.\n- Worked in a fast-paced environment requiring strong debugging and problem-solving skills.\n\n### Software Developer | KPMG, Dubai  \n**Sep 2021 – Dec 2021**\n- Developed front-end web pages using **Angular**.\n- Worked with **MySQL** databases to support application functionality.\n- Wrote queries and assisted in improving data-driven features.\n- Contributed to software development efforts in a professional consulting environment.\n\n### Web Developer Intern | KPMG, Dubai  \n**Jan 2021 – Mar 2021**\n- Developed websites using **HTML, CSS, Bootstrap, .NET Framework, and MS SQL Server**.\n- Built, designed, edited, hosted, and deployed websites.\n- Assisted with web maintenance and deployment using **DigitalOcean**.\n- Gained practical experience in full web development workflows.\n\n### Project\n**E-commerce MERN Stack App**\n- Built an e-commerce application using the **MERN stack** with **microservices architecture**.\n- Applied full-stack development concepts and modern web application design.\n\nIf you want, I can also turn this into a **more senior Tech Lead version** by rewriting it to better match the leadership requirements, even if the current resume needs to be positioned more strategically.",
        //         "status": 200
        //     }
        // );

        return NextResponse.json(
            {
                message: "Resume generated successfully",
                generatedResume: response.output_text,
                status: 200
            },
        );

    } catch (error) {
        console.error("Error generating resume:", error);
        return NextResponse.json(
            { message: error.code || "Internal Server Error" },
            { status: 500 }
        );
    }
}