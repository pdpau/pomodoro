import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

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