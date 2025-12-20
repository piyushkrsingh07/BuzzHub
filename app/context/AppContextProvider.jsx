import combineContext from "../utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceProvider} from "./createWorkspaceContext";

export const AppContextProvider=combineContext(
    AuthContextProvider,
    CreateWorkspaceProvider
)