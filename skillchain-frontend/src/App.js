import './App.css';
import ClientDashboard from './Components/ClientUI/ClientDashboard';
import FileUpload from './Components/FileUpload';
import ActiveProjects from './Components/FreelancerUI/ActiveProjects';
import EarningsHistory from './Components/FreelancerUI/EarningsHistory';
import FreelancerAnalytics from './Components/FreelancerUI/FreelancerAnalytics';
import FreelancerDashboard from './Components/FreelancerUI/FreelancerDashboard';
import FreelancerProfile from './Components/FreelancerUI/FreelancerProfile';
import JobBrowser from './Components/FreelancerUI/JobBrowser';
import MessagesCenter from './Components/FreelancerUI/MessagesCenter';
import MyProposals from './Components/FreelancerUI/MyProposals';
import ProposalSubmissionForm from './Components/FreelancerUI/ProposalSubmissionForm';
// import Client from './Components/ClientUI/Client';
import SkillChain from './Components/SkillChain';

function App() {
  return (
    <div>
      <SkillChain />
      {/* <FileUpload /> */}
    </div>
  )
}

export default App;
