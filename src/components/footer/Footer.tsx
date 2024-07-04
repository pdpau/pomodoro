
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
    return (
        <footer className={cn(
            "flex items-center justify-end",
            "text-my-red-950",
        )}>
            <p className="text-md">© 2024 My Pomodoro</p>
        </footer>
    );
};

export default Footer;