import React from 'react'
import WorkspaceProvider from './provider'

export default function WorkspaceLayout({ children }) {
    return (
        <WorkspaceProvider>
            {children}
        </WorkspaceProvider>
    )
}
