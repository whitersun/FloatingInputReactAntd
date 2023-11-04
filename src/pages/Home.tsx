import { FloatingInput } from "../components/input/FloatingInput/FloatingInput";

export const Home = () => {
    

    return (
        <div className="homepage max-w-7xl">
            <h1>Home</h1>

            <FloatingInput type="datepicker" title="Start Date" />
        </div>
    );
};