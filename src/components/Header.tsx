import { cn } from "@/lib/utils";

const Header = () => {
    return (
        <header className={cn(
        "flex", // TODO: Afegir coses
        "items-center justify-center",
        )}>
            <h1>Header</h1>
        </header>
    );
}

export default Header;