import { Link, useLocation } from 'react-router-dom';

export const Layout = ({ children, pageTitle }) => {
  const location = useLocation();
  
  return (
    <div className="outer-div">
      {/* Team Header */}
      <div className="team-header">
        TEAM 
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
        <img src="/images/add_icon.jpg" className="team-icon" alt="Add" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/messages">
          <img src="/images/email_icon.jpg" className="team-icon" alt="Email" />
        </Link>
        <Link to="/settings">
          <img src="/images/settings_icon.png" className="team-icon" alt="Settings" />
        </Link>
        <img src="/images/person_icon.jpg" className="team-icon" alt="Person" />
      </div>
      
      <br /><br />
      
      {/* Navigation Menu */}
      <table className="navigation-table">
        <tbody>
          <tr>
            <td className="box">
              <Link to="/planner">PLANNER</Link>
            </td>
          </tr>
          <tr>
            <td className="box">
              <Link to="/projmanager">PROJECT<br />MANAGER</Link>
            </td>
          </tr>
          <tr>
            <td className="box">
              <Link to="/files">FILES</Link>
            </td>
          </tr>
        </tbody>
      </table>
      
      {/* Main Content Area */}
      <div className="inner-div">
        <p className="content-center">
          {pageTitle}
        </p>
        <div className="inner-div2">
          {children}
        </div>
      </div>
    </div>
  );
};