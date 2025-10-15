import ColorsList from "./components/ColorsList";
import Controls from "./components/Controls";
import Display from "./components/Display";

const GradientBuilder = () => {

    return(
        <div className="grid grid-cols-1 lg:grid-cols-4 overflow-hidden rounded-lg border border-border w-12/12 mx-auto h-full bg-background">
            <section id="controls" className="col-span-1 bg-muted border-r border-border overflow-y-auto"><Controls /></section>
            <section id="display" className="col-span-2 bg-background"><Display /></section>
            <section id="colors" className="col-span-1 bg-muted border-l border-border"><ColorsList /></section>
        </div>
    )
}

export default GradientBuilder;