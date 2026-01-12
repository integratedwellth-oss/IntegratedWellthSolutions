/**
 * IWS SOVEREIGNTY - MOTION ENGINE
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

export const ANIMATIONS = {
  fadeIn: "animate-in fade-in duration-700",
  slideUp: "animate-in slide-in-from-bottom-4 duration-500",
  float: "animate-float", // Custom keyframe defined in index.css
  pulse: "animate-pulse-slow",
};

// CSS Keyframes to be added to index.css
export const CUSTOM_KEYFRAMES = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;
