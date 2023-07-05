import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <p>
        &copy; Michal Resnick. All rights reserved. {(new Date()).getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
