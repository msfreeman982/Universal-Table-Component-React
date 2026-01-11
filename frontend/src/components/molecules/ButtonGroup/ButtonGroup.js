import { Button } from '@/components/atoms/Button/Button';

const BTNGROUP_CLASSES = 'flex flex-row justify-end pb-3';

// TO DO: NEED TO INCLUDE TO TABLE INSTAED HARDCODE 
// Add
// Search
export const ButtonGroup = ({ buttonConfigs }) => {
    return (
        <div className={BTNGROUP_CLASSES}>
            <div className="flex gap-2 my-2">
                {buttonConfigs?.map((config) => (
                    <Button key={config.key} onClick={config.onClick} type={config.type}>
                        {config.text}
                    </Button>
                ))}
            </div>
        </div>
    );
};
