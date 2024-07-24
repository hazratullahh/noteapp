import { loadOptions } from "../actions";
import ChipChild from "./ChipChild";
import ChipPillSleleton from "./skeleton/ChipPillSleleton";

const ChipPills = async ({ className = "flex" }) => {

    const chips = await loadOptions();
    if (!chips) {
        return <ChipPillSleleton />
    }

    return (
        <div className={`${className} gap-2 mb-4`}>
            <ChipChild value={"all"} />
            {
                chips?.map((chip, index) => (
                    <ChipChild key={index} value={chip.value} />
                ))
            }
        </div>
    );
}

export default ChipPills;