
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
    return (
        <footer className={cn(
            "flex items-center justify-between",
            "h-8 my-2",
            "text-my-red-950",
        )}>
            <p className="text-sm">© 2024 My Pomodoro (Footer yet to be implemented)</p>
        </footer>
    );
};

export default Footer;