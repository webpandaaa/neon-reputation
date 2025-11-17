export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"></div>
      
      {/* Subtle accent elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
    </div>
  );
};
