import "./styles/TempToggle.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function TempToggle({ tempUnit, setTempUnit }: { tempUnit: string, setTempUnit: Function }) {

    const handleTempUnitChange = ( _event: React.MouseEvent<HTMLElement>, newTempUnit: string | null ) => {
        setTempUnit(newTempUnit);
    };

    const styles = {
        float: "right",
        border: "0.5px green solid",
        backdropFilter: "blur(21px)",
        boxShadow: "0 2px 30px rgba(0, 0, 0, 0.2)",
        background: "radial-gradient(107.32% 141.42% at 0% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)",
    }

    return (
        <ToggleButtonGroup color={tempUnit == 'Celsius' ? 'info' : 'secondary'} value={tempUnit} onChange={handleTempUnitChange} sx={styles} exclusive>
            <ToggleButton value="Celsius">Celsius</ToggleButton>
            <ToggleButton value="Fahrenheit">Fahrenheit</ToggleButton>
        </ToggleButtonGroup>
    );
}