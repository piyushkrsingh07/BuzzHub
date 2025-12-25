import WorkspacePreferencesModal from '@/app/(main)/workspace/_components/WorkspacePreferencesModal'
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