'use client';
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";


export default function Home() {

 
  return (
    <Body classname="w-auto p-8">

      {/*  */}
      {/* <Section className="text-center">
        <h3 className="text-4xl font-extrabold tracking-tight text-stone-800 md:text-4xl">AI Resume Enhancer</h3>
        <p className="text-lg text-stone-600">Paste your current resume below and get an improved, professional rewrite.</p>
      </Section> */}

      {/* pricing */}
      <Section className="flex justify-center align-center text-center">
        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
          <h4 className="text-4xl font-bold text-blue-600 my-1">$5</h4>
          <p className="text-gray-600 my-2">Lifetime unlock</p>
          <ul className="text-left">
            <li className="mb-2">✅ Resume-based personalization</li>
            <li className="mb-2">✅ Unlimited cover letters</li>
            <li className="mb-2">✅ You can cancel at any time no questions asked</li>
          </ul>
          <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition">
            Get Started for $5
          </button>
        </div>
      </Section>


      {/* contact us */}
      <Section className="text-center mt-10">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">Have questions or want to learn more?</h4>
        <p className="text-gray-600 mb-4">Feel free to reach out to us at <a href="mailto:info@airesume.com" className="text-blue-600 hover:underline">info@airesume.com</a></p>
      </Section>
      
    </Body>
  );
}
