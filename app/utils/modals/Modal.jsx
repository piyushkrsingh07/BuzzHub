import WorkspacePreferencesModal from '@/app/(main)/workspace/[workspaceId]/_components/WorkspacePreferencesModal'
import CreateWorkspaceModal from '@/app/utils/createWorkspaceModal'
import { CreateChannelModal } from '../CreateChannelModal'

export const Modals=()=>{

    return (
        <>
        <CreateWorkspaceModal/>
        <WorkspacePreferencesModal/>
        <CreateChannelModal/>
        </>
    )
}