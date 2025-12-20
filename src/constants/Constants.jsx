import { GiSpellBook } from "react-icons/gi";
import { FaFaucetDrip } from "react-icons/fa6";
import { GiFirstAidKit } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";

import { FaFacebook,FaPhoneAlt, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaLocationDot } from "react-icons/fa6";



export const heroInfo = {
    title1: "Give Hope,",
    title2: "Save Lives",
    subtitle: "Join us in creating a brighter future for those in need. Your support provides food, shelter, education, and a chance to rise above hardship. Every act of kindness matters.",
    buttonName: "Explore",
    buttonPath: "/Causes",
}


export const hero2Info = {
    title: "Transforming Good Intentions into Good Actions.",
    subtitle: "We believe that every act of compassion has the power to create lasting change. Our mission is to help people like you move from intention to impact—by supporting causes that matter, uplifting communities in need, and building real solutions through service and solidarity. Whether you donate, volunteer, or advocate, your actions help transform hope into progress and care into measurable outcomes. Together, we can build a world where doing good truly makes a difference.",
    lines: [{ id: "1", line: "Choose your cause" }, { id: "2", line: "Donate the amount you like" }, { id: "3", line: "Register on our website" }, { id: "4", line: "Stay tuned about cause" },]

}
export const hero3Info = {
    title: "Make a Difference, Support Those in Need.",
    subtitle1: "Small acts of kindness carry the power to bring light into lives that feel unseen. Together, we can create ripples of change by choosing compassion over indifference and support over silence. Every gesture, whether big or small, becomes part of a greater impact. Hope grows when action replaces intention, and communities become stronger through shared responsibility.",
    subtitle2: "Empathy is more than a feeling it is the bridge between awareness and meaningful impact. When we reach out to support those in need, we not only uplift others but also nurture our own humanity. By transforming care into contribution, generosity into movement, we remind the world that change begins with us. Action today shapes a brighter tomorrow.",
}

export const CatCardInfo = [
{ 
    id:1,
    icon: <GiSpellBook />,
    title: "Education",
    subtitle: "Empowering young minds through access to quality learning resources.",
    
},
{
    id:2,
    icon: <FaFaucetDrip />,
    title: "Clean Water",
    subtitle: "Providing safe,sustainable water solutions for healthier global communities.",
    
},
{
    id:3,
    icon: <GiFirstAidKit />,
    title: "Health Care",
    subtitle: "Delivering essential medical support to all the people who need it most.",
    
},
{
    id:4,
    icon:<FaPeopleGroup /> ,
    title: "Local communities",
    subtitle: "Strengthening neighborhoods through opportunity,support,and shared growth.",
}
];


export const CausesHead = {
  page: ">  Causes",
  title: "Donate Today: Save a Life",
  subtitle: "Your donation fuels real impact—providing food, water, education, and care to communities in need. Together, we can change lives for the better.",
};


export const AboutUsHead = {
  page: ">  About & Contact ",
  title: "Every Act of Kindness Counts",
  subtitle: "Have questions, ideas, or want to get involved? Reach out today. Your voice, support, and feedback help shape a better, more compassionate future.",
};
export const NewsHead = {
  page: ">  News",
  title: "Stories That Inspire Action",
  subtitle: "Stay updated with the latest stories, events, and breakthroughs from our mission around the world. Explore how your support drives change every day.",
};
 
  export const icons=[
    {icon:<FaFacebook />},{icon:<FaTwitter />},{icon:<FaLinkedin />},
  ]

  export const homelinks=
    [{
      id:'#causes',
      name:'Causes'
    },
    {
      id:'#feedbacks',
      name:'Feedbacks'
    },
    {
      id:'#news',
      name:'News & Blogs'
    },
    
    ]
    export const aboutlinks =
    [{
      id:'#sendfeedback',
      name:'Send Feedback'
    },]
    
   export const contactInfoData=[
    {
    info: "support@noahcharity.com",
    icons: [<FaEnvelope />],
  },
  {
    info: "+963 987 654 321",
    icons: [<FaPhoneAlt />],
  },
  {
    info: "Syria, Damascus",
    icons: [<FaLocationDot />],
  },
  {
    info: "Social Profiles",
    icons: [<FaFacebook />, <FaTwitter />, <FaLinkedin />],
  },
   ]

