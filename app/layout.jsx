import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'

export const metadata = {
    title: 'Billify',
    description: "Follow AA and split your bills evenly",
    icons: {
        icon: '/icon?<generated>'
    }
}

const RootLayout = ( { children } ) => {
    return (
        <html lang="en">
            <Provider>
                <body>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <div className="app">
                        <Nav />
                        { children }
                    </div>
                </body>
            </Provider>
        </html>
    )
}

export default RootLayout