
import { cn } from "@/lib/utils";


interface Props {
    isRedPalette: boolean;
}
const Footer: React.FC<Props> = ({ isRedPalette }) => {
    return (
        <footer className={cn(
            "flex items-center justify-end",
            isRedPalette ? "text-my-red-950" : "text-my-green-950",
        )}>
            <p className="text-md">© 2024 My Pomodoro</p>
        </footer>
    );
};

export default Footer;