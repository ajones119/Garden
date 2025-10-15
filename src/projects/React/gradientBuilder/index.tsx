import ColorsList from "./components/ColorsList";
import Controls from "./components/Controls";
import Display from "./components/Display";

const GradientBuilder = () => {

    return(
        <div className="grid grid-cols-1 lg:grid-cols-4 overflow-hidden rounded-lg border border-border w-12/12 mx-auto h-full">
            <section id="controls" className="col-span-1 bg-blue-300"><Controls /></section>
            <section id="display" className="col-span-2 bg-red-300"><Display /></section>
            <section id="colors" className="col-span-1 bg-green-300"><ColorsList /></section>
        </div>
    )
}

export default GradientBuilder;