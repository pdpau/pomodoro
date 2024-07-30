
import { cn } from "@/lib/utils";


interface Props {
    isRedPalette: boolean;
}

const Notebook: React.FC<Props> = ({ isRedPalette }) => {


    return (
        <div className={cn(
            "min-w-[912px] min-h-[240px] max-w-[912px] max-h-[240px]", /* TODO: Adaptar height a la pantalla (nomes si deixo fixes el Timer i el Tasks) */
            "flex flex-col rounded-lg", 
            "bg-white bg-opacity-10"
        )}>
            <div className="m-2">
                <h1 className="font-bold">Next steps</h1>
                <p>TODO: ...</p>
                <p>Canviar els botons del timer i fer que tot es torni verd o blau mentre es descansa</p>
                <p>Que aquesta secció sigui com una llibreta o pissarra</p>
                <p>Comptador que indiqui quants pomodoros hem completat avui</p>
                <p>Afegir notificació de navegador quan acabi el compte enrere</p>
                <p>Guardar a backend...</p>
            </div>
        </div>
    );
}

export default Notebook;