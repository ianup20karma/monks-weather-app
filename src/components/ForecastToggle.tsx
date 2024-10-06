import "./styles/toggle.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ForecastToggle({ forecastUnit, setForecastUnit }: { forecastUnit: string, setForecastUnit: Function }) {

    const handleForecastUnitChange = ( _event: React.MouseEvent<HTMLElement>, newForecastUnit: string | null ) => {
        setForecastUnit(newForecastUnit || forecastUnit);
    }

    const styles = {
        float: "right",
        marginTop: "-4.5%",
        borderRadius: "4px",
        backdropFilter: "blur(21px)",
        boxShadow: "0 2px 30px rgba(0, 0, 0, 0.3)",
        background: "radial-gradient(107.32% 141.42% at 0% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)",
    } as React.CSSProperties;

    return (
        <ToggleButtonGroup color={forecastUnit == 'HOURLY' ? 'standard' : 'standard'} value={forecastUnit} onChange={handleForecastUnitChange} sx={styles} exclusive>
            <ToggleButton value="DAILY">DAILY</ToggleButton>
            <ToggleButton value="HOURLY">HOURLY</ToggleButton>
        </ToggleButtonGroup>
    );
}