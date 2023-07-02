import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<p>&copy; Michal resnick All right reserved {(new Date()).getFullYear()}</p> 
        </div>
    );
}

export default Footer;