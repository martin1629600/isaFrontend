import {useListActions} from "../../contexts/listActionContext";
import listAction from "../../core/listAction";
import UpdateVinylDialog from "./Dialogs/UpdateVinylDialog";
import DeleteVinylDialog from "./Dialogs/DeleteVinylDialog";

const AllVinylDialogs = ({}) => {
    const {state} = useListActions();

    return(
        <>
            <UpdateVinylDialog
                isOpen={state.type == listAction.UPDATE}
            />

            <DeleteVinylDialog
                isOpen={state.type == listAction.DELETE}
            />
        </>
    )
}

export default AllVinylDialogs;