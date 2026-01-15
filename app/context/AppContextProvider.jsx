import combineContext from "../utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { CreateWorkspaceProvider} from "./createWorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";

export const AppContextProvider=combineContext(
    SocketContextProvider,
    AuthContextProvider,
    CreateWorkspaceProvider,
    WorkspacePreferencesModalContextProvider,
    CreateChannelContextProvider,
    WorkspaceContextProvider
)