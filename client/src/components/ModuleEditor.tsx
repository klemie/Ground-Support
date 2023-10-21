import { Button, Dialog } from "@mui/material";
import { IComponentPopulated } from "../utils/entities";

interface IModuleEditorProps {
    component?: IComponentPopulated | null;
    isOpen: boolean;
    onClose: () => void; // TODO
}

const ModuleEditor = (props: IModuleEditorProps) => {
    const { component, isOpen, onClose } = props;
    
    return (
        <Dialog open={isOpen}>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam molestiae, ipsam nemo obcaecati voluptatibus magni natus quis temporibus vero nostrum dolorum, ea facilis quibusdam amet ducimus aut. Cum, non natus.
            </p>
            <Button onClick={() => onClose()}>
                Close
            </Button>
        </Dialog>
    )
}

export default ModuleEditor;