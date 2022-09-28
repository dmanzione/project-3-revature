import { useState } from 'react';


const ChatHeader = () => {
	return (<div className="w3-blue w3-container">
		<h3>Tech Support</h3>
		
	</div>);

}
const MessageForm = () => {
	return (<form id="form" className="" action="">

		<input type="text" id="input"
			className="w3-input w3-block w3-card w3-display-bottommiddle w3-border-top w3-topbar"
			placeholder="Type message here..." />
		<input type="submit" id="submitBtn"
			className="w3-button w3-display-bottomright w3-dark-gray" />
	</form>)
}

const Messages = () => {
	return (<div className="w3-white w3-container w3-margin w3-padding-64" id="messages"></div>);
}


function ChatModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setStyles({display:"block"});
  const handleClose = () => setStyles({display:"none"});
  const [styles, setStyles] = useState({display:"none"})
	return (
		<>
		<button onClick={handleOpen}>Need Help?</button>
		<div style={styles}>
			<ChatHeader />
			<button onClick={handleClose}>Close</button>
			<Messages/>
			<MessageForm />
		</div>
		</>
	);

 

}
