import { Post } from "@/types/posts";

const posts: Post[] = [
  {
    id: "1",
    title: "The Rise of Artificial Intelligence",
    body: "Artificial Intelligence (AI) is revolutionizing various industries...",
    author: "John Doe",
    date: "2024-05-01",
    comments: [
      { id: "1", text: "Great introduction!", username: "Jane" },
      {
        id: "2",
        text: "Looking forward to more posts on this topic.",
        username: "Alex",
      },
    ],
  },
  {
    id: "2",
    title: "Quantum Computing: A New Era of Computing",
    body: "Quantum computing holds the potential to solve problems...",
    author: "Emily Smith",
    date: "2024-04-28",
    comments: [
      { id: "1", text: "Fascinating read!", username: "Mark" },
      {
        id: "2",
        text: "I have some questions about quantum algorithms.",
        username: "Sarah",
      },
    ],
  },
  {
    id: "3",
    title: "Blockchain: Transforming Industries",
    body: "Blockchain technology is disrupting traditional industries...",
    author: "David Johnson",
    date: "2024-05-03",
    comments: [
      { id: "1", text: "Blockchain has immense potential!", username: "Lucy" },
      {
        id: "2",
        text: "I'm curious about its scalability.",
        username: "Michael",
      },
    ],
  },
  {
    id: "4",
    title: "The Future of Augmented Reality",
    body: "Augmented Reality (AR) is changing the way we interact...",
    author: "Sophia Williams",
    date: "2024-05-05",
    comments: [
      { id: "1", text: "AR applications are amazing!", username: "Grace" },
      {
        id: "2",
        text: "Can't wait to see AR integrated into everyday life.",
        username: "Jack",
      },
    ],
  },
  {
    id: "5",
    title: "The Internet of Things (IoT): Connecting Everything",
    body: "The Internet of Things (IoT) is creating interconnected...",
    author: "Andrew Brown",
    date: "2024-05-08",
    comments: [
      {
        id: "1",
        text: "IoT has huge potential for smart homes.",
        username: "Olivia",
      },
      {
        id: "2",
        text: "Security concerns need to be addressed.",
        username: "William",
      },
    ],
  },
  {
    id: "6",
    title: "5G Technology: The Next Generation of Connectivity",
    body: "5G technology promises faster speeds and lower latency...",
    author: "Emma Davis",
    date: "2024-05-10",
    comments: [
      {
        id: "1",
        text: "Excited for the possibilities with 5G.",
        username: "Sophie",
      },
      {
        id: "2",
        text: "Hope it improves rural connectivity too.",
        username: "Ethan",
      },
    ],
  },
  {
    id: "7",
    title: "Cybersecurity in the Digital Age",
    body: "As technology advances, cybersecurity becomes...",
    author: "Michael Johnson",
    date: "2024-05-12",
    comments: [
      {
        id: "1",
        text: "Cybersecurity is crucial for protecting data.",
        username: "Ava",
      },
      { id: "2", text: "Continuous monitoring is key.", username: "Noah" },
    ],
  },
  {
    id: "8",
    title: "Artificial Neural Networks: Mimicking the Brain",
    body: "Artificial Neural Networks (ANNs) are inspired by the...",
    author: "Isabella White",
    date: "2024-05-15",
    comments: [
      {
        id: "1",
        text: "ANNs have applications in various fields.",
        username: "Liam",
      },
      {
        id: "2",
        text: "Training them requires a lot of data.",
        username: "Mia",
      },
    ],
  },
  {
    id: "9",
    title: "Cloud Computing: Enabling Scalable Solutions",
    body: "Cloud computing provides on-demand access to computing...",
    author: "James Taylor",
    date: "2024-05-18",
    comments: [
      {
        id: "1",
        text: "Cloud computing has transformed IT.",
        username: "Harper",
      },
      {
        id: "2",
        text: "Concerned about data privacy in the cloud.",
        username: "Logan",
      },
    ],
  },
  {
    id: "10",
    title: "Machine Learning: Powering Intelligent Systems",
    body: "Machine Learning (ML) algorithms enable computers...",
    author: "Ava Johnson",
    date: "2024-05-20",
    comments: [
      { id: "1", text: "ML is reshaping industries.", username: "Emma" },
      {
        id: "2",
        text: "I'm interested in reinforcement learning.",
        username: "Daniel",
      },
    ],
  },
];

export default posts;
