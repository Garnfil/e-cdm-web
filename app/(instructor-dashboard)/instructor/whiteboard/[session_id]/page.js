import Whiteboard from "../../../../components/WhiteBoard";

const WhiteboardPage = ({ params }) => {
    const session_id = params.session_id; // Get session ID from URL
    return (
        <div className="container-fluid">
            <Whiteboard session_id={session_id} />
        </div>
    );
};

export default WhiteboardPage;