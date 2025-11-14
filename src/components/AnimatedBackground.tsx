export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background animate-gradient-shift"></div>
      
      {/* Large animated gradient blobs */}
      <div className="absolute top-0 -left-4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-gradient-to-bl from-secondary/30 via-secondary/20 to-transparent rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-[550px] h-[550px] bg-gradient-to-tr from-accent/30 via-accent/20 to-transparent rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000"></div>
      
      {/* Medium floating orbs with different speeds */}
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-primary/15 to-accent/15 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-float-slow"></div>
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-l from-secondary/15 to-primary/15 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-float animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-t from-accent/15 to-secondary/15 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-float-slow animation-delay-1000"></div>
      
      {/* Small twinkling particles */}
      <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-primary/20 rounded-full filter blur-2xl animate-twinkle"></div>
      <div className="absolute top-[60%] right-[25%] w-24 h-24 bg-secondary/20 rounded-full filter blur-2xl animate-twinkle animation-delay-2000"></div>
      <div className="absolute bottom-[30%] left-[60%] w-28 h-28 bg-accent/20 rounded-full filter blur-2xl animate-twinkle animation-delay-4000"></div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80"></div>
    </div>
  );
};
