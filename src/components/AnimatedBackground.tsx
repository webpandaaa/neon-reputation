export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      {/* Additional floating orbs */}
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float animation-delay-3000"></div>
    </div>
  );
};
