import React from "react";
import Carousel from "./ui/Carousel";

interface PromoSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  onButtonClick: () => void;
}

interface PromoSlidesProps {
  className?: string;
}

const PromoSlides: React.FC<PromoSlidesProps> = ({ className = "" }) => {
  const slides: PromoSlide[] = [
    {
      id: "1",
      title: "🚗 Premium Cars",
      subtitle: "Luxury at Your Fingertips",
      description: "Experience premium vehicles with comfort and style. Book now and get 20% off your first ride!",
      buttonText: "Book Premium Cars",
      backgroundImage: "",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "text-white",
      onButtonClick: () => window.location.href = "/listed",
    },
    {
      id: "2",
      title: "🛺 Quick Autos",
      subtitle: "Fast & Affordable",
      description: "Need a quick ride around the city? Our autos are perfect for short distances and budget-friendly trips.",
      buttonText: "Find Autos",
      backgroundImage: "",
      backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      textColor: "text-white",
      onButtonClick: () => window.location.href = "/auto",
    },
    {
      id: "3",
      title: "⏰ 24/7 Service",
      subtitle: "Always Available",
      description: "Round-the-clock service with instant booking. Your ride is just a tap away, anytime, anywhere.",
      buttonText: "Book Now",
      backgroundImage: "",
      backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      textColor: "text-white",
      onButtonClick: () => window.location.href = "/rental",
    },
    {
      id: "4",
      title: "🎯 Special Offers",
      subtitle: "Limited Time Deals",
      description: "Get amazing discounts on weekend bookings. Save up to 30% on your next adventure!",
      buttonText: "View Offers",
      backgroundImage: "",
      backgroundColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      textColor: "text-white",
      onButtonClick: () => alert("Special offers coming soon!"),
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        autoplay={true}
        autoplayDelay={4000}
        showDots={true}
        showArrows={true}
        className="h-64 rounded-xl shadow-lg"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-64 flex items-center justify-center overflow-hidden rounded-xl"
            style={{ background: slide.backgroundColor }}
          >
            {slide.backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="relative z-10 text-center px-8 max-w-2xl">
              <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${slide.textColor}`}>
                {slide.title}
              </h2>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 opacity-90 ${slide.textColor}`}>
                {slide.subtitle}
              </h3>
              <p className={`text-sm md:text-base mb-6 opacity-80 ${slide.textColor} max-w-md mx-auto`}>
                {slide.description}
              </p>
              <button
                onClick={slide.onButtonClick}
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromoSlides;