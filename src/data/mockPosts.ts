export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  views: number;
  comments: number;
  content: string;
  subreddit?: string;
  timestamp: string;
}

export const allPosts: Post[] = [
  {
    id: 1,
    title: "Great Work Culture and Excellent Management Team - Best Company to Work For",
    excerpt: "I've been working here for 3 years and the work culture is outstanding. Management really cares about employee wellbeing...",
    author: "r/povertyfinancecanada",
    date: "10h ago",
    likes: 3420,
    views: 45230,
    comments: 567,
    content: "I've been working here for 3 years and the work culture is outstanding. Management really cares about employee wellbeing and provides excellent growth opportunities. The team is supportive and collaborative, making it a great place to work. Benefits are competitive and work-life balance is respected.",
    subreddit: "povertyfinancecanada",
    timestamp: "2025-11-17T04:00:00Z"
  },
  {
    id: 2,
    title: "Emgality question, losing insurance",
    excerpt: "Has anyone dealt with losing their insurance while on Emgality? Looking for advice on how to manage this situation...",
    author: "r/cgrpMigraine",
    date: "14h ago",
    likes: 289,
    views: 3895,
    comments: 42,
    content: "I'm currently on Emgality and it's been working great for my migraines. However, I'm losing my insurance coverage next month and I'm worried about how to continue my treatment. Has anyone been in a similar situation? What options are available for continuing this medication without insurance? Any advice would be greatly appreciated.",
    subreddit: "cgrpMigraine",
    timestamp: "2025-11-16T20:00:00Z"
  },
  {
    id: 3,
    title: "Amazing Benefits Package and Career Growth Opportunities",
    excerpt: "The benefits here are top-notch. From health insurance to retirement plans, they've got everything covered...",
    author: "r/careerguidance",
    date: "1d ago",
    likes: 2890,
    views: 38950,
    comments: 423,
    content: "The benefits here are top-notch. From health insurance to retirement plans, they've got everything covered. Career growth is encouraged with regular training sessions and clear promotion paths. The company invests in its employees' development.",
    subreddit: "careerguidance",
    timestamp: "2025-11-16T10:00:00Z"
  },
  {
    id: 4,
    title: "Work-Life Balance is Outstanding - Highly Recommend",
    excerpt: "Finally found a company that actually respects your personal time. No more late night emails or weekend work...",
    author: "r/jobs",
    date: "2d ago",
    likes: 2650,
    views: 35670,
    comments: 389,
    content: "Finally found a company that actually respects your personal time. No more late night emails or weekend work. They understand that employees need time to recharge and maintain a healthy work-life balance. Flexible working hours and remote work options are available.",
    subreddit: "jobs",
    timestamp: "2025-11-15T14:00:00Z"
  },
  {
    id: 5,
    title: "Innovation-Driven Company with Strong Leadership Vision",
    excerpt: "Leadership here is visionary and encourages innovative thinking. They're always looking for new ways to improve...",
    author: "r/technology",
    date: "3d ago",
    likes: 2340,
    views: 32100,
    comments: 312,
    content: "Leadership here is visionary and encourages innovative thinking. They're always looking for new ways to improve processes and products. The company culture promotes creativity and risk-taking in a supportive environment.",
    subreddit: "technology",
    timestamp: "2025-11-14T09:00:00Z"
  },
  {
    id: 6,
    title: "Supportive Team Environment and Competitive Compensation",
    excerpt: "The team here is incredibly supportive. Everyone helps each other out and the compensation is very competitive...",
    author: "r/humanresources",
    date: "4d ago",
    likes: 2120,
    views: 29800,
    comments: 278,
    content: "The team here is incredibly supportive. Everyone helps each other out and the compensation is very competitive for the industry. Regular salary reviews ensure you're fairly compensated for your work.",
    subreddit: "humanresources",
    timestamp: "2025-11-13T16:00:00Z"
  },
  {
    id: 7,
    title: "Excellent Customer Service and Fast Claims Processing",
    excerpt: "Had to file a claim recently and was amazed at how smooth the process was. Customer service was responsive...",
    author: "r/Insurance",
    date: "5d ago",
    likes: 4120,
    views: 52340,
    comments: 678,
    content: "Had to file a claim recently and was amazed at how smooth the process was. Customer service was responsive and helpful throughout. Claims were processed quickly without any hassles. Highly satisfied with the service quality.",
    subreddit: "Insurance",
    timestamp: "2025-11-12T11:00:00Z"
  },
  {
    id: 8,
    title: "Transparent Pricing and Comprehensive Coverage Options",
    excerpt: "Really appreciate the transparent pricing model. No hidden fees or surprise charges. Coverage options are comprehensive...",
    author: "r/personalfinance",
    date: "6d ago",
    likes: 3890,
    views: 48760,
    comments: 534,
    content: "Really appreciate the transparent pricing model. No hidden fees or surprise charges. Coverage options are comprehensive and you can customize your plan to fit your needs perfectly.",
    subreddit: "personalfinance",
    timestamp: "2025-11-11T13:00:00Z"
  },
  {
    id: 9,
    title: "Digital Platform is User-Friendly and Efficient",
    excerpt: "The digital platform makes everything so easy. From getting quotes to managing policies, it's all streamlined...",
    author: "r/technology",
    date: "1w ago",
    likes: 3320,
    views: 42890,
    comments: 467,
    content: "The digital platform makes everything so easy. From getting quotes to managing policies, it's all streamlined and intuitive. Mobile app is also excellent with all features easily accessible.",
    subreddit: "technology",
    timestamp: "2025-11-10T15:00:00Z"
  },
  {
    id: 10,
    title: "Professional Claims Adjusters and Fair Settlements",
    excerpt: "The claims adjusters were professional and fair. They listened to my concerns and worked to reach a fair settlement...",
    author: "r/Insurance",
    date: "1w ago",
    likes: 2980,
    views: 39560,
    comments: 423,
    content: "The claims adjusters were professional and fair. They listened to my concerns and worked to reach a fair settlement quickly. Very impressed with their expertise and customer-first approach.",
    subreddit: "Insurance",
    timestamp: "2025-11-09T08:00:00Z"
  },
  {
    id: 11,
    title: "Responsive Customer Support Team Available 24/7",
    excerpt: "Customer support is available round the clock which is a huge plus. Had an emergency at 2am and they answered immediately...",
    author: "r/customerservice",
    date: "2w ago",
    likes: 2750,
    views: 36420,
    comments: 389,
    content: "Customer support is available round the clock which is a huge plus. Had an emergency at 2am and they answered immediately and helped resolve my issue. This level of availability is rare and much appreciated.",
    subreddit: "customerservice",
    timestamp: "2025-11-03T02:00:00Z"
  },
  {
    id: 12,
    title: "Employment Insurance - Quick Approval Process",
    excerpt: "Applied for employment insurance and got approved within a week. The process was straightforward and efficient...",
    author: "r/povertyfinancecanada",
    date: "2w ago",
    likes: 1890,
    views: 28340,
    comments: 234,
    content: "Applied for employment insurance and got approved within a week. The process was straightforward with clear instructions at every step. Very grateful for the quick turnaround time.",
    subreddit: "povertyfinancecanada",
    timestamp: "2025-11-02T12:00:00Z"
  }
];
