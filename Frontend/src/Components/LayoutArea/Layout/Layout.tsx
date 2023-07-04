import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    return (
        <div className="Layout">
            <header>
                <AuthMenu/>
            </header>
            <main>
                <Routing />
            </main>
            <footer>
               <Footer />
            </footer>
        </div>
    );
}

export default Layout;