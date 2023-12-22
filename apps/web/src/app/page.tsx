import { ModeToggle } from "@/components/ModeToggle";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="relative grid place-items-center min-h-screen px-8 py-16">
      <ModeToggle />
      <WeatherDashboard />
    </div>
  );
}
