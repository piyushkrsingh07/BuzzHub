export default  function workspaceJoinMail (workspace) {
    return {
   from:process.env.MAIL_ID,
    subject:'You have been added to a workspace',
    text:`Congratulations! You have been added to the workspace ${workspace.name}`,
    }
 
}